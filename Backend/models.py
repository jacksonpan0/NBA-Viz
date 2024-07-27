import pandas as pd
from database import get_pie_connection, get_adv_connection

def query_data_for_team(pie_connection, adv_connection, team_abbreviation, season):
    pie_connection = get_pie_connection()
    adv_connection = get_adv_connection()
    
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
    
    params = (season, team_abbreviation)

    # Execute separate queries for the two models which will later be compiled into one
    player_pie = pd.read_sql_query(player_pie_query, pie_connection, params=params)
    player_advanced = pd.read_sql_query(player_advanced_query, adv_connection, params=params)
    
    return player_pie, player_advanced