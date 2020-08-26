import { Component, ViewChild, OnInit, ChangeDetectorRef } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { TaskerService } from "../../../core/_ku/services/tasker.service";
import { DtoTeam, DtoTeams } from "../../../core/_ku/ku_models/api/teamsDto";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { TeamsComponent } from "../teams/teams.component";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { Router, ActivatedRoute } from "@angular/router";
import { DtoMember } from "../../../core/_ku/ku_models/api/membersDto";

@Component({
	selector: "kt-create-team",
	templateUrl: "./create-team.component.html"
})
export class CreateTeamComponent {
	public teams: DtoTeam[];
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

	constructor(
		private exampleservice: TaskerService,
		private route: ActivatedRoute,
		private router: Router
	) {}
	id: string;

	ngOnInit() {
		this.id = this.route.snapshot.paramMap.get("id");
		this.getUsers();
	}

	public createTeam(): void {
		console.log(this.team);
		this.exampleservice.createTeam(this.team).subscribe(
			() => {
				this.router.navigate(["teams"]);
			},
			err => {
				console.log(err);
			}
		);
	}
	public getUsers() {
		this.exampleservice.getUsers().subscribe(data => {
			this.users = data.users;
		});
	}

	public selectleader(id: string) {
		this.team.leaderId = id;
	}

	public selectmember(data: any) {
		this.team.members = data.value;
	}
}
