import React, { useEffect, useState } from 'react';
import "./Styles.css"

const renderSelectInput = (label, name, onChange, selectedValue, options) => (
  <label>
    {label}
    <div className="renderSelectArea">
      <select name={name} onChange={onChange} value={selectedValue}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </label>
);

const generateSeasonOptions = (startYear, endYear) => {
  const options = [{ value: "NONE", label: " " }];
  for (let year = endYear; year >= startYear; year--) {
    options.push({ value: year.toString(), label: year.toString() });
  }
  return options;
}

const App = () => {
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState('');
  const [season, setSeason] = useState('');
  const teamOptions = [
    {value: "NONE", labl: " "},
    {value: "ATL", label: "Atlanta Hawks"},
    {value: "BOS", label: "Boston Celtics"},
    {value: "BRK", label: "Brooklyn Nets"},
    {value: "CHO", label: "Charlotte Hornets"},
    {value: "CHI", label: "Chicago Bulls"},
    {value: "CLE", label: "Cleveland Cavaliers"},
    {value: "DAL", label: "Dallas Mavericks"},
    {value: "DEN", label: "Denver Nuggets"},
    {value: "DET", label: "Detroit Pistons"},
    {value: "GSW", label: "Golden State Warriors"},
    {value: "HOU", label: "Houston Rockets"},
    {value: "IND", label: "Indiana Pacers"},
    {value: "LAC", label: "Los Angeles Clippers"},
    {value: "LAL", label: "Los Angeles Lakers"},
    {value: "MEM", label: "Memphis Grizzlies"},
    {value: "MIA", label: "Miami Heat"},
    {value: "MIL", label: "Milwaukee Bucks"},
    {value: "MIN", label: "Minnesota Timberwolves"},
    {value: "NOP", label: "New Orleans Pelicans"},
    {value: "NYK", label: "New York Knicks"},
    {value: "OKC", label: "Oklahoma City Thunder"},
    {value: "ORL", label: "Orlando Magic"},
    {value: "PHI", label: "Philadelphia 76ers"},
    {value: "PHX", label: "Phoenix Suns"},
    {value: "POR", label: "Portland Trail Blazers"},
    {value: "SAC", label: "Sacramento Kings"},
    {value: "SAS", label: "San Antonio Spurs"},
    {value: "TOR", label: "Toronto Raptors"},
    {value: "UTA", label: "Utah Jazz"},
    {value: "WAS", label: "Washington Wizards"}
  ]
  const seasonOptions = generateSeasonOptions(1947, 2024);


  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/data?team=${team}&season=${season}`);
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPlayers();
  };

  return (
    <div>
      <h1>NBA Visualization</h1>
      <form onSubmit={handleSubmit}>
        {renderSelectInput("Team:", "team", (e) => setTeam(e.target.value), team, teamOptions)}
        {renderSelectInput("Season:", "season", (e) => setSeason(e.target.value), season, seasonOptions)}
        <br></br>
        <button type="submit">Fetch Players</button>
      </form>
      <ul>
        {players.map(player => (
          <ul key={player.PlayerID}>
            {player.PlayerName} - ADJPIE: {player.ADJPIE}, Season: {player.season}
          </ul>
        ))}
      </ul>
    </div>
  );
}

export default App;
