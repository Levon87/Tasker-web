import {
	Component,
	ViewChild,
	OnInit,
	ChangeDetectorRef,
	forwardRef,
} from "@angular/core";
import {
	MatPaginator,
	MatTableDataSource,
	MatDialog,
	MatDialogRef,
} from "@angular/material";
import { TaskerService } from "../../../core/_ku/services/tasker.service";
import { DtoTeam } from "../../../core/_ku/ku_models/api/teamsDto";
import { DtoTeamRequest } from "../../../core/_ku/ku_models/DtoTeamRequest";
import { ActivatedRoute, Router } from "@angular/router";
import { DtoMember } from "../../../core/_ku/ku_models/api/membersDto";
import { DtoTask } from "../../../core/_ku/ku_models/api/tasksDto";
import { DtoUserInfo } from "../../../core/_ku/ku_models/api/DtoUserInfo";
import { formatDate } from "@angular/common";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { EditTaskComponent } from "../edit-task/edit-task.component";
import {
	StandartFilter,
	FilterRequest,
} from "../../../core/_ku/ku_models/api/DtoTaskFiltrRequest";
import { DeleteTaskComponent } from "../delete-task/delete-task.component";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { MatOption } from "@angular/material";
import { DtoTaskRequest } from "../../../core/_ku/ku_models/DtoTaskRequest";

@Component({
	selector: "kt-tasks",
	templateUrl: "./tasks.component.html",
	styleUrls: ["./tasks.component.scss"],
})
export class TasksComponent implements OnInit {
	filterProjectNameForm: FormGroup;
	filterAssignUserNameForm: FormGroup;
	filterbyStatusForm: FormGroup;

	public tasks: DtoTask[] = [];
	public taskTypes: [];
	public statuses: [];
	public projectNames: [];

	public task: DtoTask = {
		description: "",
		taskType: "",
		status: "",
		user: new DtoUserInfo(),
	};
	public taskFiltr: StandartFilter = {
		type: "off",
		value: [],
	};
	public userFiltr: StandartFilter = {
		type: "off",
		value: [],
	};
	public statusFiltr: StandartFilter = {
		type: "off",
		value: [],
	};
	public standartfilters: StandartFilter[] = [];
	public users: DtoMember[] = [];
	public user: DtoMember = {
		id: "",
		firstName: "",
		lastName: "",
	};

	// public userss: DtoUserInfo[] = [];
	// public userr: DtoUserInfo = {
	// 	userId: "",
	// 	firstName: "",
	// 	lastName: "",
	// 	//	role: "",
	// };

	private taskscomponent: TasksComponent;
	dataSource: MatTableDataSource<DtoTask>;
	@ViewChild("allSelected", { read: "", static: false })
	private allSelected: MatOption;
	@ViewChild("allSelectedUser", { read: "", static: false })
	private allSelectedUser: MatOption;
	@ViewChild("allSelectedStatus", { read: "", static: false })
	private allSelectedStatus: MatOption;
	constructor(
		public modalService: NgbModal,
		public exampleservice: TaskerService,
		public cdr: ChangeDetectorRef,
		public route: ActivatedRoute,
		public router: Router,
		public dialogModel: MatDialog,
		public fb: FormBuilder
	) {}

	removetask: MatDialogRef<DeleteTaskComponent>;
	// openCurrentTask(task: DtoTask) {
	// 	this.simpleDialog = this.dialogModel.open(EditTaskComponent);
	// 	this.simpleDialog.componentInstance.task = task;
	// 	this.simpleDialog.componentInstance.taskTypes = this.taskTypes;
	// 	this.simpleDialog.componentInstance.users = this.users;
	// 	this.simpleDialog.componentInstance.statuses = this.statuses;
	// 	console.log(task);
	// }
	displayedColumns = [
		"projectName",
		"currentTaskId",
		"description",
		"recordDate",
		"startDateTime",
		"deadLine",
		"taskType",
		"status",
		"estimateHours",
		"actualHours",
		"completedPercent",
		"userInfo",
		"actions",
	];

	ngOnInit() {
		debugger;
		this.filterProjectNameForm = this.fb.group({
			projectName: new FormControl(""),
		});
		this.filterAssignUserNameForm = this.fb.group({
			user: new FormControl(""),
		});
		this.filterbyStatusForm = this.fb.group({
			status: new FormControl(""),
		});
		this.getTasks();
		this.getUsers();
	}

	togglePerOne(all) {
		if (this.allSelected.selected) {
			this.allSelected.deselect();
		}
		if (
			this.filterProjectNameForm.controls.projectName.value.length ==
			this.projectNames.length
		) {
			this.allSelected.select();
		}
		this.getTasks();
	}
	toggleUserPerOne(all) {
		debugger;
		if (this.allSelectedUser.selected) {
			this.allSelectedUser.deselect();
		}
		if (
			this.filterAssignUserNameForm.controls.user.value.length ==
			this.users.length
		) {
			this.allSelectedUser.select();
		}
		this.getTasks();
	}
	toggleStatusPerOne(all) {
		debugger;
		if (this.allSelectedStatus.selected) {
			this.allSelectedStatus.deselect();
		}
		if (
			this.filterbyStatusForm.controls.status.value.length ==
			this.statuses.length
		) {
			this.allSelectedStatus.select();
		}
		this.getTasks();
	}
	toggleAllSelection() {
		if (this.allSelected.selected) {
			this.filterProjectNameForm.controls.projectName.setValue(
				this.projectNames
			);
			this.allSelected.select();
		} else {
			this.filterProjectNameForm.controls.projectName.reset();
		}
		this.getTasks();
	}
	toggleAllStatusSelection() {
		if (this.allSelectedStatus.selected) {
			this.filterbyStatusForm.controls.status.setValue(this.statuses);
			this.allSelectedStatus.select();
		} else {
			this.filterbyStatusForm.controls.status.reset();
		}
		this.getTasks();
	}
	toggleAllUserSelection() {
		debugger;
		if (this.allSelectedUser.selected) {
			this.filterAssignUserNameForm.controls.user.setValue(
				this.users.map((x) => x.id)
			);
			this.allSelectedUser.select();
		} else {
			this.filterAssignUserNameForm.controls.user.reset();
		}
		this.getTasks();
	}

