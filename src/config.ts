import "dotenv/config";

const getEnvValue = (variableName: string): string => {
  const variableValue = process.env[variableName];

  if (!variableValue) {
    throw Error(
      `Environment variable ${variableName} not set! Please make sure that there is a value for the environment variable ${variableName}.`
    );
  }

  return variableValue;
};

const getConfig = () => {
  return {
    url: getEnvValue("URL"),
  };
};

export default getConfig;
