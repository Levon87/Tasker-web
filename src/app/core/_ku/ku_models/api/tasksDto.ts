import { DtoUserInfo } from "./DtoUserInfo";

export class DtoTasks {
	tasks: DtoTask[];
	taskTypes: [];
	statuses: [];
	projectNames: [];
}
export class DtoTaskResponse {
	task?: DtoTask;
	taskTypes: [];
	statuses: [];
	projectNames: [];
}

export class DtoTask {
	id?: any;
	description?: string;
	status?: string;
	currentTaskId?: string;
	recordDate?: string;
	startDateTime?: string;
	deadline?: string;
	projectName?: string;
	taskType?: string;
	estimateHours?: string;
	actualHours?: string;
	completedPercent?: string;
	childTaskId?: string[];
	parentId?: string;
	user?: DtoUserInfo;
}
