import { Component, ViewChild, OnInit, ChangeDetectorRef } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { ExampleService } from "./../../../core/_ku/services/example.service";
import { DtoTeam, DtoTeams } from "../../../core/_ku/ku_models/api/teamsDto";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { TeamsComponent } from "../teams/teams.component";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";
import { Router } from "@angular/router";

@Component({
	selector: "kt-create-team",
	templateUrl: "./create-team.component.html"
})
export class CreateTeamComponent {
	visible = true;
	selectable = true;
	removable = true;
	addOnBlur = true;
	readonly separatorKeysCodes: number[] = [ENTER, COMMA];
	public teams: DtoTeam[];
	public team: DtoTeam = {
		name: "",
		description: "",
		leaderId: "",
		members: []
	};

	constructor(
		private exampleservice: ExampleService,
		private router: Router
	) {}

	public add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		if ((value || "").trim()) {
			this.team.members.push(value);
		}
		if (input) {
			input.value = "";
		}
	}

	remove(m): void {
		const index = this.team.members.indexOf(m);

		if (index >= 0) {
			this.team.members.splice(index, 1);
		}
	}

	public createTeam(): void {
		this.exampleservice.createTeam(this.team).subscribe(
			() => {
				this.router.navigate(["teams"]);
			},
			err => {
				console.log(err);
			}
		);
	}
}
