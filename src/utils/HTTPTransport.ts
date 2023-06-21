const METHODS = {
    GET: "GET",
    PUT: "PUT",
    POST: "POST",
    DELETE: "DELETE"
} as const;

type Options = {
    method: string,
    contentType?: string;
    data?: any
}

type ResponseData = {
    status: number;
    response: Record<string, any>
}

type HTTPMethod = (url: string, options?: Partial<Options>) => Promise<ResponseData>;

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
    baseURL: string
    constructor(baseURL: string) {
        this.baseURL = `https://ya-praktikum.tech${baseURL}`;
    }
    get: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: METHODS.GET });
    };

    put: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: METHODS.PUT });
    };

    post: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: METHODS.POST });
    };

    delete: HTTPMethod = (url, options) => {
        return this.request(url, { ...options, method: METHODS.DELETE });
    };

    request = (url: string, options: Options): Promise<ResponseData> => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const _url = `${this.baseURL}${url}`;

            xhr.open(options.method, _url);

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.ontimeout = () => reject({ reason: "Timeout" });

            if(!(options.data instanceof FormData)) {
                xhr.setRequestHeader("Content-Type", "application/json")
            }

            xhr.withCredentials = true;
            xhr.responseType = "json";
            xhr.timeout = 30000;

            if (options.method === METHODS.GET || !options.data) {
                xhr.send();
            } else {
                xhr.send(options.data instanceof FormData ? options.data : JSON.stringify(options.data));
            }
        });
    };
}
