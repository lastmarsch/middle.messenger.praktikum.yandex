import HTTPTransport, { IOptions } from './HTTPTransport';

const httpTransport = new HTTPTransport();
const fetch = (url: string, options: IOptions) => httpTransport.request(url, options);

export default fetch;
