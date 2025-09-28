const amqp = require("amqplib");

let channel;

async function connect() {
  const connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();
  return channel;
}

async function publish(queue, message) {
  if (!channel) throw new Error("Channel not initialised");
  await channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
}

async function subscribe(queue, handler) {
  if (!channel) throw new Error("Channel not initialised");
  await channel.assertQueue(queue, { durable: false });
  channel.consume(queue, async (msg) => {
    const content = JSON.parse(msg.content.toString());
    await handler(content);
    channel.ack(msg);
  });
}

module.exports = {
  connect,
  publish,
  subscribe,
};
