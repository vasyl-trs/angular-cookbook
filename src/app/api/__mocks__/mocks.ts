import recipeMocks from './domains/recipe';
import { MockItemAPI } from '@app/models/http';

export default [
	...recipeMocks,
];

export const apiToMock: MockItemAPI[] = [
	'getRecipies',
];
