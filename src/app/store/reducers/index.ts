import { AppState, RouterStateUrl } from '@app/models/store';
import { routerReducer, RouterStateSerializer } from '@ngrx/router-store';
import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { RouterStateSnapshot } from '@angular/router';
import { recipeReducer, initialState as recipesInitialState } from './recipe/recipe.reducer';

export const initialState: AppState = {
	recipes: recipesInitialState,
};

const getReducers: () => ActionReducerMap<AppState> = () => ({
	recipes: recipeReducer,
	router: routerReducer,
});

export const reducersToken = new InjectionToken<ActionReducerMap<AppState>>('Reducers');

export const reducersProvider: Provider[] = [{
		provide: reducersToken,
		useFactory: getReducers,
}];

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
	serialize(routerState: RouterStateSnapshot): RouterStateUrl {
		let route = routerState.root;

		while (route.firstChild) {
		route = route.firstChild;
		}

		const { url, root: { queryParams } } = routerState;
		const { params } = route;

		return { url, params, queryParams };
	}
}
