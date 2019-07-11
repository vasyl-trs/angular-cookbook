import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { RecipeDomainAPIService } from '@app/api/domains/recipe';
import { RecipeActionTypes } from '../actions/recipe/recipe.actionTypes';
import { switchMap, map, catchError } from 'rxjs/operators';
import { GetRecipesSuccess, GetRecipesFailed } from '../actions/recipe/recipe.actions';
import { throwError } from 'rxjs';
import { ofTypeExt, handleSuccessRequest, handleFailedRequest } from '@app/helpers/Store';
import { normalize } from 'normalizr';
import { arrayOfCommonScheme } from '@app/helpers/DataNormalizer';

@Injectable()
export class RecipeEffects {
	constructor(
		private action$: Actions,
		private api: RecipeDomainAPIService
	) {}

	@Effect()
	getRecipes$ = this.action$
		.pipe(
			ofTypeExt(RecipeActionTypes.GET_RECIPES),
			switchMap(({ action }) =>
				this.api.getRecipies()
					.pipe(
						handleSuccessRequest(
							({ payload }) => {
								const { entities: { byId }, result: all } = normalize(payload, arrayOfCommonScheme);
								return new GetRecipesSuccess({
									recipes: {
										byId,
										all,
									},
								});
							}
						),
						catchError(handleFailedRequest(
							new GetRecipesFailed({
								msg: `can't get recipes`,
								action,
							})
						))
					)
			)
		);
}
