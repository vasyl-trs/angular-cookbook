import { AppState } from '@app/models/store';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { Actions } from '@app/store/actions/recipe/recipe.actions';
import { RecipeActionTypes as actionTypes } from '@app/store/actions/recipe/recipe.actionTypes';

type RecipeState = AppState['recipes'];

export const initialState: AppState['recipes'] = {
	byId: {},
	all: [],
	isFetching: false,
};

const byId = (
	state = initialState.byId,
	action: Actions
): RecipeState['byId'] => {
	switch (action.type) {
		case actionTypes.GET_RECIPES_SUCCESS:
			return action.payload.recipes.byId;
		default:
			return state;
	}
};

const all = (
	state = initialState.all,
	action: Actions
): RecipeState['all'] => {
	switch (action.type) {
		case actionTypes.GET_RECIPES_SUCCESS:
			return action.payload.recipes.all;
		default:
			return state;
	}
};

const isFetching = (
	state = initialState.isFetching,
	action: Actions
): RecipeState['isFetching'] => {
	switch (action.type) {
		case actionTypes.GET_RECIPES:
			return true;
		case actionTypes.GET_RECIPES_FAILED:
		case actionTypes.GET_RECIPES_SUCCESS:
			return false;
		default:
			return state;
	}
};



export const recipeReducer: ActionReducer<RecipeState, Actions> = combineReducers({
	byId,
	all,
	isFetching,
});
