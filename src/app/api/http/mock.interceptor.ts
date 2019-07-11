import { Injectable, Provider } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MockItem, MockItemAPI } from '@app/models/http';
import mocks, { apiToMock } from '../__mocks__/mocks';
import { getMockResponse } from '@app/helpers/Response';
import { delay } from 'rxjs/operators';

interface APIMocks {
	byId: { [K in MockItemAPI]?: MockItem };
	all: MockItemAPI[];
}

const apiMocksById =  apiToMock
	.reduce(
		(acc, v) => {
			acc[v] = mocks
				.find(m => m.api === v);
			return acc;
		},
		{}
	);

@Injectable()
export class MockInterceptor implements HttpInterceptor {

	APIMocks: APIMocks = {
		byId: apiMocksById,
		all: apiToMock,
	};

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {

		const { url, method } = request;
		const matchedMock = this.APIMocks.all
			.map(el => this.APIMocks.byId[el])
			.find(el => {
				if (el) {
					el.url.lastIndex = 0;
					return el.url.test(url) && el.method === method;
				}
				return false;
			});

		if (matchedMock) {
			matchedMock.url.lastIndex = 0;
			const params = matchedMock.url.exec(url).groups;
			const response = new HttpResponse({
				status: 200,
				body: getMockResponse(
					params
						? matchedMock.payload(params)
						: matchedMock.payload
				),
			});
			return of(response).pipe(delay(1000));
		}
		return next.handle(request);
	}
}

export const MockInterceptorProvider: Provider = {
	provide: HTTP_INTERCEPTORS,
	useClass: MockInterceptor,
	multi: true,
};
