import { MessageType } from '../../../constants/packetHeader.js';
import { createResponse } from '../../../utils/parser/responseParser.js';

export const icyroadGamePlayerSpawn = async (socket, user) => {
  console.log('icyroadGamePlayerSpawn 호출 ******');

  const x = Math.floor(Math.random() * 15);
  const z = Math.floor(Math.random() * 15);

  user.x = x;
  user.z = z;

  const playerType = Math.floor(Math.random() * 4 + 1);

  const response = {
    playerId: user.playerId,
    x: user.x,
    z: user.z,
    playerType: playerType,
  };

  const packet = createResponse(MessageType.ICYROAD_GAME_PLAYER_SPAWN, response);
  socket.write(packet);
};

export default icyroadGamePlayerSpawn;
