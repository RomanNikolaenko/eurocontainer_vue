<template>
  <div v-if="phoneNumber" class="dropdown">
    <div class="dropdown_wrap">
      <template v-for="(item, index) in phoneNumber.data.links" :key="item.linktext">
        <PrismicLink v-if="index == 0" :field="item.link" class="dropdown_link">
          {{ item.linktext }}
        </PrismicLink>
      </template>
      <button @click="toggle" :class="{ 'active': toggleBtn }" class="dropdown_toggle">
        <BaseIcon name="arrowDown" viewBox="0 0 256 256" />
      </button>
    </div>

    <div :class="{ 'active': toggleBtn }" class="dropdown_fade">
      <template v-for="(item, index) in phoneNumber.data.links" :key="item.linktext">
        <PrismicLink v-if="index > 0" :field="item.link" class="dropdown_link">
          {{ item.linktext }}
        </PrismicLink>
      </template>
    </div>
  </div>
</template>

<script setup>
import {
  ref
} from "vue";

import {
  useSinglePrismicDocument,
} from "@prismicio/vue";
import BaseIcon from "./BaseIcon.vue";

const { data: phoneNumber } = useSinglePrismicDocument("phonenumber");

const toggleBtn = ref(false)
const toggle = () => {
  toggleBtn.value = !toggleBtn.value;

  return { toggleBtn }
}

document.addEventListener("click", (e) => {
  if (toggleBtn.value && !e.target.classList.contains('dropdown_toggle')) {
    toggleBtn.value = false;
  }
});
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";

.dropdown {
  position: relative;
  display: flex;
  align-items: center;
  font-weight: 700;
  color: var(--white);
  white-space: nowrap;

  &_fade {
    position: absolute;
    top: 100%;
    left: 0;
    display: flex;
    flex-direction: column;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(20px);
    transition: 0.2s;

    &.active {
      opacity: 1;
      visibility: visible;
      pointer-events: initial;
      transform: translateY(0);
    }
  }

  &_wrap {
    display: flex;
    align-items: center;
  }

  &_link {
    @media (hover) {
      &:hover {
        text-decoration: none;
        color: var(--yellow);
      }
    }

    .dropdown_fade & {
      margin-top: 0.5rem;
    }
  }

  &_toggle {
    font-size: 0;
    margin-left: 0.5rem;
    width: 1rem;
    height: 1rem;

    &.active {
      * {
        fill: var(--yellow);
      }
    }

    @media (hover) {
      &:hover {
        * {
          fill: var(--yellow);
        }
      }
    }

    * {
      pointer-events: none;
      fill: var(--white);
      transition: 0.2s;
    }
  }
}
</style>
