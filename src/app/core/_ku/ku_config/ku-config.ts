import { environment } from "../../../../environments/environment";

export class KuConfig {
	static ApiUrl = environment.baseUrl + "/api/v1";

	static Login = "auth/login";

	static GetTasks = "/web/userTask/get-all-tasks";

	static AddTasks = "/web/userTask/add-task";

	static GetTeams = "teams/get-teams";

	static CreateTeam = "teams/create-team";

	static EditTeam = "teams/edit-team";

	static GetTeam = "teams/get-team";

	static RemoveTeamMember = "teams/remove-team-member";

	static GetMembersByTeamId = "teams/get-members-byteamid";

	static GetUsers = "users/get-users";

	static GetUserById = "users/get-user-by-id";

	static AddTeamMember = "teams/add-team-member";
}
