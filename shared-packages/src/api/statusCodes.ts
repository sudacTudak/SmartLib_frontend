import { HttpStatusCode } from 'axios';
import { invert } from 'lodash';

const HttpStatusCodeToName = invert(HttpStatusCode) as {
  [key in (typeof HttpStatusCode)[keyof typeof HttpStatusCode]]: (typeof HttpStatusCode)[key];
};

export { HttpStatusCode, HttpStatusCodeToName };
