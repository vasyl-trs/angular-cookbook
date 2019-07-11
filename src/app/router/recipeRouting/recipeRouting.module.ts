import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './recipeRouting.config';

@NgModule({
	exports: [ RouterModule ],
	imports: [ RouterModule.forChild(routes) ],
}) export class RecipeRoutingModule { }
