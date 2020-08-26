import { TestComponent } from "./views/pages/test/test.component";
// Angular
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// Components
import { BaseComponent } from "./views/theme/base/base.component";
import { ErrorPageComponent } from "./views/theme/content/error-page/error-page.component";
// Auth
import { AuthGuard } from "./core/auth";
import { UsersComponent } from "./views/pages/users/users.component";
import { UserEditComponent } from "./views/pages/user-edit/user-edit.component";
import { TeamsComponent } from "./views/pages/teams/teams.component";
import { MembersComponent } from "./views/pages/members/members.component";
import { CreateTeamComponent } from "./views/pages/create-team/create-team.component";
import { EditTeamComponent } from "./views/pages/edit-team/edit-team.component";
import { TasksComponent } from "./views/pages/tasks/tasks.component";
import { EditTaskComponent } from "./views/pages/edit-task/edit-task.component";
import { ChildTaskComponent } from "./views/pages/child-task/child-task.component";
import { DeleteTaskComponent } from "./views/pages/delete-task/delete-task.component";

const routes: Routes = [
	{
		path: "auth",
		loadChildren: "app/views/pages/auth/auth.module#AuthModule",
	},
	{
		path: "",
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: "dashboard",
				loadChildren:
					"app/views/pages/dashboard/dashboard.module#DashboardModule",
			},
			{
				path: "wizard",
				loadChildren:
					"app/views/pages/wizard/wizard.module#WizardModule",
			},
			{
				path: "test", // <= Page URL
				component: TestComponent, // <= Page component registration
			},
			{
				path: "tasks", // <= Page URL
				component: TasksComponent, // <= Page component registration
			},
			{
				path: "tasks/edit-task/:id", // <= Page URL
				component: EditTaskComponent, // <= Page component registration
			},
			{
				path: "edit-task/tasks/", // <= Page URL
				component: EditTaskComponent, // <= Page component registration
			},
			{
				path: "child-task", // <= Page URL
				component: ChildTaskComponent, // <= Page component registration
			},
			{
				path: "delete-task", // <= Page URL
				component: DeleteTaskComponent, // <= Page component registration
			},

			{
				path: "users", // <= Page URL
				component: UsersComponent, // <= Page component registration
			},
			{
				path: "user-edit",
				component: UserEditComponent,
			},
			{
				path: "teams",
				component: TeamsComponent,
			},
			{
				path: "teams/members/:id",
				component: MembersComponent,
			},
			{
				path: "teams/create-team",
				component: CreateTeamComponent,
			},
			{
				path: "teams/edit-team/:id",
				component: EditTeamComponent,
			},
			{
				path: "error/403",
				component: ErrorPageComponent,
				data: {
					type: "error-v6",
					code: 403,
					title: "403... Access forbidden",
					desc:
						"Looks like you don't have permission to access for requested page.<br> Please, contact administrator",
				},
			},
			{ path: "error/:type", component: ErrorPageComponent },
			{ path: "", redirectTo: "dashboard", pathMatch: "full" },
			{ path: "**", redirectTo: "dashboard", pathMatch: "full" },
		],
	},

	{ path: "**", redirectTo: "error/403", pathMatch: "full" },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
