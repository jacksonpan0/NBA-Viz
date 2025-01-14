import pandas as pd
from database import read_csv_to_sql, pie_connection, adv_connection
from metrics import calculate_adv, calculate_pie, add_adjpie_column

# Query function meant to support versatility by allowing user option for teams
def query_data_for_team(pie_connection, adv_connection, team_abbreviation, season):
    # Reading our CSV files to SQL, only needs to be done once to establish connection and table names
    read_csv_to_sql('./Advanced.csv', 'Player_Advanced_Table', adv_connection)
    read_csv_to_sql('./Player_Total.csv', 'Player_Totals_Table', pie_connection)
    
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

    params = (season, team_abbreviation)

    player_pie = pd.read_sql_query(player_pie_query, pie_connection, params=params)
    player_advanced = pd.read_sql_query(player_advanced_query, adv_connection, params=params)

    # Calculate ADV and PIE
    player_pie_calculated = calculate_pie(player_pie)
    player_advanced_calculated = calculate_adv(player_advanced)

    # Add ADJPIE column
    player_with_adjpie = add_adjpie_column(player_pie_calculated, player_advanced_calculated)

    return player_with_adjpie

def get_players_by_team(player_with_adjpie):
    # Filter the dataframe for the specified team
    return player_with_adjpie[['PlayerName', 'ADJPIE', 'season']]
    
def preprocess_data(team_abbreviation, season):
    player_data_for_team = query_data_for_team(pie_connection, adv_connection, team_abbreviation, season)
    player_data = get_players_by_team(player_data_for_team)
    return player_data.dropna(subset=['ADJPIE'])