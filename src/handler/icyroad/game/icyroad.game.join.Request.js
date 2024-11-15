import User from '../../../classes/models/user.class.js';
import { getGameSession } from '../../../sessions/game.session.js';
import { userSessions } from '../../../sessions/sessions.js';

import icyroadGamePlayerSpawn from '../player/icyroad.player.spawn.js';

export const icyroadGameJoinRequest = async ({ socket, payload }) => {
  try {
    console.log('icyroadGameJoinRequest (임시) 호출 ******');

    const { playerId } = payload;

    const user = new User(socket, playerId, 0, 0);

    const gameSession = getGameSession();

    const existUser = gameSession.getUser(playerId);

    if (existUser) {
      console.log('해당 세션이 이미 같은아이디 존재 ', playerId);
      return;
    }
    userSessions.push(user);
    gameSession.addUser(user);

    await icyroadGamePlayerSpawn(socket, user);
  } catch (e) {
    consonle.error(e);
  }
};

export default icyroadGameJoinRequest;
