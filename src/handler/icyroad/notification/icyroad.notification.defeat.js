import { MessageType } from '../../../constants/packetHeader.js';
import { createResponse } from '../../../utils/parser/responseParser.js';

export const icyroadgameDefeatNotification = (user) => {
  try {
    // 유저 사망
    console.log(`${user.playerId} 가 사망 했습니다... `);
    user.state = 2;

    const socket = user.socket;
    const payload = {
      playerId: user.playerId,
    };

    const packet = createResponse(MessageType.ICYROAD_GAME_DEFEAT_NOTIFICATION, payload);
    socket.write(packet);
  } catch (e) {
    console.error(e);
  }
};
export default icyroadgameDefeatNotification;
