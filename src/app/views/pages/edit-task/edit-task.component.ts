import {
	Component,
	ViewEncapsulation,
	ChangeDetectorRef,
	ViewChild,
} from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { DtoTask, DtoTasks } from "../../../core/_ku/ku_models/api/tasksDto";
import { DtoUserInfo } from "../../../core/_ku/ku_models/api/DtoUserInfo";
import { TasksComponent } from "../tasks/tasks.component";
import { Router, ActivatedRoute } from "@angular/router";
import { DtoTaskRequest } from "../../../core/_ku/ku_models/DtoTaskRequest";
import { TaskerService } from "../../../core/_ku/services/tasker.service";
import { DtoMember } from "../../../core/_ku/ku_models/api/membersDto";
import { formatDate } from "@angular/common";
import { MatDialogRef, MatDialog } from "@angular/material";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ChildTaskComponent } from "../child-task/child-task.component";

@Component({
	templateUrl: "./edit-task.component.html",
	selector: "ngbd-modal-verticallyсentered",
})
export class EditTaskComponent {
	public tasks: DtoTask[] = [];
	public task: DtoTask = {
		id: "",
		description: "",
		status: "",
		//currentTaskId: "",
		recordDate: "",
		startDateTime: "",
		deadline: "",
		projectName: "",
		taskType: "",
		estimateHours: "",
		actualHours: "",
		completedPercent: "",
		//childTaskId: [""],
		//parentId: "",
		user: new DtoUserInfo(),
	};
	public projectNames: [];
	public taskTypes: [];
	public statuses: [];
	public users: DtoMember[] = [];
	public user: DtoMember = {
		id: "",
		firstName: "",
		isDeleted: "",
		lastName: "",
		//	role: "",
	};
	public userr: DtoUserInfo = {
		userId: "",
		firstName: "",
		lastName: "",
		//	role: "",
	};
	private modalRef: NgbModalRef;

	constructor(
		private modalService: NgbModal,
		private route: ActivatedRoute,
		private exampleservice: TaskerService,
		private cdr: ChangeDetectorRef,
		private router: Router,
		private dialogModel: MatDialog
	) {}

	simpleDialog: MatDialogRef<ChildTaskComponent>;
	openModal() {
		this.simpleDialog = this.dialogModel.open(ChildTaskComponent, {
			height: "60%",
			width: "25%",
		});
		this.simpleDialog.componentInstance.task.parentId = this.task.id;
	}
	HideModal() {
		this.modalRef.close();
	}
	public editAssignUser() {
		this.task.user = this.users.find((x) => x.id === this.userr.userId);
		debugger;
	}
	ngOnInit() {
		this.task.id = this.route.snapshot.paramMap.get("id");
		debugger;
		this.getTask();
		this.getUsers();
	}

	public UpdateTask(): void {
		this.exampleservice.UpdateTask(this.task).subscribe(() => {
			this.router.navigate(["tasks"]);
		});
	}

	public getUsers() {
		this.exampleservice.getUsers().subscribe((data) => {
			debugger;
			this.users = data.users;
		});
	}
	public getTask() {
		const request = new DtoTaskRequest();
		request.taskId = this.task.id;
		this.exampleservice.getTask(request).subscribe((data) => {
			if (data && data.task) {
				data.task.startDateTime = formatDate(
					new Date(data.task.startDateTime),
					"yyyy-MM-dd HH:mm:ss",
					"en_US",
					"UTC+0"
				);
				data.task.recordDate = formatDate(
					new Date(data.task.recordDate),
					"yyyy-MM-dd HH:mm:ss",
					"en-US",
					"UTC+0"
				);
				data.task.deadline = formatDate(
					new Date(data.task.deadline),
					"yyyy-MM-dd HH:mm:ss",
					"en-US",
					"UTC+0"
				);
			}
			debugger;
			this.task = data.task;
			if (data.task.user) {
				this.userr = data.task.user;
			}
			this.taskTypes = data.taskTypes;
			this.statuses = data.statuses;
			this.projectNames = data.projectNames;
			this.cdr.detectChanges();
		});
	}
	openCentred(simpleDialog: MatDialogRef<ChildTaskComponent>) {
		this.modalService.open(simpleDialog, { centered: true });
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
	public chooseProject(projectName: any) {
		this.task.projectName = projectName;
	}

	public addChildTask(): void {
		console.log(this.task);
		this.exampleservice.AddTask(this.task).subscribe(
			() => {
				// this.router.navigate(["tasks"]);
			},
			(err) => {
				console.log(err);
			}
		);
	}
}
