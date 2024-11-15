class User {
  constructor(socket, playerId, x, z) {
    this.socket = socket;
    this.playerId = playerId;
    this.hp = 10;
    this.x = x;
    this.y = 0;
    this.z = z;
    this.lastX = 0;
    this.lastZ = 0;
    this.state = 0;
    this.speed = 1;
    this.lastUpdateTime = Date.now();
  }

  updatePosition(x, z) {
    this.lastX = this.x;
    this.lastZ = this.z;
    this.x = x;
    this.z = z;
    this.lastUpdateTime = Date.now();
  }
}

export default User;
