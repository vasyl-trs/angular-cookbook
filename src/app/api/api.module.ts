import { NgModule } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpService } from './http/http.service';
import { JWTInterceptorProvider } from './http/jwt.interceptor';
import { MockInterceptorProvider } from './http/mock.interceptor';
import { RecipeDomainAPIService } from './domains/recipe';
import { HttpClientModule } from '@angular/common/http';

const isMocksAllowed = environment.allowMocks || !environment.production;

const mainServices =  [
	RecipeDomainAPIService,
	HttpService,
	JWTInterceptorProvider,
];

const providers = isMocksAllowed
	? [
		...mainServices,
		MockInterceptorProvider,
	]
	: mainServices;

@NgModule({
	providers,
	imports: [HttpClientModule],
	exports: [HttpClientModule],
})
export class APIModule {}
