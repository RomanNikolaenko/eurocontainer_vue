import { createPrismic } from "@prismicio/vue";

const prismic = createPrismic({
	endpoint: "https://eurocontainer.prismic.io/api/v2",
	clientConfig: {
		defaultParams: {
			routes: [
				{
					type: "home",
					path: "/"
				},
				{
					type: "recipes",
					path: "/recipes/:uid"
				},
			]
		},
	},
});

export default prismic;
