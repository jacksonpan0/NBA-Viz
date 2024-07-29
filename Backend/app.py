import pandas as pd
import sqlite3 as sql
from models import preprocess_data
from flask import Flask, jsonify, request
from flask_cors import CORS

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