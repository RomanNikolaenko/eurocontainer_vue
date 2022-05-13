<template>
  <section :class="slice.primary.selectclassslider" class="slider">
    <div class="slider_container container">
      <prismic-rich-text
        :field="slice.primary.titleslider"
        class="slider_title"
      />

      <swiper
        :navigation="true"
        :loop="true"
        :slidesPerView="1"
        :spaceBetween="30"
        :speed="1500"
        :autoplay="{
          delay: 4000,
          disableOnInteraction: false,
        }"
        :modules="modules"
        :breakpoints="{
          '500': {
            slidesPerView: 2,
          },
          '640': {
            slidesPerView: 3,
          },
          '840': {
            slidesPerView: 4,
          },
          '1024': {
            slidesPerView: 5,
          },
        }"
      >
        <swiper-slide v-for="item in slice.items" :key="item.textslider">
          <PrismicImage
            v-if="item.imgslider"
            :field="item.imgslider"
            width="170"
            height="170"
            :alt="item.imgslider.alt"
            class="slider_img"
          />
          <span v-if="item.textslider" class="slider_text">{{
            item.textslider
          }}</span>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup>
import { getSliceComponentProps } from "@prismicio/vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const modules = [Autoplay, Navigation];

// The array passed to `getSliceComponentProps` is purely optional and acts as a visual hint for you
defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";

.slider {
  &.regions {
    background-image: url('@/assets/images/mapa-ua.svg');
    background-position: center center;
    background-repeat: no-repeat;
    @include property("margin-top", 100, 0);
    @include property("padding-bottom", 200, 15);
    margin-bottom: 2rem;
  }

  .swiper {
    padding: 0 30px;
  }

  .swiper-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: auto;
  }

  [class^="swiper-button"] {
    color: var(--grey);
    transition: color 0.2s ease-in;

    @media (hover) {
      &:hover {
        color: var(--blueDark);
      }
    }
  }

  .swiper-button-prev {
    left: 0;
  }

  .swiper-button-next {
    right: 0;
  }

  &_title {
    color: var(--blueDark);
    font-weight: 700;
    text-align: center;
    @include toRem("font-size", 40);
    @include property("padding-top", 100, 40);
    @include property("padding-bottom", 80, 25);

    @media (max-width: 1023.98px) {
      @include toRem("font-size", 28);

      br {
        display: none;
      }
    }
  }

  &_img {
    max-width: 170px;
    max-height: 240px;
    margin: 0 auto;
    margin-bottom: 1rem;
    height: 100%;
    object-fit: contain;
    object-position: center center;

    .clients & {
      height: 105px;
    }

    .regions & {
      max-height: 170px;
    }
  }
}
</style>
