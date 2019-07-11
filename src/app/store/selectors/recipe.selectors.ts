import { AppState } from '@app/models/store';

export const recipes = () =>
	(state: AppState) => state.recipes.all.map(id => state.recipes.byId[id]);

export const isRecipesFetching = () =>
	(state: AppState) => state.recipes.isFetching;
