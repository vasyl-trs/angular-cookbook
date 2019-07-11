import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducersToken, reducersProvider, CustomSerializer } from '.';
import { initialState } from './index';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { environment } from '@environments/environment';

const storeModules = [
	StoreModule.forRoot(reducersToken, { initialState }),
	StoreRouterConnectingModule.forRoot({
		stateKey: 'router',
	}),
];

if (!environment.production) {
	storeModules.push(
		StoreDevtoolsModule.instrument()
	);
}

@NgModule({
	imports: storeModules,
	providers: [reducersProvider, {
		provide: RouterStateSerializer,
		useClass: CustomSerializer,
	}],
}) export class ReducerModule { }
