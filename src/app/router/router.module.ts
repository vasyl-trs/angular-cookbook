import { RecipeRoutingModule } from './recipeRouting/recipeRouting.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

export const rootRoutes: Routes = [
	{
		path: '',
		redirectTo: '/recipes',
		pathMatch: 'full',
	},
];

const routerOptions: ExtraOptions = { useHash: true };

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forRoot(rootRoutes, routerOptions)],
}) class RootRoutingModule {}

const modules = [
	RecipeRoutingModule,
	RootRoutingModule,
];

@NgModule({
	imports: modules,
	exports: modules,
})
export class AppRouterModule { }
