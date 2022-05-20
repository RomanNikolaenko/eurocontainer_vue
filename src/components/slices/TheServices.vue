<template>
  <section id="service" class="services">
    <div class="services_container container">
      <prismic-text :field="slice.primary.titleservices" wrapper="h2" class="services_title" />

      <div class="services_card">
        <div v-for="item in slice.items" :key="item.titleitem" class="services_card-item">
          <PrismicImage v-if="item.img" :field="item.img" width="218" height="150" :alt="item.img.alt"
            class="services_card-img" />
          <prismic-text :field="item.titleitem" wrapper="h3" class="services_card-title" />
          <prismic-rich-text :field="item.lists" class="services_card-list" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { getSliceComponentProps } from "@prismicio/vue";

// The array passed to `getSliceComponentProps` is purely optional and acts as a visual hint for you
defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";

.services {
  color: var(--white);
  background-color: var(--blueDark);
  @include property("padding-top", 60, 20);
  @include property("padding-bottom", 50, 35);

  &_title {
    font-weight: 700;
    @include toRem("font-size", 40);
    text-align: center;
    @include property("padding-bottom", 50, 20);

    @media (max-width: 1023.98px) {
      @include toRem("font-size", 24);
    }
  }

  &_card {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    gap: 3rem 2rem;

    @media (max-width: 1023.98px) {
      gap: 2rem 1rem;
      grid-template-columns: repeat(2, minmax(200px, 400px));
    }

    @media (max-width: 575.98px) {
      grid-template-columns: minmax(200px, 400px);
    }

    &-img {
      @include property("max-height", 150, 100);
      margin-bottom: 0.75rem;
    }

    &-title {
      font-size: 1.25rem;
      text-align: center;
      border-bottom: 1px solid var(--white);
      padding-bottom: 0.5rem;
      text-transform: uppercase;
      margin-bottom: 0.75rem;
    }

    &-list {
      text-align: center;
      @include toRem("font-size", 18);

      li {
        &:not(:last-child) {
          margin-bottom: 1rem;
        }
      }
    }
  }
}
</style>
