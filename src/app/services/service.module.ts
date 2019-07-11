import { NgModule } from '@angular/core';
import { TokenService } from '@app/services/token/token.service';
import { StoreService } from '@app/services/store/store.service';

@NgModule({
	providers: [
		TokenService,
		StoreService,
	],
}) export class ServiceModule {}
