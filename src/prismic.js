import { createPrismic } from "@prismicio/vue";

const prismic = createPrismic({
	endpoint: "https://eurocontainer.prismic.io/api/v2",
	clientConfig: {
		defaultParams: {
			routes: [
				{
					type: "home",
					path: "/"
				}
			]
		},
	},
});

export default prismic;
