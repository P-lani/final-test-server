import { IRG_MAP } from '../../constants/games/icyroad.js';
import icyroadgameDamageNotification from '../../handler/icyroad/notification/icyroad.notification.damage.js';
import icyroadgameDefeatNotification from '../../handler/icyroad/notification/icyroad.notification.defeat.js';
import icyroadgameSyncNotification from '../../handler/icyroad/notification/icyroad.notification.sync.js';

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.userStateCheckInterval = null;
    this.x = IRG_MAP.gameSizeX;
    this.z = IRG_MAP.gameSizeZ;
    this.damage = IRG_MAP.outDamage;
    this.gameTime = IRG_MAP.startTime;
  }

  addUser(user) {
    this.users.push(user);
  }

  getUser(playerId) {
    return this.users.find((user) => user.playerId === playerId);
  }

  getAllLocation(playerId) {
    const locationData = this.users
      .filter((user) => user.playerId !== playerId)
      .map((user) => {
        return {
          playerId: user.playerId,
          x: user.x,
          z: user.z,
          hp: user.hp,
          state: user.state,
        };
      });

    return icyroadgameSyncNotification(locationData);
  }

  startUserStateCheck(intervalTime) {
    // 상태 체크
    this.userStateCheckInterval = setInterval(() => {
      this.checkUserState();
      this.checkUserLocation();
    }, intervalTime);
  }

  checkUserState() {
    for (const user of this.users) {
      if (user.x >= 0 && user.x <= this.x && user.z >= 0 && user.z <= this.z) {
        // 안전 지역
      } else if (user.state !== 2) {
        // 위험지역 생존자
        icyroadgameDamageNotification(user, this.damage);
      }
      if (user.hp <= 0 && user.state !== 2) {
        icyroadgameDefeatNotification(user);
      }
    }
  }

  checkUserLocation() {
    for (const user of this.users) {
      const location = this.getAllLocation(user.playerId);
      user.socket.write(location);
    }
  }

  removeInterval() {
    clearInterval(this.userStateCheckInterval);
    this.userStateCheckInterval = null;
  }
}

export default Game;
