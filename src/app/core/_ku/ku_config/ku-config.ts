import { environment } from '../../../../environments/environment';

export class KuConfig {
	static ApiUrl = environment.baseUrl + '/api/v1';

	static Login = 'auth/login';

	static GetTasks = '/web/userTask/get-all-tasks';

	static AddTasks = '/web/userTask/add-task';
}
