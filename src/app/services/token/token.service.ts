import { Injectable } from '@angular/core';
import { StorageKey } from '@app/models/storage';

@Injectable()
export class TokenService {
	static authTokenScheme = 'Bearer';

	getToken = () => (
		localStorage.getItem(StorageKey.JWT)
	)

	removeToken = () => {
		localStorage.removeItem(StorageKey.JWT);
	}

	parseToken = () => {
		const token = this.getToken();
		if (token) {
			return JSON.parse(atob(token.split('.')[1]));
		}
		return null;
	}
}
