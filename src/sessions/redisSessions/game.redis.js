import redisClient from '../../init/redis.js';

const KEY_PREFIX = 'game:';

export const setGame = async (gameName, socketId) => {
  const findUser = await redisClient.hSet(KEY_PREFIX + gameName + '=' + socketId, {
    socketId: socketId,
    player1: 'null',
    player2: 'null',
    player3: 'null',
    player4: 'null',
  });
  return findUser;
};
