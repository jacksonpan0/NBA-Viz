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
        adjpie_scores.append(round(adjpie_score, 4))
        
    player_pie_calculated['ADJPIE'] = adjpie_scores
    
    return player_pie_calculated[['PlayerID', 'PlayerName', 'TeamAbbrev', 'season', 'ADJPIE']]