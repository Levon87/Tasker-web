import { ExampleService } from './../../../core/_ku/services/example.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DtoTask } from '../../../core/_ku/ku_models/api/tasksDto';

@Component({
  selector: 'kt-test',
  templateUrl: './test.component.html'
})
export class TestComponent implements OnInit {

	public tasks: DtoTask[] = [];

	public task: DtoTask = {
		description: '',
		status: 'toDo',
		title: '',
	}

  	constructor(
		  public service: ExampleService,
		  private cdr: ChangeDetectorRef
		  ) { }

	ngOnInit() {
		this.getTasks();
	}

	public addTask() {
		this.service.addTask(this.task).subscribe(data => {
			this.getTasks();
		});
	}


	private getTasks() {
		this.service.getTasks().subscribe(data => {
			this.tasks = data.items;
			this.cdr.detectChanges();
		});
	}
}
