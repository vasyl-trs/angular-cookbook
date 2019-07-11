export type SchemeID = number | string;


export type SchemeField<E, A = undefined> = A extends undefined
	? E
	: (state: E, action: A) => E;

export type NormalizedSchemeField<T> = { [id in SchemeID]: T };

export class NormalizedScheme<T, R = undefined> {
	constructor(
		public byId: SchemeField<NormalizedSchemeField<T>, R>,
		public all: SchemeField<SchemeID[], R>
	) { }
}

export class NormalizedSchemeWithFetching<T, R = undefined> extends NormalizedScheme<T, R> {
	constructor(
		public byId: SchemeField<NormalizedSchemeField<T>, R>,
		public all: SchemeField<SchemeID[], R>,
		public isFetching: SchemeField<boolean, R>
	) {
		super(byId, all);
	}
}

export interface NormalizedActiveEntity<T = SchemeID, R = undefined> {
	active: SchemeField<R, T>;
}

export type NormalizeFields<T> = { [P in keyof T]?: NormalizedSchemeField<T[P]> };
