import { Component, ViewChild, OnInit, ChangeDetectorRef } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { TaskerService } from "../../../core/_ku/services/tasker.service";
import { DtoTeam } from "../../../core/_ku/ku_models/api/teamsDto";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { DtoTeamRequest } from "../../../core/_ku/ku_models/DtoTeamRequest";
import { DtoMember } from "../../../core/_ku/ku_models/api/membersDto";

@Component({
	selector: "kt-edit-team",
	templateUrl: "./edit-team.component.html",
})
export class EditTeamComponent implements OnInit {
	public teamId: DtoTeamRequest;
	public teams: DtoTeam[] = [];
	public team: DtoTeam = {
		name: "",
		description: "",
		leaderId: "",
		members: [],
	};
	public users: DtoMember[] = [];
	public user: DtoMember = {
		id: "",
		firstName: "",
		isDeleted: "",
		lastName: "",
		//	role: "",
	};
	dataSource: MatTableDataSource<DtoTeam>;
	selectedId: number;

	constructor(
		private exampleservice: TaskerService,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		private router: Router
	) {}
	id: string;
	userId: string;
	ngOnInit() {
		this.id = this.route.snapshot.paramMap.get("id");
		this.getTeam();
		this.getUsers();
	}

	private getTeam() {
		let request: DtoTeamRequest = {
			teamId: this.id,
		};

		this.exampleservice.getTeam(request).subscribe((data) => {
			this.team = data;

			this.cdr.detectChanges();
			console.log(data);
		});
	}

	public EditTeam(): void {
		this.exampleservice.EditTeam(this.team).subscribe(() => {
			this.router.navigate(["teams"]);
		});
	}

	public getUsers() {
		this.exampleservice.getUsers().subscribe((data) => {
			this.users = data.users;
		});
	}

	public changeleader(id: string) {
		this.team.leaderId = id;
	}
}