	public getUsers() {
		this.exampleservice.getUsers().subscribe((data) => {
			this.users = data.users;
		});
	}
	// laucnhModal(content) {
	// 	this.modalService.open(content, {
	// 		size: <any>"xxl",
	// 		backdrop: "static",
	// 	});
	// }
	openCentred(content) {
		debugger;
		this.modalService.open(content, { centered: true });
	}
	openRemoveDialog(id: any) {
		debugger;
		this.removetask = this.dialogModel.open(DeleteTaskComponent, {
			height: "25%",
			width: "25%",
		});
		this.removetask.componentInstance.task.id = id;
		this.task.id = id;
	}
	openDialog(id): void {
		let dialogRef = this.dialogModel.open(DeleteTaskComponent, {
			height: "25%",
			width: "25%",
		});
		dialogRef.componentInstance.task.id = id;
		dialogRef.afterClosed().subscribe((result: boolean) => {
			if (result) {
				this.getTasks();
			}
		});
	}

	changeTaskFilter(projectName: any) {
		debugger;
		if (projectName.value != null && projectName.value != "") {
			this.taskFiltr.type = "on";
			this.taskFiltr.value = projectName.value;
		} else {
			this.taskFiltr.type = "off";
			this.taskFiltr.value = [];
		}
		this.getTasks();
	}

	public getTasks() {
		debugger;
		const requestData = new FilterRequest();
		let selectedProjects = this.filterProjectNameForm.controls.projectName
			.value;
		if (
			selectedProjects.length > 0 &&
			selectedProjects.length < this.projectNames.length
		) {
			this.taskFiltr.type = "on";
			this.taskFiltr.value = selectedProjects;
		} else {
			this.taskFiltr.type = "off";
			this.taskFiltr.value = [];
		}

		let selectedUsers = this.filterAssignUserNameForm.controls.user.value;
		if (
			selectedUsers.length > 0 &&
			selectedUsers.length < this.users.length
		) {
			this.userFiltr.type = "on";
			this.userFiltr.value = selectedUsers;
		} else {
			this.userFiltr.type = "off";
			this.userFiltr.value = [];
		}
		let selectedStatuses = this.filterbyStatusForm.controls.status.value;
		if (
			selectedStatuses.length > 0 &&
			selectedStatuses.length < this.statuses.length
		) {
			this.statusFiltr.type = "on";
			this.statusFiltr.value = selectedStatuses;
		} else {
			this.statusFiltr.type = "off";
			this.statusFiltr.value = [];
		}
		requestData.projectFilter = this.taskFiltr;
		requestData.userFilter = this.userFiltr;
		requestData.statusTaskFilter = this.statusFiltr;

		this.exampleservice.GetTasks(requestData).subscribe((data) => {
			if (data) {
				data.tasks.forEach((element) => {
					element.startDateTime = formatDate(
						new Date(element.startDateTime),
						"yyyy-MM-dd HH:mm:ss",
						"en_US",
						"UTC+0"
					);
					element.recordDate = formatDate(
						new Date(element.recordDate),
						"yyyy-MM-dd HH:mm:ss",
						"en-US",
						"UTC+0"
					);
					element.deadline = formatDate(
						new Date(element.deadline),
						"yyyy-MM-dd HH:mm:ss",
						"en-US",
						"UTC+0"
					);
					if (element.completedPercent == null) {
						element.completedPercent = "0";
					}
				});

				this.tasks = data.tasks;

				this.dataSource = new MatTableDataSource<DtoTask>(this.tasks);
				this.taskTypes = data.taskTypes;
				debugger;
				this.statuses = data.statuses;
				this.projectNames = data.projectNames;

				this.cdr.detectChanges();

				//this.router.navigate(["tasks"]);
			}
		});
	}

	public taskStatus(type: any) {
		this.task.status = type;
	}
	public chooseTaskType(type: any) {
		this.task.taskType = type;
	}
	public assignUser(userId: any) {
		this.task.user.userId = userId;
	}
	close() {
		this.dialogModel.closeAll();
	}
	public AddTask(): void {
		console.log(this.task);
		this.task.deadline = new Date(this.task.deadline).getTime().toString();
		this.task.startDateTime = new Date(this.task.startDateTime)
			.getTime()
			.toString();
		this.task.recordDate = new Date().getTime().toString();
		this.exampleservice.AddTask(this.task).subscribe(
			() => {
				this.modalService.dismissAll();
				this.getTasks();
			},
			(err) => {
				console.log(err);
			}
		);
	}
	public RemoveTask(id): void {
		const request: DtoTaskRequest = {
			taskId: id,
		};
		debugger;
		this.exampleservice.RemoveTask(request).subscribe(
			() => {
				debugger;
				this.router.navigate(["tasks"]);
			},
			(err) => {
				console.log(err);
			}
		);
		debugger;
		this.exampleservice.getTasks();
		debugger;
		this.modalService.dismissAll();
	}
}
