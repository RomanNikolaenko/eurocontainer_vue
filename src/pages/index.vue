<template>
	<main v-if="home" class="wrapper">
		<TheHeaderDesktop v-if="!mobile.show" />
		<TheHeaderMobile v-else :data="home" />

		<slice-zone :slices="home.data.body" :components="components" />
	</main>
</template>

<script setup>
import { defineSliceZoneComponents, useSinglePrismicDocument } from "@prismicio/vue";
import { defineAsyncComponent, nextTick, onMounted, onUnmounted, reactive } from "vue";
import TheHeaderDesktop from "../components/TheHeaderDesktop.vue";
import TheHeaderMobile from "../components/TheHeaderMobile.vue";

const { data: home } = useSinglePrismicDocument("home");

const components = defineSliceZoneComponents({
	delivery: defineAsyncComponent(() => import("../components/slices/TheDelivery.vue")),
	services: defineAsyncComponent(() => import("../components/slices/TheServices.vue")),
	form: defineAsyncComponent(() => import("../components/slices/TheForm.vue")),
	slider: defineAsyncComponent(() => import("../components/slices/TheSlider.vue")),
	footer: defineAsyncComponent(() => import("../components/slices/TheFooter.vue")),
});

const mobile = reactive(
  {
    width: 0,
    show: false
  }
);

onMounted(() => {
  nextTick(() => {
    getDimensions();
  });
  window.addEventListener('resize', getDimensions);
});

onUnmounted(() => {
  window.removeEventListener('resize', getDimensions);
});

function getDimensions() {
  mobile.width = window.innerWidth;

  if (mobile.width < 1024) {
    mobile.show = true;
  } else if (mobile.width >= 1024 && mobile.show) {
    mobile.show = false;
  }

  return mobile.show;
}
</script>
