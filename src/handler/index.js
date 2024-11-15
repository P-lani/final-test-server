import { MessageType } from '../constants/packetHeader.js';
import icyroadGameJoinRequest from './icyroad/game/icyroad.game.join.Request.js';
import icyroadgameSyncNotification from './icyroad/notification/icyroad.notification.sync.js';
import icyroadGamePlayerMove from './icyroad/player/icyroad.player.move.js';
import icyroadGamePlayerSpawn from './icyroad/player/icyroad.player.spawn.js';
import testMessageHandler from './test/testMessageHandler.js';

const handlers = {
  // 회원가입 및 로그인 예시
  [MessageType.REGISTER_REQUEST]: {
    handler: undefined,
    protoType: 'registerRequest',
  },
  [MessageType.REGISTER_RESPONSE]: {
    handler: undefined,
    protoType: 'registerResponse',
  },
  [MessageType.LOGIN_REQUEST]: {
    handler: undefined,
    protoType: 'loginRequest',
  },
  [MessageType.LOGIN_RESPONSE]: {
    handler: undefined,
    protoType: 'loginResponse',
  },

  // 테스트
  [MessageType.TEST_MESSAGE_TO_CLIENT]: {
    handler: undefined,
    protoType: 'testMessageToC',
  },
  [MessageType.TEST_MESSAGE_TO_SERVER]: {
    handler: testMessageHandler,
    protoType: 'testMessageToS',
  },

  // 빙판 게임
  [MessageType.ICYROAD_GAME_JOIN_REQUEST]: {
    handler: icyroadGameJoinRequest,
    protoType: 'iceJoinTest',
  },
  [MessageType.ICYROAD_GAME_JOIN]: {
    handler: undefined,
    protoType: 'iceJoinGame',
  },

  [MessageType.ICYROAD_GAME_PLAYER_SPAWN]: {
    handler: icyroadGamePlayerSpawn,
    protoType: 'icePlayerSpawn',
  },
  [MessageType.ICYROAD_GAME_PLAYER_MOVE]: {
    handler: icyroadGamePlayerMove,
    protoType: 'icePlayerMove',
  },
  [MessageType.ICYROAD_GAME_SYNC_NOTIFICATION]: {
    handler: undefined,
    protoType: 'iceSyncNotification',
  },
  [MessageType.ICYROAD_GAME_DEFEAT_NOTIFICATION]: {
    handler: undefined,
    protoType: 'icePlayerDefeatNotification',
  },
};

export const getHandlerByPacketType = (packetType) => {
  if (!handlers[packetType]) {
    throw new CustomError(
      ErrorCodes.UNKNOWN_HANDLER_ID,
      `핸들러를 찾을 수 없습니다: ID ${packetType}`,
    );
  }
  return handlers[packetType].handler;
};

export const getProtoTypeNameByPacketType = (packetType) => {
  if (!handlers[packetType]) {
    console.error('getProtoTypeNameByPacketType FAIL');
  }
  return handlers[packetType].protoType;
};
