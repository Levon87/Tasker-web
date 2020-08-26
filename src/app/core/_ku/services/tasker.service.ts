import { KuConfig } from "../ku_config/ku-config";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, subscribeOn } from "rxjs/operators";
import { KuHttpService } from "./ku-http-services";
import { DtoTasks, DtoTask, DtoTaskResponse } from "../ku_models/api/tasksDto";
import { DtoTeams, DtoTeam } from "../ku_models/api/teamsDto";
import { DtoTeamRequest } from "../ku_models/DtoTeamRequest";
import { DtoMembers, DtoMember } from "../ku_models/api/membersDto";
import { DtoTaskRequest } from "../ku_models/DtoTaskRequest";
import { FilterRequest } from "../ku_models/api/DtoTaskFiltrRequest";
import { DtoStatusTaskRequest } from "../ku_models/api/DtoStatusTaskRequest";

@Injectable()
export class TaskerService {
	constructor(private kuService: KuHttpService) {}

	public getTasks(): Observable<DtoTasks> {
		return this.kuService
			.operate<DtoTasks>(KuConfig.GetTasks)
			.pipe(map((res) => res.data));
	}

	public GetTasks(data: FilterRequest): Observable<DtoTasks> {
		return this.kuService
			.operateWithBody<DtoTasks, FilterRequest>(data, KuConfig.GetTasks)
			.pipe(map((res) => res.data));
	}

	public getDetails(): Observable<DtoTaskResponse> {
		return this.kuService
			.operate<DtoTaskResponse>(KuConfig.GetDetails)
			.pipe(map((res) => res.data));
	}
	public getTeams(): Observable<DtoTeams> {
		return this.kuService
			.operate<DtoTeams>(KuConfig.GetTeams)
			.pipe(map((res) => res.data));
	}

	addTask(data: DtoTask): Observable<DtoTask> {
		return this.kuService
			.operateWithBody<DtoTask, DtoTask>(data, KuConfig.AddTask)
			.pipe(map((res) => res.data));
	}
	createTeam(data: DtoTeam) {
		return this.kuService.operateWithBody(data, KuConfig.CreateTeam);
	}
	public getTeam(request: DtoTeamRequest): Observable<DtoTeam> {
		return this.kuService
			.operateWithBody<DtoTeam, DtoTeamRequest>(request, KuConfig.GetTeam)
			.pipe(map((res) => res.data));
	}
	public getTask(request: DtoTaskRequest): Observable<DtoTaskResponse> {
		return this.kuService
			.operateWithBody<DtoTaskResponse, DtoTaskRequest>(
				request,
				KuConfig.GetTask
			)
			.pipe(map((res) => res.data));
	}
	public EditTeam(data: DtoTeam) {
		return this.kuService.operateWithBody(data, KuConfig.EditTeam);
	}
	public AddTask(data: DtoTask) {
		return this.kuService.operateWithBody(data, KuConfig.AddTask);
	}
	public UpdateTask(data: DtoTask) {
		return this.kuService.operateWithBody(data, KuConfig.EditTask);
	}
	public RemoveTask(data: DtoTaskRequest) {
		return this.kuService.operateWithBody(data, KuConfig.RemoveTask);
	}
	public RemoveTeamMember(data: DtoTeamRequest) {
		return this.kuService.operateWithBody(data, KuConfig.RemoveTeamMember);
	}

	public getMemberByTeamId(request: DtoTeamRequest): Observable<DtoMembers> {
		return this.kuService
			.operateWithBody<DtoMembers, DtoTeamRequest>(
				request,
				KuConfig.GetMembersByTeamId
			)
			.pipe(map((res) => res.data));
	}

	public getUsers(): Observable<DtoMembers> {
		return this.kuService
			.operate<DtoMembers>(KuConfig.GetUsers)
			.pipe(map((res) => res.data));
	}

	AddTeamMember(data: DtoTeamRequest) {
		return this.kuService.operateWithBody(data, KuConfig.AddTeamMember);
	}

	// public getTeamById(id: number): Observable<DtoTeams> {
	// 	return this.kuService
	// 		.operate<DtoTeams>(KuConfig.GetTeam)
	// 		.pipe(map(res => res.data));
	// }

	// public getFeeForServicesList(taskId: string): Observable<DtoFeeForServiceList> {
	// 	return this.kuService
	// 	.operate<DtoFeeForServiceList>(KuConfig.GetFeeForServicesList + '/' + taskId).pipe(map(res => res.data));
	// }

	// public createFeeForServiceItem(data: DtoCreateFeeForServiceItem): Observable<DtoCreateFeeForServiceItem> {
	// 	return this.kuService
	// 	.operateWithBody<DtoCreateFeeForServiceItem, DtoCreateFeeForServiceItem>(
	// 		data,
	// 		KuConfig.CreateFeeForServiceItem
	// 	)
	// 	.pipe(map(res => res.data));
	// }

	// public getReportXML(key: string): Observable<any> {
	// 	return this.kuService
	// 	.operateGet<any>(KuConfig.GetReportXML + '/' + key + '.xml').pipe(map(res => res.data));
	// }

	// public PrepareReport(key: string): Observable<any> {
	// 	return this.kuService
	// 	.operateGetFile<any>('https://prod-snet-report-api.azurewebsites.net/api/ku/prepare-template?key=' + key).pipe();
	// }

	// public uploadFiles(data: FormData) {
	// 	return this.kuService.operateWithMultipart(data, KuConfig.UploadFiles);
	// }
}
