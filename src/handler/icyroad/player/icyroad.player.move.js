import { getGameSession } from '../../../sessions/game.session.js';

export const icyroadGamePlayerMove = async ({ socket, payload }) => {
  console.log('icyroadGamePlayerMove 호출 ******');

  const { playerId, x, z } = payload;
  const gameSession = getGameSession();

  console.log(gameSession.users);

  const user = gameSession.getUser(playerId);

  user.updatePosition(x, z);

  const locationData = gameSession.getAllLocation(playerId);

  console.log('locationData', locationData);
  socket.write(locationData);
};

export default icyroadGamePlayerMove;
