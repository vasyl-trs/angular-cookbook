import { NgModule } from '@angular/core';
import { RecipeModule } from './recipe/recipe.module';

const modules = [
	RecipeModule,
];

@NgModule({
	imports: modules,
	exports: modules,
}) export class FeaturesModule {}
