const simulateGateway = async () => {
  const rand = Math.random();

  await new Promise((res) => setTimeout(res, 1000)); // simulate delay

  if (rand < 0.7) return "SUCCESS";
  if (rand < 0.9) return "FAILED";

  throw new Error("TIMEOUT");
};

module.exports = simulateGateway;