export interface NexiosConfig {
	baseURL: string;
	headers?: HeadersInit;
	params?: Record<string, string>;
}

export interface RequestConfig extends RequestInit {
	params?: Record<string, string>;
}

export type MiddlewareFunction = (
	reqConfig: RequestConfig,
	response?: Response,
) => void | RequestConfig | Response;

class Nexios {
	private baseURL: string;
	private headers: HeadersInit;
	private middleware: MiddlewareFunction[] = [];

	constructor(config?: NexiosConfig) {
		this.baseURL = config ? config.baseURL : '';
		this.headers = config?.headers || {
			'Content-Type': 'application/json',
		};
	}

	private async request(url: string, config: RequestConfig): Promise<Response> {
		let updatedConfig = config;
		for (let middleware of this.middleware) {
			const result = middleware(updatedConfig);
			if (result) {
				updatedConfig = { ...updatedConfig, ...result };
			}
		}

		const headers = {
			...this.headers,
			...updatedConfig.headers,
		};

		const reqConfig = {
			...updatedConfig,
			headers,
			credentials: 'include',
		};

		const reqUrl = this.baseURL + url;

		// @ts-ignore
		const response = await fetch(reqUrl, reqConfig);

		for (const middleware of this.middleware) {
			middleware(updatedConfig, response);
		}

		if (!response.ok) {
			// @ts-ignore
			throw new NexiosError(reqConfig, response, reqUrl, await response.json());
		}
		return response;
	}

	public get(url: string, config?: RequestConfig): Promise<Response> {
		return this.request(url, { method: 'GET', ...config });
	}

	public post(url: string, data?: any, config?: RequestConfig): Promise<Response> {
		return this.request(url, { method: 'POST', body: JSON.stringify(data), ...config });
	}

	public put(url: string, data?: any, config?: RequestConfig): Promise<Response> {
		return this.request(url, { method: 'PUT', body: JSON.stringify(data), ...config });
	}
	public patch(url: string, data?: any, config?: RequestConfig): Promise<Response> {
		return this.request(url, { method: 'PATCH', body: JSON.stringify(data), ...config });
	}

	public delete(url: string, config?: RequestConfig): Promise<Response> {
		return this.request(url, { method: 'DELETE', ...config });
	}

	public create(config: NexiosConfig): Nexios {
		return new Nexios(config);
	}

	public addMiddleware(middleware: MiddlewareFunction): void {
		this.middleware.push(middleware);
	}

	public getConfig = () => ({ headers: this.headers, baseURL: this.baseURL });
}

const nexios = new Nexios();

export default nexios;

export class NexiosError {
	public request: NexiosConfig;
	public response: Response;
	public body: object | null = null;
	public reqUrl: string;
	public message: string = '';

	constructor(reqConfig: NexiosConfig, response: Response, reqUrl: string, responseBody: object) {
		this.request = reqConfig;
		this.response = response;
		this.body = responseBody;
		this.reqUrl = reqUrl;

		const red = '\x1b[31m';
		const reset = '\x1b[0m';

		// @ts-ignore
		this.message = `${red}${this.request.method}: ${reqUrl} - ${response.status} (${response.statusText})\n${reset}`;

		console.log(this.message);
		console.log(this.body);
	}
}
