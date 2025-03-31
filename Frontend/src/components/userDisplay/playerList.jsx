import { Box, Text, Grid } from "@chakra-ui/react";

const PlayerList = ({ players }) => {
  let playersSelected = players.length;

  return (
    <Box p={4}>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        {playersSelected > 0 && "PTI Scores (Range 0-1)"}
      </Text>

      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
        {players.map((player) => (
          <Box
            key={player.PlayerID}
            p={4}
            boxShadow="sm"
            borderRadius="md"
            textAlign="center"
            _hover={{
              backgroundColor: "green.500", // Highlight color on hover
              boxShadow: "lg", // Larger shadow on hover
            }}
          >
            <Text fontSize="md" fontWeight="semibold">
              {player.PlayerName}
            </Text>
            <Text fontSize="sm" color="white.500">
              {player.ADJPIE}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default PlayerList;
