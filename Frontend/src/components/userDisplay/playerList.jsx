const PlayerList = ({ players }) => {
  let playersSelected = players.length;
  return (
    <ul>
      <p>{playersSelected > 0 && "PTI Scores (Range 0-1)"}</p>
      {players.map((player) => (
        <ul key={player.PlayerID}>
          {player.PlayerName} : {player.ADJPIE}
        </ul>
      ))}
    </ul>
  );
};
export default PlayerList;
