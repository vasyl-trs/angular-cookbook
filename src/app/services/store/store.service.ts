import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/models/store';
import { AppAction } from '@app/models/action';
import { map, distinctUntilChanged } from 'rxjs/operators';
import * as deepEqual from 'fast-deep-equal';
import { Subscription } from 'rxjs';

export type Selector<T = any> = (state: AppState) => T;
export type Subscriber<T = any> = (value: T) => void;
export type UnsubscribeFn = () => void;

@Injectable()
export class StoreService {
	constructor(
		private store$: Store<AppState>
	) { }

	connect<Sel extends Selector, Sub extends Subscriber>(
		connections: Map<Sel, Sub>,
		skipOptimization?: boolean
	) {
		const storeWorker = this.createStoreWorker(skipOptimization);
		const subscriptions: Subscription[] = Array
			.from(connections)
			.map(([selector, subscriber]) =>
				this.select(selector)
					.pipe(storeWorker())
					.subscribe(subscriber)
			);

		return this.disconnect(subscriptions);
	}

	select = <T>(selector: Selector<T>) => (
		this.store$.pipe(
			select<AppState, T, T>(selector)
		)
	)

	dispatch<T>(action: AppAction<T>) {
		this.store$.dispatch(action);
	}

	private disconnect = (subscription: Subscription[] = []) => (
		() => {
			subscription.forEach(c => c.unsubscribe());
		}
	)

	private createStoreWorker = (skipOptimization?: boolean) => (
		() =>
			skipOptimization
				? map(value => value)
				: distinctUntilChanged((prevValue, nextValue) => deepEqual(prevValue, nextValue))
	)
}
