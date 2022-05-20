<template>
  <main v-if="home && cards" class="wrapper">
    <TheHeaderDesktop v-if="!mobile.show" />
    <TheHeaderMobile v-else :data="home" />

    <section id="cont-1100" class="category_wrap">
      <div class="category container">
        <h2 class="category_title">Контейнери для сміття</h2>
        <div class="category_value">
          <p class="category_value-num">1100 л</p>
          <p class="category_value-text">Пластикові нові</p>
        </div>

        <TheCard :data="cards" category="1100 new" />
      </div>
    </section>

    <section id="sec-2" class="category_wrap">
      <div class="category container">
        <h2 class="category_title">Контейнери для сміття</h2>
        <div class="category_value">
          <p class="category_value-num">1100 л</p>
          <p class="category_value-text">Оцинковані нові</p>
        </div>

        <TheCard :data="cards" category="1100 metallic" />
      </div>
    </section>

    <section id="sec-3" class="category_wrap">
      <div class="category container">
        <h2 class="category_title">Контейнери для сміття</h2>
        <div class="category_value">
          <p class="category_value-num">1100 л</p>
          <p class="category_value-text">Вживані</p>
        </div>

        <TheCard :data="cards" category="1100 used" />
      </div>
    </section>

    <section id="cont-750" class="category_wrap">
      <div class="category container">
        <h2 class="category_title">Контейнери для сміття</h2>
        <div class="category_value">
          <p class="category_value-num">750 л</p>
          <p class="category_value-text">Метал</p>
        </div>

        <TheCard :data="cards" category="750" />
      </div>
    </section>

    <section id="cont-1100-separate" class="category_wrap">
      <div class="category container">
        <h2 class="category_title">Контейнери для роздільного збору сміття</h2>
        <div class="category_value">
          <p class="category_value-num">1100 л</p>
          <p class="category_value-text">Оцінковані, метал, пластик</p>
        </div>

        <TheCard :data="cards" category="1100 separate" />
      </div>
    </section>

    <section id="cont-240" class="category_wrap">
      <div class="category container">
        <h2 class="category_title">Контейнери для сміття</h2>
        <div class="category_value">
          <p class="category_value-num">240 л</p>
          <p class="category_value-text">з пластику</p>
        </div>

        <TheCard :data="cards" category="240" />
      </div>
    </section>

    <section id="cont-120" class="category_wrap">
      <div class="category container">
        <h2 class="category_title">Контейнери для сміття</h2>
        <div class="category_value">
          <p class="category_value-num">120 л</p>
          <p class="category_value-text">з пластику</p>
        </div>

        <TheCard :data="cards" category="120" />
      </div>
    </section>

    <slice-zone :slices="home.data.body" :components="components" />
  </main>
</template>

<script setup>
import { defineSliceZoneComponents, useAllPrismicDocumentsByType, useSinglePrismicDocument } from "@prismicio/vue";
import { defineAsyncComponent, nextTick, onMounted, onUnmounted, reactive, inject, ref } from "vue";
import TheHeaderDesktop from "../components/TheHeaderDesktop.vue";
import TheHeaderMobile from "../components/TheHeaderMobile.vue";
import TheCard from "../components/TheCard.vue";

const { data: home } = useSinglePrismicDocument("home");
const { data: cards } = useAllPrismicDocumentsByType("cards");

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

const getDimensions = () => {
  mobile.width = window.innerWidth;

  if (mobile.width < 1024) {
    mobile.show = true;
  } else if (mobile.width >= 1024 && mobile.show) {
    mobile.show = false;
  }

  return mobile.show;
}

const goto = (refName) => {
  const element = this.$refs[refName];
  const top = element.offsetTop;

  window.scrollTo(0, top);
}

const myEl = ref(null)
const smoothScroll = inject('smoothScroll')
const scrollToMyEl = () => {
  smoothScroll({
    scrollTo: myEl.value,
    hash: '#sampleHash'
  })
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.category {
  padding-top: 60px;

  &_title {
    display: block;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    text-align: center;
    font-weight: 700;
    @include toRem('font-size', 36);

    @media (max-width: 1023.98px) {
      @include toRem('font-size', 24);
    }
  }

  &_value {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;

    &-num {
      position: relative;
      background-color: var(--blueDark);
      color: var(--white);
      font-weight: 700;
      @include toRem('font-size', 40);
      border-radius: 10px;
      margin: 0;
      padding: 10px 50px;

      @media (max-width: 1023.98px) {
        @include toRem('font-size', 26);
        padding: 5px 26px;
      }

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        height: 7px;
        @include property('width', 160, 70);
        background-color: var(--blueDark);
      }

      &::before {
        right: 100%;
        transform: translateY(-50%);
      }

      &::after {
        left: 100%;
        transform: translateY(-50%);
      }
    }

    &-text {
      color: var(--blueDark);
      margin-top: 0.5rem;
      font-weight: 700;
      @include toRem('font-size', 24);

      @media (max-width: 1023.98px) {
        @include toRem('font-size', 18);
      }
    }
  }
}
</style>