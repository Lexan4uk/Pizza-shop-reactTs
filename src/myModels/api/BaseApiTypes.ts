export type BaseApiResponseType = {
    code: number;
    message?: string;
    payload?: Array<{ [x: string]: string }>;
  };