import { Injectable } from '@angular/core';
import { RecipeDomainAPI } from '@app/models/recipe.domain';
import { AsyncResponse, RequestType } from '@app/models/http';
import { HttpService } from '@app/api/http/http.service';
import { Recipe } from '@app/features/recipe/recipe.model';

@Injectable()
export class RecipeDomainAPIService implements RecipeDomainAPI {
	constructor(
		private http: HttpService
	) {}

	getRecipies = (): AsyncResponse<Recipe[]> =>
		this.http.makeRequest({
			type: RequestType.GET,
			url: '/api/recipe',
		})
}
