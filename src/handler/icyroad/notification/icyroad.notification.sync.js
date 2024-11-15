import { MessageType } from '../../../constants/packetHeader.js';
import { createResponse } from '../../../utils/parser/responseParser.js';

export const icyroadgameSyncNotification = (users) => {
  //
  const payload = { users };

  const packet = createResponse(MessageType.ICYROAD_GAME_SYNC_NOTIFICATION, payload);

  return packet;
};

export default icyroadgameSyncNotification;
