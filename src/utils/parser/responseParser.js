import { getProtoMessages } from '../../init/loadProto.js';
import { getProtoTypeNameByPacketType } from '../../handler/index.js';
import {
  MESSAGE_TYPE,
  PACKET_LENGTH,
  PAYLOAD_LENGTH,
  SEQUENCE_LENGTH,
  VERSION_LENGTH,
} from '../../constants/packetHeader.js';
import { CLIENT_VERSION } from '../../constants/env.js';

// 임시 시퀀스
let sequenceNumber = 0;

export const createResponse = (packetType, data = null) => {
  // 패킷 길이 4바이트
  const packetLength = Buffer.alloc(PACKET_LENGTH);
  packetLength.writeUInt32BE(packetLength, 0, PACKET_LENGTH);

  // 메세지 타입 길이 2바이트
  const messageType = Buffer.alloc(MESSAGE_TYPE);
  messageType.writeUInt16BE(packetType, 0, MESSAGE_TYPE);

  // 버전 길이 1바이트
  const versionLength = Buffer.alloc(VERSION_LENGTH);
  const versionBuffer = Buffer.from(CLIENT_VERSION);
  versionLength.writeUIntBE(versionBuffer.length, 0, VERSION_LENGTH);

  // 시퀀스 4바이트
  const sequenceBuffer = Buffer.alloc(SEQUENCE_LENGTH);
  sequenceBuffer.writeUInt32BE(sequenceNumber++, 0);

  // 페이로드 생성
  const protoMessages = getProtoMessages();
  const protoTypeName = getProtoTypeNameByPacketType(packetType);

  //   console.log('protoTypeName', protoTypeName);

  if (!protoTypeName) {
    throw new Error(`Unsupported packet type: ${packetType}`);
  }

  const GamePacket = protoMessages['GamePacket'];

  // 데이터 구조 확인
  const messageObject = {
    [protoTypeName]: data,
  };
  //   console.log('Encoding message:', messageObject);

  let actualPayload;
  try {
    actualPayload = GamePacket.encode(messageObject).finish();
    // console.log('Encoded payload:', actualPayload);
  } catch (error) {
    console.error('Encoding failed:', error);
    throw error;
  }

  // 실제 데이터 길이 구함
  const payloadLength = Buffer.alloc(PAYLOAD_LENGTH);
  payloadLength.writeUInt32BE(actualPayload.length, 0);

  // 총 헤더 길이
  const headers = Buffer.concat([
    packetLength,
    messageType,
    versionLength,
    versionBuffer,
    sequenceBuffer,
    payloadLength,
  ]);

  // 헤더와 페이로드 결합
  const temp = Buffer.concat([headers, actualPayload]);
  //   console.log('Final packet buffer:', temp);
  return temp;
};
