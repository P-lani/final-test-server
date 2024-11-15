import { loadProtos } from './loadProto.js';
import { initRedisClient } from './redis.js';

const initServer = async () => {
  try {
    await loadProtos();
    await initRedisClient();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export default initServer;
