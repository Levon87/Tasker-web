import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material";
import { DtoTeamRequest } from "../../../core/_ku/ku_models/DtoTeamRequest";
import { TaskerService } from "../../../core/_ku/services/tasker.service";
import { DtoTeam } from "../../../core/_ku/ku_models/api/teamsDto";
import { DtoMember } from "../../../core/_ku/ku_models/api/membersDto";

@Component({
	selector: "kt-members",
	templateUrl: "./members.component.html"
})
export class MembersComponent implements OnInit {
	public request: DtoTeamRequest = {
		teamId: "",
		userId: []
	};

	public users: DtoMember[] = [];
	public user: DtoMember = {
		id: "",
		firstName: "",
		//isDeleted: "",
		lastName: "",
		//	role: "",
		specialization: ""
	};

	dataSource: MatTableDataSource<DtoMember>;

	constructor(
		private route: ActivatedRoute,
		private exampleservice: TaskerService,
		private cdr: ChangeDetectorRef
	) {}
	//dataSource: MatTableDataSource<DtoTeam>;
	displayedColumns = [
		//"id",
		"firstName",
		//"isDeleted",
		"lastName",
		"specialization",
		//"role",
		"actions"
	];

	id: string;
	ngOnInit() {
		this.id = this.route.snapshot.paramMap.get("id");
		this.getMemberByTeamId();
		this.getUsers();
	}

	public getUsers() {
		this.exampleservice.getUsers().subscribe(data => {
			this.users = data.users;
			console.log(this.users);
		});
	}
	public selectmember(data: any) {
		//let request: DtoTeamRequest = {
		this.request.userId = data.value;
		this.request.teamId = this.id;
		//};
	}

	private getMemberByTeamId() {
		let request: DtoTeamRequest = {
			teamId: this.id
		};

		this.exampleservice.getMemberByTeamId(request).subscribe(data => {
			this.users = data.users;
			this.dataSource = new MatTableDataSource<DtoMember>(this.users);
			this.cdr.detectChanges();
			err => {
				console.log(err);
			};
			console.log(data);
		});
	}

	public RemoveTeamMember(data: any): void {
		//let request: DtoTeamRequest = {

		this.request.userId.push(data.id);
		this.request.teamId = this.id;
		//};

		this.exampleservice.RemoveTeamMember(this.request).subscribe(() => {
			//err => {
			//console.log(err);
			//}
		});
	}

	public AddTeamMember(): void {
		//let request: DtoTeamRequest = {
		//teamId: this.id,
		//userId: iduser
		//};
		this.exampleservice.AddTeamMember(this.request).subscribe(() => {
			//err => {
			//console.log(err);
			//}
		});
	}
}
