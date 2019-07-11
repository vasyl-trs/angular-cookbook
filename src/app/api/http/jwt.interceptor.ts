import { Injectable, Provider } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '@app/services/token/token.service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
	static authHeaderName = 'Authorization';

	constructor(
		private tokenService: TokenService
	) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = this.tokenService.getToken();
		if (token) {
			const requestWithToken  = request.clone({
				headers: request.headers.set(JWTInterceptor.authHeaderName, `${token}`),
			});
			return next.handle(requestWithToken);
		}

		return next.handle(request);
	}
}

export const JWTInterceptorProvider: Provider = {
	provide: HTTP_INTERCEPTORS,
	useClass: JWTInterceptor,
	multi: true,
};
