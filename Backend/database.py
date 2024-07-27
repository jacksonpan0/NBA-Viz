import sqlite3 as sql

PIE_DB_PATH = './Backend/Player_Totals.sqlite'
ADV_DB_PATH = './Backend/advanced.sqlite'

def get_pie_connection():
    return sql.connect(PIE_DB_PATH, check_same_thread=False)

def get_adv_connection():
    return sql.connect(ADV_DB_PATH, check_same_thread=False)