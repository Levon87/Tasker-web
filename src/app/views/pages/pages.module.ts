import { TestComponent } from "./test/test.component";
import { TaskerService } from "../../core/_ku/services/tasker.service";
import { HttpKuUtilsService } from "./../../core/_ku/utils/http-ku-utils.service";
// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
	FormsModule,
	FormArray,
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
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
	MatSelectModule,
	MatCheckboxModule,
	MatDatepickerModule,
} from "@angular/material";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { RouterModule } from "@angular/router";
import { TeamsComponent } from "./teams/teams.component";
import { TasksComponent } from "./tasks/tasks.component";
import { MembersComponent } from "./members/members.component";
import { CreateTeamComponent } from "./create-team/create-team.component";
import { BrowserModule } from "@angular/platform-browser";
import { EditTeamComponent } from "./edit-team/edit-team.component";
import { MatListModule } from "@angular/material/list";
import { EditTaskComponent } from "./edit-task/edit-task.component";
import { ChildTaskComponent } from "./child-task/child-task.component";
import { DeleteTaskComponent } from "./delete-task/delete-task.component";

@NgModule({
	declarations: [
		TestComponent,
		UsersComponent,
		UserEditComponent,
		TeamsComponent,
		MembersComponent,
		CreateTeamComponent,
		EditTeamComponent,
		TasksComponent,
		EditTaskComponent,
		ChildTaskComponent,
		DeleteTaskComponent,
	],
	exports: [],
	imports: [
		MatListModule,
		MatCheckboxModule,
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
		MatInputModule,
		MatDatepickerModule,
		//FormBuilder,
		//FormGroup,
		//FormArray
	],
	providers: [TaskerService, HttpKuUtilsService, KuHttpService],
})
export class PagesModule {}
