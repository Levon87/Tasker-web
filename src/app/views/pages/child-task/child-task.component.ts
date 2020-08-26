import {
	Component,
	ViewChild,
	OnInit,
	ChangeDetectorRef,
	Inject,
} from "@angular/core";
import {
	MatPaginator,
	MatTableDataSource,
	MatDialog,
	MatDialogRef,
	MAT_DIALOG_DATA,
} from "@angular/material";
import { TaskerService } from "../../../core/_ku/services/tasker.service";
import { DtoTeam } from "../../../core/_ku/ku_models/api/teamsDto";
import { DtoTeamRequest } from "../../../core/_ku/ku_models/DtoTeamRequest";
import { ActivatedRoute, Router } from "@angular/router";
import { DtoMember } from "../../../core/_ku/ku_models/api/membersDto";
import { DtoTask } from "../../../core/_ku/ku_models/api/tasksDto";
import { DtoUserInfo } from "../../../core/_ku/ku_models/api/DtoUserInfo";
import { formatDate } from "@angular/common";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EditTaskComponent } from "../edit-task/edit-task.component";
import * as moment from "moment";
import { StandartFilter } from "../../../core/_ku/ku_models/api/DtoTaskFiltrRequest";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

@Component({
	selector: "kt-child-task",
	templateUrl: "./child-task.component.html",
	styleUrls: ["./child-task.component.scss"],
})
export class ChildTaskComponent implements OnInit {
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
		type: "",
		value: [],
	};
	public userFiltr: StandartFilter = {
		type: "",
		value: [],
	};
	public standartfilters: StandartFilter[] = [];
	public users: DtoMember[] = [];
	public user: DtoMember = {
		id: "",
		firstName: "",
		lastName: "",
	};
	dataSource: MatTableDataSource<DtoTask>;

	constructor(
		private modalService: NgbModal,
		private exampleservice: TaskerService,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		private router: Router,
		private dialogModel: MatDialog,
		@Inject(MAT_DIALOG_DATA) public data: DtoTask
	) {}
	// simpleDialog: MatDialogRef<EditTaskComponent>;
	// openCurrentTask(task: DtoTask) {
	// 	this.simpleDialog = this.dialogModel.open(EditTaskComponent);
	// 	this.simpleDialog.componentInstance.task = task;
	// 	this.simpleDialog.componentInstance.taskTypes = this.taskTypes;
	// 	this.simpleDialog.componentInstance.users = this.users;
	// 	this.simpleDialog.componentInstance.statuses = this.statuses;
	// 	console.log(task);
	// }

	ngOnInit() {
		debugger;

		this.getDetails();
		this.getUsers();
	}

	public getUsers() {
		this.exampleservice.getUsers().subscribe((data) => {
			this.users = data.users;
		});
	}
	public getDetails() {
		this.exampleservice.getDetails().subscribe((data) => {
			//this.tasks = data.tasks;
			this.taskTypes = data.taskTypes;
			this.statuses = data.statuses;
			this.projectNames = data.projectNames;

			//this.cdr.detectChanges();
		});
	}

	// public RemoveTask(): void {
	// 	this.id = this.route.snapshot.paramMap.get("id");
	// 	let request: DtoTeamRequest = {
	// 		teamId: this.task.id,
	// 	};
	// }
	public taskStatus(type: any) {
		this.task.status = type;
	}
	public chooseTaskType(type: any) {
		this.task.taskType = type;
	}
	public assignUser(userId: any) {
		this.task.user.userId = userId;
	}

	public convertToTimestamp(date: Date): number {
		if (date instanceof Date) {
			const result = moment
				.utc(date.toUTCString().replace(".", "/"))
				.valueOf();
			return result;
		} else {
			return date;
		}
	}

	public AddSubTask(): void {
		console.log(this.task);

		this.task.deadline = new Date(this.task.deadline).getTime().toString();
		this.task.startDateTime = new Date(this.task.startDateTime)
			.getTime()
			.toString();

		this.exampleservice.AddTask(this.task).subscribe(
			() => {
				// this.router.navigate(["tasks"]);
			},
			(err) => {
				console.log(err);
			}
		);
	}

	close() {
		this.dialogModel.closeAll();
	}
	save() {
		//save data
		this.dialogModel.closeAll();
	}
	testDate: new (FormControl) => { value: null; disabled: true };
}
