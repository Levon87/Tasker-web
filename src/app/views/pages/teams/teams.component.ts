import { Component, ViewChild, OnInit, ChangeDetectorRef } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { ExampleService } from "./../../../core/_ku/services/example.service";
import { DtoTeam } from "../../../core/_ku/ku_models/api/teamsDto";
import { DtoTeamRequest } from "../../../core/_ku/ku_models/DtoTeamRequest";
import { ActivatedRoute } from "@angular/router";
import { DtoMember } from "../../../core/_ku/ku_models/api/membersDto";

@Component({
	selector: "kt-teams",
	templateUrl: "./teams.component.html"
})
export class TeamsComponent implements OnInit {
	public teams: DtoTeam[] = [];
	public team: DtoTeam = {
		name: "",
		description: "",
		leaderId: "",
		members: []
	};
	public users: DtoMember[] = [];
	public user: DtoMember = {
		id: "",
		firstName: "",
		//isDeleted: "",
		lastName: ""
		//	role: "",
	};
	dataSource: MatTableDataSource<DtoTeam>;

	constructor(
		private exampleservice: ExampleService,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute
	) {}
	displayedColumns = [
		"name",
		"description",
		"leaderId",
		"members",
		"actions"
	];

	ngOnInit() {
		this.getTeams();
		this.getUsers();
		this.team.leaderId = this.user.firstName;
	}

	// @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	/**
	 * Set the paginator after the view init since this component will
	 * be able to query its view for the initialized paginator.
	 */
	// ngAfterViewInit() {
	//   this.dataSource.paginator = this.paginator;
	//   this.exampleservice.getTeams();
	// }
	public getUsers() {
		this.exampleservice.getUsers().subscribe(data => {
			this.users = data.users;
		});
	}

	public getTeams() {
		this.exampleservice.getTeams().subscribe(data => {
			this.teams = data.teams;		 
			this.dataSource = new MatTableDataSource<DtoTeam>(this.teams);
			this.cdr.detectChanges();
		});
	}
	id: string;

	public RemoveTeamMember(): void {
		//this.id = this.route.snapshot.paramMap.get("id");
		let request: DtoTeamRequest = {
			teamId: this.team.id
		};
		this.exampleservice.RemoveTeamMember(request).subscribe(data => {
			console.log(data);
		});
	}
}
