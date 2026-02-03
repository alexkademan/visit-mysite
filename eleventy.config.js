import pluginWebc from "@11ty/eleventy-plugin-webc";

import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

import pluginFilters from "./_config/filters.js";

import { PostsByCategory } from './_collections/posts-by-category.js';
import { PostsByCategoryWork } from './_collections/posts-by-category-work.js';
import { PostsByCategoryPagination } from './_collections/posts-by-category-pagination.js';
import { Posts } from './_collections/posts.js';

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default function(eleventyConfig) {
	eleventyConfig.ignores.add("README.md");

	eleventyConfig.addPlugin(pluginWebc, {
		components: [
			"./_components/**/*.webc",
			"npm:@11ty/is-land/*.webc"
		]
	});

	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	eleventyConfig.setServerOptions({
		domDiff: false
	});

	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// output image formats
		formats: ["avif", "webp", "jpeg"],

		// output image widths
		widths: ["auto"],

		// optional, attributes assigned on <img> nodes override these values
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
			},
			pictureAttributes: {}
		},
	});

	/* Collections */
	eleventyConfig.addCollection('posts', Posts);
	eleventyConfig.addCollection('postsByCategory', PostsByCategory);
	eleventyConfig.addCollection('postsByCategoryWork', PostsByCategoryWork);

	eleventyConfig.addCollection("work", async (collectionsApi) => {
		// get unsorted items
		return collectionsApi.getAll();
	});

	// Get only content that matches a tag
	eleventyConfig.addCollection("myPosts", function (collectionsApi) {
		return collectionsApi.getFilteredByTag("post");
	});

	eleventyConfig.addPassthroughCopy("./content/fonts/DMSerifDisplay-Regular.woff2");
	eleventyConfig.addPassthroughCopy("./content/fonts/LibreCaslonText-Bold.woff2");
	eleventyConfig.addPassthroughCopy("./content/fonts/Lato-Light.woff2");
	eleventyConfig.addPassthroughCopy("./content/fonts/Lato-LightItalic.woff2");
	eleventyConfig.addPassthroughCopy("./content/fonts/Lato-Regular.woff2");
	eleventyConfig.addPassthroughCopy("./content/fonts/Lato-Black.woff2");

	eleventyConfig.addPassthroughCopy("./content/svg/alexkademan-bg6.svg");
	eleventyConfig.addPassthroughCopy("./content/svg/ak-logomark.svg");
	eleventyConfig.addPassthroughCopy("./content/svg/footer-ak-icon.svg");
	eleventyConfig.addPassthroughCopy("./content/images/og-image-jessica-kademan.png");
	eleventyConfig.addPassthroughCopy("./content/images/favicon.png");
	eleventyConfig.addPassthroughCopy("./content/images/favicon.ico");

	eleventyConfig.addPassthroughCopy("./content/css/reset.css");
	eleventyConfig.addPassthroughCopy("./content/css/base.css");
	eleventyConfig.addPassthroughCopy("./content/css/work.css");

	// Filters
	eleventyConfig.addPlugin(pluginFilters);

	
	// eleventyConfig.addPlugin(IdAttributePlugin, {
		// by default we use Eleventy’s built-in `slugify` filter:
		// slugify: eleventyConfig.getFilter("slugify"),
		// selector: "h1,h2,h3,h4,h5,h6", // default
	// });

	eleventyConfig.addShortcode("currentBuildDate", () => {
		return (new Date()).toISOString();
	});

	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
};

export const config = {
	dir: {
		input: "content",          // default: "."
		includes: "../_includes",  // default: "_includes"
		data: "../_data",          // default: "_data"
	}
};
