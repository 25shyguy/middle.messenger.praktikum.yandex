const METHODS = {
    GET: "GET",
    PUT: "PUT",
    POST: "POST",
    DELETE: "DELETE"
} as const;

type Options = {
    method: string,
    data?: any
}

function queryStringify(data: any) {
    let result = "";
    if (data) {
        Object.keys(data).forEach((key, index) => {
            if (index === 0) {
                result += "?";
            } else {
                result += "&";
            }
            result += `${key}=${data[key].toString()}`;
        })
    }
    return result;
}

export class HTTPTransport {
    get = (url: string, options: Options) => {
        return this.request(url, { ...options, method: METHODS.GET });
    };

    put = (url: string, options: Options) => {
        return this.request(url, { ...options, method: METHODS.PUT });
    };

    post = (url: string, options: Options) => {
        return this.request(url, { ...options, method: METHODS.POST });
    };

    delete = (url: string, options: Options) => {
        return this.request(url, { ...options, method: METHODS.DELETE });
    };

    request = (url: string, options: Options) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const _url = `${url}${queryStringify(options.data)}`;

            xhr.open(options.method, _url);

            xhr.onload = function () {
                resolve(xhr);
            };

            const errorHandler = (e: ProgressEvent) => {
                console.log(e);
            }

            xhr.onabort = errorHandler;
            xhr.onerror = errorHandler;

            xhr.timeout = 30000;
            xhr.ontimeout = () => reject({ reason: "Timeout" });

            xhr.withCredentials = true;
            xhr.responseType = "json";

            if (options.method === METHODS.GET || !options.data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(options.data));
            }
        });
    };
}
