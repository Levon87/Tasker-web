import { environment } from '../../../../environments/environment';

export class KuConfig {
	static ApiUrl = environment.baseUrl + '/api/v1';

	static Login = 'auth/login';
}
