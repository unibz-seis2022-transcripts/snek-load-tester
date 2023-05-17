import 'dotenv/config';

const getEnvValue = (variableName: string): string => {
  const variableValue = process.env[variableName];

  if (!variableValue) {
    throw Error(
      `Environment variable ${variableName} not set! Please make sure that there is a value for the environment variable ${variableName}.`,
    );
  }

  return variableValue;
};

const getConfig = () => {
  return {
    chromiumExecutablePath: getEnvValue('CHROMIUM_EXECUTABLE_PATH'),
    url: getEnvValue('URL'),
    playerCount: +getEnvValue('PLAYER_COUNT'),
    connectDelayMs: +getEnvValue('CONNECT_DELAY_MS'),
  };
};

export default getConfig;
