export class InboundRequest<T> {
	data: T;
}

export class EmptyRequestData {

}

export class InboundRequestEmpty extends InboundRequest<EmptyRequestData> {

}

export class DtoFormFiles<T> {
	Files: FormData;
	Data: T;
}
