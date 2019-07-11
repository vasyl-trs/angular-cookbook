import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RecipeEffects } from './recipe.effects';

@NgModule({
	imports: [
		EffectsModule.forRoot([
			RecipeEffects,
		]),
	],
}) export class AppEffectsModule {}
