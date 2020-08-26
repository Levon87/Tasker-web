import {
	Component,
	ViewChild,
	OnInit,
	ChangeDetectorRef,
	AfterViewInit,
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
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { EditTaskComponent } from "../edit-task/edit-task.component";
import {
	StandartFilter,
	FilterRequest,
} from "../../../core/_ku/ku_models/api/DtoTaskFiltrRequest";
import { DtoStatusTaskRequest } from "../../../core/_ku/ku_models/api/DtoStatusTaskRequest";
import { DtoTaskRequest } from "../../../core/_ku/ku_models/DtoTaskRequest";
import { TasksComponent } from "../tasks/tasks.component";
import { FormBuilder } from "@angular/forms";

@Component({
	selector: "kt-delete-task",
	templateUrl: "./delete-task.component.html",
})
export class DeleteTaskComponent implements OnInit {
	public tasks: DtoTask[] = [];

	public task: DtoTask = {
		id: "",
		description: "",
		taskType: "",
		status: "",
		user: new DtoUserInfo(),
	};

	public users: DtoMember[] = [];
	public user: DtoMember = {
		id: "",
		firstName: "",
		lastName: "",
	};

	dataSource: MatTableDataSource<DtoTask>;
	public isDeleted: boolean = false;

	constructor(
		private modalService: NgbModal,
		private exampleservice: TaskerService,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		private router: Router,
		private dialogModel: MatDialogRef<DeleteTaskComponent>,
		private fb: FormBuilder //private tasksComponent: EditTaskComponent //private tasksComponent: EditTaskComponent
	) {
		dialogModel.beforeClose().subscribe(() => {
			dialogModel.close(this.isDeleted);
		});
	}

	ngOnInit() {}
	public getUsers() {
		this.exampleservice.getUsers().subscribe((data) => {
			this.users = data.users;
		});
	}

	close() {
		this.isDeleted = false;
		this.dialogModel.close();
	}

	public RemoveTask(id): void {
		const request: DtoTaskRequest = {
			taskId: id,
		};
		this.exampleservice.RemoveTask(request).subscribe(
			() => {
				this.isDeleted = true;
				this.dialogModel.close();
				//this.router.navigate(["tasks"]);
			},
			(err) => {
				console.log(err);
				this.dialogModel.close();
			}
		);
	}
}
