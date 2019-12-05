export class DtoTasks {
	items: DtoTask[];
}

export class DtoTask {
	id?: string;
	title: string;
	description: string;
	status?: string;
	userId?: string;
}
