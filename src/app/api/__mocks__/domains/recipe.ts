import { MockItem, HttpRequestMethod } from '@app/models/http';
import { Recipe } from '@app/features/recipe/recipe.model';

const mocks: MockItem[] = [
	{
		api: 'getRecipies',
		method: HttpRequestMethod.GET,
		url: /api\/recipe/g,
		payload: [
			{
				id: 1,
				title: 'Recipe',
				description: 'Recipe Description',
			},
			{
				id: 1,
				title: 'Recipe',
				description: 'Recipe Description',
			},
		] as Recipe[],
	},
];

export default mocks;
