import { AsyncResponse } from './http';

export interface RecipeDomainAPI {
	getRecipies: () => AsyncResponse<any>;
}
