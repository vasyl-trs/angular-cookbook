import { Params } from '@angular/router';
import { NormalizedSchemeWithFetching } from './dataSheme';
import { Recipe } from '@app/features/recipe/recipe.model';

export interface AppState {
	recipes: NormalizedSchemeWithFetching<Recipe>;
}

export interface RouterStateUrl {
	url: string;
	params: Params;
	queryParams: Params;
}
