export class StandardFilters {
	projects: StandartFilter[];
}

export class FilterRequest {
	projectFilter: StandartFilter;
	userFilter: StandartFilter;
	statusTaskFilter: StandartFilter;
}

export class StandartFilter {
	type?: string;
	value?: string[];
}
