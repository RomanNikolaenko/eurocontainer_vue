<template>
  <section class="delivery">
    <div class="delivery_wrap">
      <prismic-text
        :field="slice.primary.titledelivery"
        wrapper="h2"
        class="delivery_title container"
      />
    </div>
    <div class="images">
      <div class="container">
        <div class="images_container">
          <PrismicImage
            v-for="item in slice.items"
            :key="item.img.alt"
            :field="item.img"
            width="150"
            height="50"
            :alt="item.img.alt"
          />
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

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.delivery {
  &_wrap {
    background-color: var(--bluePrimary);
  }

  &_title {
    text-align: center;
    color: var(--white);
    padding-top: 30px;
    padding-bottom: 30px;
    @include toRem("font-size", 21);
    text-transform: uppercase;
  }
}

.images {
  background-color: var(--blueLight);

  &_container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 -15px;

    img {
      margin: 20px 15px;
      width: auto;
      object-fit: contain;

      @media (max-width: 1023.98px) {
        max-width: calc(50% - 30px);
      }
    }
  }
}
</style>
