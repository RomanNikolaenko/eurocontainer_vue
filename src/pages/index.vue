<template>
	<main v-if="home" class="wrapper">
		<h1>{{ $prismic.asText(home.data.title) }}</h1>
		<h2>{{ $prismic.asText(home.data.description) }}</h2>

		<slice-zone :slices="home.data.body" :components="components" />
	</main>
</template>

<script setup>
import { defineSliceZoneComponents, useSinglePrismicDocument } from "@prismicio/vue";
import { defineAsyncComponent  } from "vue";

const { data: home } = useSinglePrismicDocument("home");

const components = defineSliceZoneComponents({
	delivery: defineAsyncComponent(() => import("../components/slices/TheDelivery.vue")),
	services: defineAsyncComponent(() => import("../components/slices/TheServices.vue")),
	form: defineAsyncComponent(() => import("../components/slices/TheForm.vue")),
	slider: defineAsyncComponent(() => import("../components/slices/TheSlider.vue")),
	footer: defineAsyncComponent(() => import("../components/slices/TheFooter.vue")),
});
</script>
