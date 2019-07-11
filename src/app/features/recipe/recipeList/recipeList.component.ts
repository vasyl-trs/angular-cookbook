import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '@app/features/recipe/recipe.model';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipeList.component.html',
	styleUrls: [
		'./recipeList.component.sass',
	],
})

export class RecipeListComponent implements OnInit {
	@Input() recipes: Recipe[];

	constructor(
	) { }

	ngOnInit() {
	}
}
