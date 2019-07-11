import { ErrorCodes } from '@app/models/http';

export class AppAction<T = undefined> {
	readonly type: string;
	constructor(public payload?: T) {}
}

export class FailedActionPayload<A> {
	msg: string;
	action: A;
	error?: Error;
	serverMessages?: ErrorCodes[];
}

export enum ActionTypeEndings {
	SUCCESS = '_SUCCESS',
	FAILED = '_FAILED',
}

export class FailedAction<A = AppAction<any>> extends AppAction<FailedActionPayload<A>> { }
