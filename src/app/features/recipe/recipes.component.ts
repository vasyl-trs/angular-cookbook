import { Component, OnInit } from '@angular/core';
import { StoreService } from '@app/services/store/store.service';
import { GetRecipes } from '@app/store/actions/recipe/recipe.actions';
import { Observable, of } from 'rxjs';
import { Recipe } from '@app/features/recipe/recipe.model';
import * as recipeSelector from '@app/store/selectors/recipe.selectors';

@Component({
	selector: 'app-recipes',
	templateUrl: './recipes.component.html',
})

export class RecipesComponent implements OnInit {
	recipes: Observable<Recipe[]>;
	isRecipesFetching: Observable<boolean>;
	constructor(
		private storeSerivce: StoreService
	) { }

	ngOnInit() {
		this.recipes = this.storeSerivce.select(recipeSelector.recipes());
		this.isRecipesFetching = this.storeSerivce.select(recipeSelector.isRecipesFetching());
		this.storeSerivce.dispatch(new GetRecipes());
	}
}
