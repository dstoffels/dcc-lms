interface NexiosConfig {
	baseURL: string;
	headers?: HeadersInit;
	params?: Record<string, string>;
}

interface RequestConfig extends RequestInit {
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
			credentials: 'include',
		};
	}

	private async request(url: string, config: RequestConfig): Promise<Response> {
		const { params, ...restConfig } = config;
		const queryString = params ? '?' + new URLSearchParams(params).toString() : '';

		let updatedConfig = { ...restConfig };
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

		const response = await fetch(this.baseURL + url + queryString, {
			...updatedConfig,
			headers,
		});

		for (const middleware of this.middleware) {
			middleware(updatedConfig, response);
		}

		if (!response.ok) {
			throw new Error(await response.text());
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
}

const nexios = new Nexios();

export default nexios;
