import sqlite3 as sql
import pandas as pd

PIE_DB_PATH = './Backend/Player_Totals.sqlite'
ADV_DB_PATH = './Backend/advanced.sqlite'

def get_pie_connection():
    return sql.connect(PIE_DB_PATH, check_same_thread=False)

def get_adv_connection():
    return sql.connect(ADV_DB_PATH, check_same_thread=False)

# Our data is stored in a CSV file. 
# This function reads that file into a Pandas dataframe and writes that to a SQL table.
def read_csv_to_sql(csv_file, table_name, connection):
    df = pd.read_csv(csv_file)
    df.to_sql(table_name, connection, if_exists='replace', index=False)