import { TOTAL_LENGTH } from '../constants/packetHeader.js';
import { getHandlerByPacketType } from '../handler/index.js';
import { packetParser } from '../utils/parser/packetParser.js';

export const onData = (socket) => (data) => {
  console.log(data);
  socket.buffer = Buffer.concat([socket.buffer, data]);

  while (socket.buffer.length > TOTAL_LENGTH) {
    let offset = 0;

    if (socket.buffer.length >= TOTAL_LENGTH) {
      const packetLength = socket.buffer.readUInt32BE(offset);
      offset += 4;

      const messageType = socket.buffer.readUInt16BE(offset);
      offset += 2;

      // versionLength (1 byte)
      const versionLength = socket.buffer.readUInt8(offset);
      offset += 1;

      // 버전 문자열이 도착했는지 확인
      if (socket.buffer.length < offset + versionLength) {
        // 버전 문자열이 아직 도착하지 않음
        break;
      }

      // version (variable length)
      const version = socket.buffer.toString('utf8', offset, offset + versionLength);
      offset += versionLength;

      // sequence (4 bytes)
      if (socket.buffer.length < offset + 4) {
        // sequence 필드가 아직 도착하지 않음
        break;
      }

      const sequence = socket.buffer.readUInt32BE(offset);
      offset += 4;

      // payloadLength (4 bytes)
      if (socket.buffer.length < offset + 4) {
        // payloadLength 필드가 아직 도착하지 않음
        break;
      }
      const payloadLength = socket.buffer.readUInt32BE(offset);
      offset += 4;

      const totalPacketLength = offset + payloadLength;
      // 전체 패킷이 도착했는지 확인
      if (socket.buffer.length < totalPacketLength) {
        // 아직 전체 패킷이 도착하지 않음
        break;
      }

      const packetData = socket.buffer.subarray(0, totalPacketLength);
      socket.buffer = socket.buffer.subarray(totalPacketLength);

      try {
        // 페이로드 추출 및 파싱
        const payloadData = packetData.subarray(offset);

        console.log('vvvvvvvvvvv', payloadData);
        const payloadInstance = packetParser(version, 0, payloadData);

        const payload = JSON.parse(JSON.stringify(payloadInstance));

        const handler = getHandlerByPacketType(messageType);

        console.log('messageType,', messageType);

        handler({ socket, payload, sequence });
      } catch (e) {
        console.error(e);
      }
    }
  }
};
