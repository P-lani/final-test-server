import { MessageType } from '../../../constants/packetHeader.js';
import { createResponse } from '../../../utils/parser/responseParser.js';

export const icyroadGameJoin = async ({ socket, payload }) => {
  //   console.log('icyroadGameJoin 호출 ******');

  const { playerId } = payload;

  const response = {
    playerId: playerId,
  };
  console.log('icyroadGameJoin', `${playerId} 입장`);

  const packet = createResponse(MessageType.ICYROAD_GAME_JOIN, response);
  socket.write(packet);
};

export default icyroadGameJoin;
