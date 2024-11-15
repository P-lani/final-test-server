export const icyroadgameDamageNotification = (user, damage) => {
  try {
    user.hp -= damage;

    console.log(
      `${user.playerId} => ${damage} 의 피해. X:Z(${Math.floor(user.x * 10) / 10},${Math.floor(user.z * 10) / 10}) HP:${user.hp}`,
    );
  } catch (e) {
    console.error(e);
  }
};

export default icyroadgameDamageNotification;
