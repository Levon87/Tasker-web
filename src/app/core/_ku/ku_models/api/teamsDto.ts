export class DtoTeams {
	teams: DtoTeam[];
}

export class DtoTeam {
	id?: string;
	name: string;
	description: string;
	leaderId?: string;
	members?: string[];
}
