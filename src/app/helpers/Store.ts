import { ResponseScheme } from '@app/models/http';
import { AppAction, FailedAction } from '@app/models/action';
import { Observable, of, OperatorFunction } from 'rxjs';
import { getResponseErrors, getResponseErrorCodes } from './Response';

export const handleSuccessRequest = <
	P,
	T extends ResponseScheme<P>,
	A extends AppAction<any>
>(cb: (v: T, p?: P) => A | A[]) => (source: Observable<T>) =>
	new Observable(observer => source.subscribe({
		next(x) {
			if (x.isSuccess) {
				try {
					observer.next(cb(x, x.payload));
				} catch (error) {
					observer.error(error);
				}
			} else {
				observer.error(getResponseErrors(x));
			}
		},
		error(error) { observer.error(error); },
		complete() { observer.complete(); },
	}));

export const handleFailedRequest = <A extends FailedAction>(action: A) => (error): Observable<A> =>
	of(Object.assign(action, {
		payload: {
			...action.payload,
			error,
			serverMessages: getResponseErrorCodes(error),
		},
	}));

export const ofTypeExt = <
	T extends AppAction<any>
>(...allowedTypes: string[]): OperatorFunction<AppAction<any>, { action: T, payload: T['payload'] }> =>
	(source: Observable<T>) =>
		new Observable(observer => source.subscribe({
			next(action) {
				if (allowedTypes.includes(action.type)) {
					observer.next({
						action,
						payload: action.payload,
					});
				}
			},
			error(error) { observer.error(error); },
			complete() { observer.complete(); },
		}));
