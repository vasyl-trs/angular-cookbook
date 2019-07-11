import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceRequest, RequestType } from '@app/models/http';
import * as queryString from 'query-string';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

interface QueryStringParams {
	[key: string]: any;
}

interface QueryStringOptions {
	encode?: boolean;
	strict?: boolean;
	arrayFormat?: 'none' | 'index'| 'bracket';
}

@Injectable()
export class HttpService {
	static baseURL = environment.baseURL;
	constructor(
		public http: HttpClient
	) { }

	makeRequest<T>({
		type,
		url,
		payload,
		headers: requestHeaders,
	}: ServiceRequest): Observable<T> {
		let urlWithBase = `${HttpService.baseURL}${url}`;
		let headers = new HttpHeaders(requestHeaders);

		switch (type) {
			case RequestType.GET:
			case RequestType.DELETE:
				if (payload) {
					urlWithBase = `${urlWithBase}?${queryString.stringify(payload)}`;
				}
				return this.http[type]<T>(
					urlWithBase,
					{ headers }
				);
			case RequestType.POST:
			case RequestType.PUT:
				if (!headers.has('Content-Type')) {
					headers = headers.append('Content-Type', 'application/json');
				}

				return this.http[type]<T>(
					urlWithBase,
					payload,
					{ headers }
				);
		}
	}

	stringifyQueryParams = (
		params: QueryStringParams,
		options?: QueryStringOptions
	): string => (
		queryString.stringify(params, options)
	)

	parseQueryParams = (
		str: string,
		options?: QueryStringOptions
	): QueryStringParams => (
		queryString.parse(str, options)
	)
}
