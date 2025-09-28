const { connect, publish } = require("./utils/rabbitmq");

(async () => {
  await connect();
  // Simulate new order
  const order = { id: Math.floor(Math.random() * 1000), amount: 100 };
  console.log("[System] 🚀 New order created:", order);
  await publish("ORDER_CREATED", order);
})();
