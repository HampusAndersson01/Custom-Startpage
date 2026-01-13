type RuntimeEnv = {
  REACT_APP_HOME_ASSISTANT_API?: string;
  REACT_APP_ACCESS_TOKEN?: string;
};

const runtimeEnv: RuntimeEnv =
  typeof window !== "undefined" && window.__ENV ? window.__ENV : {};

const buildEnv: RuntimeEnv = {
  REACT_APP_HOME_ASSISTANT_API: process.env.REACT_APP_HOME_ASSISTANT_API,
  REACT_APP_ACCESS_TOKEN: process.env.REACT_APP_ACCESS_TOKEN,
};

export const getEnv = (key: keyof RuntimeEnv): string | undefined => {
  const runtimeValue = runtimeEnv[key];
  if (runtimeValue !== undefined && runtimeValue !== "") {
    return runtimeValue;
  }
  return buildEnv[key];
};
