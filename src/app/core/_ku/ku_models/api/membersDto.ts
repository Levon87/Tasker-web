export class DtoMembers {
	users: DtoMember[];
}

export class DtoMember {
	id?: string;
	firstName: string;
	isDeleted?: string;
	lastName: string;
	role?: string;
	specialization?: string;
}
