export const testMessageHandler = async ({ socket, payload }) => {
  console.log('testMessageHandler 호출 ******');
  const { message } = payload;

  console.log(' testMessageHandler 메세지==>', message);
};

export default testMessageHandler;
