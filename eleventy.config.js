import pluginWebc from "@11ty/eleventy-plugin-webc";
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

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

	eleventyConfig.addPassthroughCopy("./content/fonts/DMSerifDisplay-Regular.woff2");
	eleventyConfig.addPassthroughCopy("./content/fonts/LibreCaslonText-Bold.woff2");
	eleventyConfig.addPassthroughCopy("./content/fonts/Lato-Light.woff2");
	eleventyConfig.addPassthroughCopy("./content/fonts/Lato-LightItalic.woff2");
	eleventyConfig.addPassthroughCopy("./content/fonts/Lato-Regular.woff2");
	eleventyConfig.addPassthroughCopy("./content/fonts/Lato-Black.woff2");

	eleventyConfig.addPassthroughCopy("./content/svg/alexkademan-bg6.svg");
	eleventyConfig.addPassthroughCopy("./content/svg/ak-logomark.svg");
	eleventyConfig.addPassthroughCopy("./content/svg/footer-ak-icon.svg");
	eleventyConfig.addPassthroughCopy("./content/images/og-image-alex-kademan.gif");
	eleventyConfig.addPassthroughCopy("./content/images/favicon.png");
	eleventyConfig.addPassthroughCopy("./content/images/favicon.ico");

	eleventyConfig.addPassthroughCopy("./content/css/reset.css");
	eleventyConfig.addPassthroughCopy("./content/css/base.css");
	eleventyConfig.addPassthroughCopy("./content/css/work.css");

	eleventyConfig.addCollection("work", async (collectionsApi) => {
		// get unsorted items
		return collectionsApi.getAll();
	});
};

export const config = {
	dir: {
		input: "content",          // default: "."
		includes: "../_includes",  // default: "_includes"
		data: "../_data",          // default: "_data"
	}
};
