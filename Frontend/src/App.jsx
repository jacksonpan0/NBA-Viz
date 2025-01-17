import React, { useEffect, useState } from "react";
import "./Styles.css";
import Userform from "./components/userform/Userform";
import RenderChart from "./components/RenderChart";
import Navbar from "./components/nav/Navbar";
import PlayerList from "./components/userDisplay/playerList";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState("");
  const [season, setSeason] = useState("");
  const [lastSubmitted, setLastSubmitted] = useState({ team: "", season: "" });

  useEffect(() => {
    fetchPlayers();
  }, []);

  // Using asynchronous fetch to fetch from our Flask backend with the team and season we want
  const fetchPlayers = async () => {
    if (!team || !season) return;
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/data?team=${team}&season=${season}`
      );
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (team === lastSubmitted.team && season === lastSubmitted.season) {
      return;
    }
    setLastSubmitted({ team, season });
    fetchPlayers();
  };

  return (
    <main className="app-content">
      <Navbar />
      <section className="userForm">
        <form onSubmit={handleSubmit}>
          <Userform
            team={team}
            season={season}
            setTeam={setTeam}
            setSeason={setSeason}
          />
          <button type="submit">Fetch PTIs</button>
          <p>Select a Team & Season to get started!</p>
        </form>
      </section>
      <section className="chart-container">
        {/* Data chart is created here using Apache Echarts library to display player team impact through a barchart. */}
        <RenderChart data={players} />
      </section>
      <section className="playerList">
        <PlayerList players={players} />
      </section>
    </main>
  );
};

export default App;
