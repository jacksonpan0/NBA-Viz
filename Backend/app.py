import pandas as pd
import sqlite3 as sql
from flask import Flask, jsonify, request
from flask_cors import CORS

# Need this since we are gathering data from a CSV and we want to use SQL queries for easy searching
def read_csv_to_sql(csv_file, table_name, connection):
    df = pd.read_csv(csv_file)
    df.to_sql(table_name, connection, if_exists='replace', index=False)
    

# Need this to do calculations on our data
def read_sql_query_to_df(query, connection, params):
    return pd.read_sql_query(query, connection, params=params)  


# This formula is for calculating Advanced metrics, this will serve as our weight multiplier to our adjust PIE score
# Win Share and Value Over Replacement Player were chosen for their unique measurement of player contribution against their own team
def calculate_adv(player_adv):
    # Assigning weights here per importance
    weights = {
        'TS': 0.35, 'USAGE': 0.20, 'WS': 0.25, 'VORP': 0.20
    }
    
    # Use weights from dictionary and vectorized operations to calculate advanced player contribution
    # These are stats beyond the traditional box score stats which allow for a more in-depth analysis
    player_adv['CompositeScore'] = sum(player_adv[stat] * weight for stat, weight in weights.items())
    
    team_total_composite = player_adv['CompositeScore'].sum()
    
    player_adv['ADV'] = player_adv['CompositeScore'] / (team_total_composite - player_adv['CompositeScore'])
    
    return player_adv

# Our adjusted PIE formula
# We focus on all box score metrics but we do not halve OREB and BLK since we are measuring player performance across an entire season versus their own team's totals
# A multiplication of 10 is applied to the final score in order to normalize the data since we are looking to set the range from 0-1
def calculate_pie(player_totals):
 # Assign weights to each statistic
    weights = {
        'PTS': 0.25, 'FGM': 0.15, 'FTM': 0.15, 'FGA': -0.20, 'FTA': -0.20,
        'DREB': 0.10, 'OREB': 0.10, 'AST': 0.10, 'STL': 0.05, 'BLK': 0.05,
        'PF': -0.05, 'TOV': -0.05
    }
    
    # Use weights from dictionary and vectorized operations to calculate player contribution
    player_totals['PlayerContribution'] = sum(player_totals[stat] * weight for stat, weight in weights.items())
    
    # Team total stats with weights
    team_total_stats = player_totals['PlayerContribution'].sum()
    
    player_totals['PIE'] = player_totals['PlayerContribution'] / (team_total_stats - player_totals['PlayerContribution'])
    return player_totals


# Our final adjusted PIE data frame, we create a new column adding the two up
# This formula is not finalized yet
def add_adjpie_column(player_pie_calculated, player_advanced_calculated):
    assert len(player_pie_calculated) == len(player_advanced_calculated), "Dataframes have different lengths"
    adjpie_scores = []
    
    # Iterate through the rows of both dataframes simultaneously
    for index in range(len(player_pie_calculated)):
        # Calculate adjusted PIE by summing up PIE and ADV scores
        adjpie_score = player_pie_calculated.iloc[index]['PIE'] + player_advanced_calculated.iloc[index]['ADV']
        # Round the ADJPIE score to four decimal places
        adjpie_score_rounded = round(adjpie_score, 4)
        adjpie_scores.append(adjpie_score_rounded)
    player_pie_calculated['ADJPIE'] = adjpie_scores
    
    return player_pie_calculated[['PlayerID', 'PlayerName', 'TeamAbbrev', 'season', 'ADJPIE']]

# Query function meant to support versatility by allowing user option for teams
def query_data_for_team(pie_connection, adv_connection, team_abbreviation, season):
    # Reading our CSV files to SQL, only needs to be done once to establish connection and table names
    # read_csv_to_sql('./Backend/Advanced.csv', 'Player_Advanced_Table', adv_connection)
    # read_csv_to_sql('./Backend/Player Totals.csv', 'Player_Totals_Table', pie_connection)
    
    # Define the SQL queries with placeholders for parameters
    player_pie_query = """
        SELECT 
            player_id as PlayerID,
            player as PlayerName,
            tm as TeamAbbrev,
            season as season,
            pts as PTS,
            fg as FGM,
            fga as FGA,
            ft as FTM,
            fta as FTA,
            drb as DREB,
            orb as OREB,
            ast as AST,
            stl as STL,
            blk as BLK,
            pf as PF,
            tov as TOV    
        FROM
            Player_Totals_Table
        WHERE
            season = ? AND
            tm = ?
    """

    player_advanced_query = """
        SELECT 
            player_id as PlayerID,
            tm as TeamAbbrev,
            season as season,
            ws as WS,
            vorp as VORP,
            usg_percent as USAGE,
            ts_percent as TS
        FROM
            Player_Advanced_Table
        WHERE
            season = ? AND
            tm = ?
    """

    # Define parameter values
    params = (season, team_abbreviation)

    # Execute queries with parameters
    player_pie = read_sql_query_to_df(player_pie_query, pie_connection, params=params)
    player_advanced = read_sql_query_to_df(player_advanced_query, adv_connection, params=params)

    # Calculate ADV and PIE
    player_pie_calculated = calculate_pie(player_pie)
    player_advanced_calculated = calculate_adv(player_advanced)

    # Add ADJPIE column
    player_with_adjpie = add_adjpie_column(player_pie_calculated, player_advanced_calculated)

    return player_with_adjpie


def get_players_by_team(player_with_adjpie, team_name=None):
    if team_name:
        # Filter the dataframe for the specified team
        team_data = player_with_adjpie[player_with_adjpie['TeamAbbrev'] == team_name]

        return team_data[['PlayerName', 'ADJPIE', 'season']]
    else:
        return player_with_adjpie[['PlayerName', 'ADJPIE', 'season']]

def preprocess_data(team_abbreviation, season):
    # Connect to SQLite databases
    pie_connection = sql.connect('./Backend/Player Totals.sqlite')
    adv_connection = sql.connect('./Backend/advanced.sqlite')

    # Query data for the specified team and season
    player_data_for_team = query_data_for_team(pie_connection, adv_connection, team_abbreviation, season)

    # Get the players and their ADJPIE scores for the specified team
    player_data = get_players_by_team(player_data_for_team, team_name=team_abbreviation)
    
    # Drop rows with NaN values in the 'ADJPIE' column
    player_data = player_data.dropna(subset=['ADJPIE'])

    return player_data

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/data')
def get_processed_data():
    team = request.args.get('team')
    season = request.args.get('season')

    if team is None or season is None:
        return jsonify({"error": "Team and season parameters are required."}), 400

    # Call the preprocessing functions here with the provided team and season
    processed_data = preprocess_data(team, season)
    
    if processed_data is not None:
        processed_data_dict = processed_data.to_dict(orient='records')
        return jsonify(processed_data_dict)
    else:
        return jsonify({"error": "No data found for the specified team and season."}), 404
    

if __name__ == '__main__':
    app.run(debug=True)