import React, { useEffect, useState } from 'react';
import "./Styles.css"
import RenderSelectInput from './components/RenderSelectInput';
import GenerateSeasonOptions from './components/GenerateSeasonOptions';
import RenderChart from './components/RenderChart';

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
  const seasonOptions = GenerateSeasonOptions(1947, 2024);

  useEffect(() => {
    fetchPlayers();
  }, []);

  // Using asynchronous fetch to fetch from our Flask backend with the team and season we want
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
        {RenderSelectInput("Team:", "team", (e) => setTeam(e.target.value), team, teamOptions)}
        {RenderSelectInput("Season:", "season", (e) => setSeason(e.target.value), season, seasonOptions)}
        <br></br>
        <button type="submit">Fetch Players</button>
      </form>
      <RenderChart data={players} />      
      <ul>
        {players.map(player => (
          <ul key={player.PlayerID}>
            {player.PlayerName} - ADJPIE: {player.ADJPIE}
          </ul>
        ))}
      </ul>
    </div>
  );
}

export default App;