export class KuRequest<T> {
	data?: T;
	code?: number;
	message?: string;
	error?: {
		details: string;
		statusCode: number;
	};
}
