import { TaskerService } from "../../../core/_ku/services/tasker.service";
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { DtoTask } from "../../../core/_ku/ku_models/api/tasksDto";
import { DtoUserInfo } from "../../..//core/_ku/ku_models/api/DtoUserInfo";

@Component({
	selector: "kt-test",
	templateUrl: "./test.component.html",
})
export class TestComponent implements OnInit {
	public tasks: DtoTask[] = [];

	public task: DtoTask = {
		id: "",
		description: "",
		status: "",
		currentTaskId: "",
		recordDate: "",
		startDateTime: "",
		deadline: "",
		projectName: "",
		taskType: "",
		estimateHours: "",
		actualHours: "",
		completedPercent: "",
		childTaskId: [""],
		parentId: "",
		user: new DtoUserInfo(),
	};

	constructor(
		public service: TaskerService,
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.getTasks();
	}

	public addTask() {
		this.service.addTask(this.task).subscribe((data) => {
			this.getTasks();
		});
	}

	private getTasks() {
		this.service.getTasks().subscribe((data) => {
			this.tasks = data.tasks;
			this.cdr.detectChanges();
		});
	}
}
