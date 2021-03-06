<template>
  <main v-if="home && cards" class="wrapper">
    <TheHeaderDesktop v-if="!mobile.show" />
    <TheHeaderMobile v-else :data="home" />

    <section class="hero">
      <div class="hero_container container">
        <div v-if="!mobile.show" class="hero_wrap">
          <PrismicImage :field="home.data.logo" width="155" height="150" :alt="home.data.logo.alt || 'icon'"
            class="hero_img" />
          <PrismicRichText :field="home.data.title" class="hero_title" />
        </div>

        <PrismicImage :field="home.data.imgcontainer" width="534" height="385"
          :alt="'home.data.img-container.alt' || 'icon'" class="hero_img-cont" />
      </div>
    </section>

    <section id="cont-1100" class="category_wrap">
      <div class="category container">
        <h2 class="category_title">Контейнери для сміття</h2>
        <div class="category_value">
          <p class="category_value-num">1100 л</p>
          <p class="category_value-text">Пластикові нові</p>
        </div>

        <TheCard :data="cards" @buyContainer="buyContainer" @detailsContainer="detailsContainer" category="1100 new" />
      </div>
    </section>

    <section id="sec-2" class="category_wrap">
      <div class="category container">
        <h2 class="category_title">Контейнери для сміття</h2>
        <div class="category_value">
          <p class="category_value-num">1100 л</p>
          <p class="category_value-text">Оцинковані нові</p>
        </div>

        <TheCard :data="cards" @buyContainer="buyContainer" @detailsContainer="detailsContainer" category="1100 metallic" />
      </div>
    </section>

    <section id="sec-3" class="category_wrap">
      <div class="category container">
        <h2 class="category_title">Контейнери для сміття</h2>
        <div class="category_value">
          <p class="category_value-num">1100 л</p>
          <p class="category_value-text">Вживані</p>
        </div>

        <TheCard :data="cards" @buyContainer="buyContainer" @detailsContainer="detailsContainer" category="1100 used" />
      </div>
    </section>

    <section id="cont-750" class="category_wrap">
      <div class="category container">
        <h2 class="category_title">Контейнери для сміття</h2>
        <div class="category_value">
          <p class="category_value-num">750 л</p>
          <p class="category_value-text">Метал</p>
        </div>

        <TheCard :data="cards" @buyContainer="buyContainer" @detailsContainer="detailsContainer" category="750" />
      </div>
    </section>

    <section id="cont-1100-separate" class="category_wrap">
      <div class="category container">
        <h2 class="category_title">Контейнери для роздільного збору сміття</h2>
        <div class="category_value">
          <p class="category_value-num">1100 л</p>
          <p class="category_value-text">Оцінковані, метал, пластик</p>
        </div>

        <TheCard :data="cards" @buyContainer="buyContainer" @detailsContainer="detailsContainer" category="1100 separate" />
      </div>
    </section>

    <section id="cont-240" class="category_wrap">
      <div class="category container">
        <h2 class="category_title">Контейнери для сміття</h2>
        <div class="category_value">
          <p class="category_value-num">240 л</p>
          <p class="category_value-text">з пластику</p>
        </div>

        <TheCard :data="cards" @buyContainer="buyContainer" @detailsContainer="detailsContainer" category="240" />
      </div>
    </section>

    <section id="cont-120" class="category_wrap">
      <div class="category container">
        <h2 class="category_title">Контейнери для сміття</h2>
        <div class="category_value">
          <p class="category_value-num">120 л</p>
          <p class="category_value-text">з пластику</p>
        </div>

        <TheCard :data="cards" @buyContainer="buyContainer" @detailsContainer="detailsContainer" category="120" />
      </div>
    </section>

    <slice-zone :slices="home.data.body" :components="components" />

    <Teleport to="body">
      <transition name="modal">
        <TheModalForm v-if="react.toggleModalBuy" @buyContainer="buyContainer" @close="buyContainer(false)" />
      </transition>

      <transition name="modal">
        <TheModalDetails v-if="react.toggleModalDetails" :data="react.dataModal" @buyContainer="buyContainer(true)"
          @close="detailsContainer(false)" />
      </transition>
    </Teleport>
  </main>
</template>

<script setup>
import { defineSliceZoneComponents, useAllPrismicDocumentsByType, useSinglePrismicDocument } from "@prismicio/vue";
import { defineAsyncComponent, nextTick, onMounted, onUnmounted, reactive, inject, ref } from "vue";
import TheHeaderDesktop from "../components/TheHeaderDesktop.vue";
import TheHeaderMobile from "../components/TheHeaderMobile.vue";
import TheCard from "../components/TheCard.vue";
import TheModalDetails from "../components/TheModalDetails.vue";
import TheModalForm from "../components/TheModalForm.vue";

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

const myEl = ref(null)
const smoothScroll = inject('smoothScroll')
const scrollToMyEl = () => {
  smoothScroll({
    scrollTo: myEl.value,
    hash: '#sampleHash'
  })
}

let react = reactive({
  dataModal: [],
  toggleModalBuy: false,
  toggleModalDetails: false,
});

const buyContainer = (flag) => {
  const lockMarginValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  if (flag) {
    if (!document.body.classList.contains('hidden')) {
      document.body.style.marginRight = lockMarginValue;
    }
    document.body.classList.add('lock');
    react.toggleModalBuy = flag;
  } else {
    react.toggleModalBuy = flag;
    setTimeout(() => {
      document.body.classList.remove('lock');
      if (!document.body.classList.contains('hidden')) {
        document.body.style.marginRight = null;
      }
    }, 300)
  }
}

const detailsContainer = (data, flag) => {
  const lockMarginValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  if (flag) {
    document.body.classList.add('hidden');
    document.body.style.marginRight = lockMarginValue;
    react.toggleModalDetails = flag;
    react.dataModal = data;
  } else {
    react.toggleModalDetails = flag;
    react.dataModal = []
    setTimeout(() => {
      document.body.classList.remove('hidden');
      document.body.style.marginRight = null;
    }, 300)
  }
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

.hero {
  @include property('padding-top', 110, 80);

  &_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &_img {
    max-width: 155px;

    &-cont {
      display: block;
      max-width: min(80%, 534px);
      margin: 3rem auto 1rem;
    }
  }

  &_title {
    @include toRem('font-size', 56);
    line-height: 1.2;
    font-weight: 700;
    text-transform: uppercase;
    margin-left: 30px;
    color: #15156d;
    max-width: 480px;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: all .3s ease-in;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>