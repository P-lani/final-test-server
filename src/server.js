import net from 'net';
import { HOST, PORT } from './constants/env.js';
import initServer from './init/index.js';
import { onConnection } from './events/onConnection.js';
import { addGameSession } from './sessions/game.session.js';
import { setGame } from './sessions/redisSessions/game.redis.js';

const server = net.createServer(onConnection);

initServer()
  .then(() => {
    server.listen(PORT, HOST, () => {
      console.log(`서버가 ${HOST}:${PORT}에서 실행 중입니다.`);

      // TEST 환경 = 서버 시작시, 빙판게임이 생성됨
      const gameSessions = addGameSession('testGame');
      gameSessions.startUserStateCheck(200);
      setGame('Ice', 'testGame');
      console.log(' 빙판 게임이 시작되었습니다.');
    });
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
