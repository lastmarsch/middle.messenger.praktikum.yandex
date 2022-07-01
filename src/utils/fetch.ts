import { HTTPTransport, IOptions } from './HTTPTransport';

const httpTransport = new HTTPTransport();
const fetch = (url: string, options: IOptions) => httpTransport.request(`${process.env.API_ENDPOINT}/${url}`, options);

export default fetch;
