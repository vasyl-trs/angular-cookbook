import { NgModule } from '@angular/core';
import { RecipeListComponent } from './recipeList/recipeList.component';
import { SharedModule } from '@app/shared/shared.module';
import { RecipesComponent } from '@app/features/recipe/recipes.component';
import { EmptyRecipeListComponent } from './emptyRecipeList/emptyRecipeList.component';

@NgModule({
	declarations: [
		RecipeListComponent,
		RecipesComponent,
		EmptyRecipeListComponent,
	],
	exports: [
		RecipesComponent,
	],
	imports: [SharedModule],
})export class RecipeModule {}
