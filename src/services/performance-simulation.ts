// Performance simulation utilities for testing with artificial delays

export interface SimulationConfig {
  enabled: boolean;
  minDelay: number; // milliseconds
  maxDelay: number; // milliseconds
  failureRate: number; // 0-1 (percentage of requests that should fail)
}

const defaultConfig: SimulationConfig = {
  enabled:
    process.env.NODE_ENV === "development" &&
    process.env.SIMULATE_SLOW_NETWORK === "true",
  minDelay: 500,
  maxDelay: 2000,
  failureRate: 0.05, // 5% failure rate
};

// Get simulation config from environment or use defaults
export const getSimulationConfig = (): SimulationConfig => {
  return {
    enabled: process.env.SIMULATE_SLOW_NETWORK === "true",
    minDelay: parseInt(process.env.SIMULATE_MIN_DELAY || "500"),
    maxDelay: parseInt(process.env.SIMULATE_MAX_DELAY || "2000"),
    failureRate: parseFloat(process.env.SIMULATE_FAILURE_RATE || "0.05"),
  };
};

// Add artificial delay to simulate network latency
export const simulateNetworkDelay = async (
  config?: Partial<SimulationConfig>
): Promise<void> => {
  const simConfig = { ...defaultConfig, ...config };

  if (!simConfig.enabled) {
    return;
  }

  // Simulate random failure
  if (Math.random() < simConfig.failureRate) {
    throw new Error("Simulated network failure");
  }

  // Add random delay
  const delay =
    Math.random() * (simConfig.maxDelay - simConfig.minDelay) +
    simConfig.minDelay;

  console.log(`🐌 Simulating ${Math.round(delay)}ms network delay...`);

  await new Promise((resolve) => setTimeout(resolve, delay));
};

// Simulate database query delay
export const simulateDbDelay = async (
  queryType: "select" | "count" | "insert" = "select"
): Promise<void> => {
  const config = getSimulationConfig();

  if (!config.enabled) {
    return;
  }

  // Different delays for different query types
  const multipliers = {
    select: 1,
    count: 0.5,
    insert: 1.5,
  };

  const baseDelay =
    Math.random() * (config.maxDelay - config.minDelay) + config.minDelay;
  const delay = baseDelay * multipliers[queryType];

  console.log(
    `🐌 Simulating ${Math.round(
      delay
    )}ms database delay for ${queryType} query...`
  );

  await new Promise((resolve) => setTimeout(resolve, delay));
};
