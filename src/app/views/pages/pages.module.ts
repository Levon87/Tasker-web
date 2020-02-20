import { TestComponent } from "./test/test.component";
import { ExampleService } from "./../../core/_ku/services/example.service";
import { HttpKuUtilsService } from "./../../core/_ku/utils/http-ku-utils.service";
// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
	FormsModule,
	FormArray,
	FormBuilder,
	FormGroup,
	ReactiveFormsModule
} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
// Partials
import { PartialsModule } from "../partials/partials.module";
// Pages
import { CoreModule } from "../../core/core.module";
import { KuHttpService } from "../../core/_ku/services/ku-http-services";
import { UsersComponent } from "./users/users.component";
import {
	MatTableModule,
	MatPaginatorModule,
	MatIconModule,
	MatMenuModule,
	MatTabsModule,
	MatFormFieldModule,
	MatInputModule,
	MatChipsModule,
	MatSelectModule
} from "@angular/material";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { RouterModule } from "@angular/router";
import { TeamsComponent } from "./teams/teams.component";
import { MembersComponent } from "./members/members.component";
import { CreateTeamComponent } from "./create-team/create-team.component";
import { BrowserModule } from "@angular/platform-browser";
import { EditTeamComponent } from "./edit-team/edit-team.component";

@NgModule({
	declarations: [
		TestComponent,
		UsersComponent,
		UserEditComponent,
		TeamsComponent,
		MembersComponent,
		CreateTeamComponent,
		EditTeamComponent
	],
	exports: [],
	imports: [
		MatSelectModule,
		ReactiveFormsModule,
		MatIconModule,
		MatPaginatorModule,
		MatTableModule,
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		RouterModule,
		MatMenuModule,
		MatTabsModule,
		MatFormFieldModule,
		MatInputModule,
		BrowserModule,
		MatChipsModule,
		//NgModule,
		MatInputModule
		//FormBuilder,
		//FormGroup,
		//FormArray
	],
	providers: [ExampleService, HttpKuUtilsService, KuHttpService]
})
export class PagesModule {}
