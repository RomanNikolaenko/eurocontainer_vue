<template>
	<main v-if="recipe" class="container stack block">
		<h1>{{ $prismic.asText(recipe.data.title) }}</h1>
		<slice-zone :slices="recipe.data.body" :components="components" />
	</main>
</template>

<script setup>
import { getSliceZoneComponents, usePrismicDocumentByUID } from "@prismicio/vue";
import { defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const {data: recipe, error} = usePrismicDocumentByUID("recipes", route.params.uid);

const components = getSliceZoneComponents({
	banner_image: defineAsyncComponent(() => import("../../components/slices/TheDelivery.vue")),
});
</script>
