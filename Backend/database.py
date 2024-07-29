import sqlite3 as sql
import pandas as pd

# Database connections (open once, reuse throughout the app)
PIE_DB_PATH = './Backend/Player Totals.sqlite'
ADV_DB_PATH = './Backend/advanced.sqlite'

pie_connection = sql.connect(PIE_DB_PATH, check_same_thread=False)
adv_connection = sql.connect(ADV_DB_PATH, check_same_thread=False)

# Our data is stored in a CSV file. 
# This function reads that file into a Pandas dataframe and writes that to a SQL table.
def read_csv_to_sql(csv_file, table_name, connection):
    df = pd.read_csv(csv_file)
    df.to_sql(table_name, connection, if_exists='replace', index=False)
    
# Need this to do calculations on our data
def read_sql_query_to_df(query, connection, params):
    return pd.read_sql_query(query, connection, params=params)  