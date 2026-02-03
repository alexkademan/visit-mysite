import { chunk, displayDrafts } from '../utilities/index.js';

export const PostsByCategoryWork = (collection) => {
	const POSTS_PATH = `posts`;
	const size = 10;

	const posts = collection
		.getFilteredByTag('blogpost')
		.filter((post) => displayDrafts() || !post.data.draft)
		.sort((a, b) => {
			const aDate = new Date(a.date);
			const bDate = new Date(b.date);
			return bDate.getTime() - aDate.getTime();
		});
	
	const categories = new Map();
	for (const post of posts) {
		const category = post.data.category;

		if (categories.has(category)) {
			const existing = categories.get(category);
			categories.set(category, [...existing, post]);
		} else {
			categories.set(category, [post]);
		}
	}

	const result = [];

	for (const [category, postsInCategory] of categories) {
		if (category === 'work') {
			const chunks =
				postsInCategory.length > 0 ? chunk(postsInCategory, size) : [[]];

			const categorySlug = `/${POSTS_PATH}/${category}/`;

			const slugs = [categorySlug];
			for (let i = 1; i < chunks.length; i++) {
				slugs.push(`${categorySlug}page-${i + 1}/`);
			}

			for (let i = 0; i < chunks.length; i++) {
				const chunk = chunks[i];
				
				for (let i = 0; i < chunk.length; i++) {
					let path = chunk[i].filePathStem;
					// remove "index":
					path = path.replace(/\/[^/]*$/, '/');
					// add in the 'img' directory for the work page.
					const imgPath = `${path}img/`;
					chunk[i].imgPath = imgPath;
				}

				result.push({
					name: category,
					slug: slugs[i],
					items: chunk,
					pageNumber: i,
					hrefs: slugs,
					href: {
						next: slugs[i + 1] || null,
						previous: slugs[i - 1] || null,
						first: slugs[0] || null,
						last: slugs[slugs.length - 1] || null,
					},
					pages: chunks,
					page: {
						next: chunks[i + 1] || null,
						previous: chunks[i - 1] || null,
						first: chunks[0] || null,
						last: chunks[chunks.length - 1] || null,
					},
				});
			}
		}
	}

	for (let i = 0; i < result[0].items.length; i++) {
		const post = result[0].items[i];
	}

	return result;
};
