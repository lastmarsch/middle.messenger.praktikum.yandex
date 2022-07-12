import apiEndpoint from '../const/apiEndpoint';
import { HTTPTransport, IOptions } from './HTTPTransport';

const httpTransport = new HTTPTransport();
const fetch = (url: string, options: IOptions) => httpTransport.request(`${apiEndpoint}/${url}`, options);

export default fetch;
