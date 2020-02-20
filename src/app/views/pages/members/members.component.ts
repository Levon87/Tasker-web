import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material";
import { DtoTeamRequest } from "../../../core/_ku/ku_models/DtoTeamRequest";
import { ExampleService } from "../../../core/_ku/services/example.service";
import { DtoTeam } from "../../../core/_ku/ku_models/api/teamsDto";
import { DtoMember } from "../../../core/_ku/ku_models/api/membersDto";

@Component({
	selector: "kt-members",
	templateUrl: "./members.component.html"
})
export class MembersComponent implements OnInit {
	//public teamId: DtoTeamRequest;
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
		private exampleservice: ExampleService,
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

	public RemoveTeamMember() {
		let request: DtoTeamRequest = {
			teamId: this.id
			
			
		};
		this.exampleservice.RemoveTeamMember(request).subscribe(() => {
			//err => {
			//console.log(err);
			//}
		});
	}
}
