export enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data?: { [key: string]: number | string | object }) {
  // Можно делать трансформацию GET-параметров в отдельной функции
  let query = '';
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      query += `&${key}=${value}`;
    }
    if (query.length !== 0) {
      const queryArr = query.split('');
      queryArr[0] = '?';
      query = queryArr.join('');
    }
  }
  return query;
}

export interface IOptions {
  method: METHODS;
  retries?: number;
  timeout?: number;
  headers?: { [key: string]: string };
  data?: { [key: string]: number | string | object } | FormData;
}

export class HTTPTransport {
  get = (url: string, options: IOptions = { method: METHODS.GET, timeout: 5000 }) => this.request(
    url,
    { ...options, method: METHODS.GET },
    options.timeout,
  );

  // PUT, POST, DELETE
  put = (url: string, options: IOptions = { method: METHODS.PUT, timeout: 5000 }) => this.request(
    url,
    { ...options, method: METHODS.PUT },
    options.timeout,
  );

  post = (url: string, options: IOptions = { method: METHODS.POST, timeout: 5000 }) => this.request(
    url,
    { ...options, method: METHODS.POST },
    options.timeout,
  );

  delete = (url: string, options: IOptions = { method: METHODS.DELETE, timeout: 5000 }) => this.request(
    url,
    { ...options, method: METHODS.DELETE },
    options.timeout,
  );

  // options:
  // headers — obj
  // data — obj
  request(
    url: string,
    options: IOptions = {
      method: METHODS.GET,
    },
    timeout = 5000,
  ) : Promise<FetchResponse> {
    const { method, headers, data } = options;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject();
      }, timeout);

      const xhr = new XMLHttpRequest();

      xhr.open(method, url + queryStringify(data));

      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          xhr.setRequestHeader(key, value);
        }
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      }

      xhr.withCredentials = true;

      xhr.onload = () => resolve(xhr);

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (headers && headers!['Content-Type'] === 'multipart/form-data') {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
