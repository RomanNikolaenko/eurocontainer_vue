<template>
  <svg
    :viewBox="$attrs.viewBox || '0 0 256 256'"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    v-html="path"
  ></svg>
</template>

<script setup>
import { ref } from 'vue';
import icons from "@/icons";

const props = defineProps({
    name: { type: String },
});

const path = ref(icons[props.name]);
</script>>
