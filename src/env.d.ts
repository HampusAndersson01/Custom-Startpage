export {};

declare global {
  interface Window {
    __ENV?: {
      REACT_APP_HOME_ASSISTANT_API?: string;
      REACT_APP_ACCESS_TOKEN?: string;
    };
  }
}
