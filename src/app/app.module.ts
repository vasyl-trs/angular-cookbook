import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module';
import { ServiceModule } from './services/service.module';
import { AppRouterModule } from './router/router.module';
import { AppEffectsModule } from './store/effects/effects.module';
import { ReducerModule } from './store/reducers/reducer.module';
import { APIModule } from './api/api.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		SharedModule,
		FeaturesModule,
		APIModule,
		ServiceModule,
		AppEffectsModule,
		ReducerModule,
		AppRouterModule,
		BrowserAnimationsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
