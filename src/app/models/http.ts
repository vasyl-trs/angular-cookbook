import { Observable } from 'rxjs';
import { RecipeDomainAPI } from './recipe.domain';

export interface ServiceRequest {
	url: string;
	type: RequestType;
	payload?: { [key: string]: any };
	headers?: { [key: string]: any };
}

export enum RequestType {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete',
}

export enum HttpRequestMethod {
	GET = 'GET',
	POST = 'POST',
	DELETE = 'DELETE',
	PATCH = 'PATCH',
	PUT = 'PUT',
}

export interface ResponseScheme<T> {
	readonly isSuccess: boolean;
	readonly payload: T;
	readonly errors: {
		message: string,
		errorCode: ErrorCodes
	}[];
}

export type AsyncResponse<T> = Observable<ResponseScheme<T>>;

export interface ResponseSchemeError {
	errorCode: ErrorCodes;
	message: string;
}

export enum ErrorCodes {
	Recipe_TitleTooLong = 'Recipe title is too long',
}

export interface MockItem {
	url: RegExp;
	method: HttpRequestMethod;
	api: MockItemAPI;
	payload: any;
}

export type MockItemAPI = keyof RecipeDomainAPI;
