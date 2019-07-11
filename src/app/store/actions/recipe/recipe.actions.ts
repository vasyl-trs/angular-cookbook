import { AppAction, FailedAction } from '@app/models/action';
import { RecipeActionTypes as actionTypes } from './recipe.actionTypes';
import { NormalizedScheme } from '@app/models/dataSheme';
import { Recipe } from '@app/features/recipe/recipe.model';

export class GetRecipes extends AppAction {
	readonly type = actionTypes.GET_RECIPES;
}

export class GetRecipesFailed extends FailedAction {
	readonly type = actionTypes.GET_RECIPES_FAILED;
}

export class GetRecipesSuccess extends AppAction<{ recipes: NormalizedScheme<Recipe> }> {
	readonly type = actionTypes.GET_RECIPES_SUCCESS;
}

export type Actions =
	| GetRecipes
	| GetRecipesFailed
	| GetRecipesSuccess;
