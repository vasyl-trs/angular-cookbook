import { ResponseScheme, ResponseSchemeError } from '@app/models/http';

export const getMockResponse = <T>(payload: T): ResponseScheme<T> => ({
	errors: [],
	payload,
	isSuccess: true,
});

export function getResponseErrors<T>({ errors }: ResponseScheme<T>) {
	return {
		error: {
			errors,
		},
	};
}

export function getResponseErrorCodes({ error }: { error: { errors: ResponseSchemeError[] } }) {
	if (error && error.errors && error.errors.length) {
		return error.errors.map(el => el.errorCode);
	}
	return null;
}
