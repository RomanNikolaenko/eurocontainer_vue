<template>
  <div class="card_wrap">
    <template v-for="(card, idx) in dataCard" :key="idx">
      <div v-if="card.data.category == props.category" class="card">
        <prismicText :field="card.data.title" wrapper="h2" class="card_title" />

        <template v-for="color in card.data.colors" :key="color.id">
          <div v-if="color.checked" @click="detailsContainer(true, idx)" class="card_img-wrap">
            <div class="card_img-inner">
              <PrismicImage :field="color.img" width="330" height="330" :alt="color.img.alt || 'img'"
                class="card_img" />
            </div>
          </div>
        </template>

        <div class="card_colors">
          <template v-for="(color, index) in card.data.colors" :key="color.select">
            <button @click="toggleColor(card.data.colors, index)" :class="[color.select, color.checked ? 'active' : '']"
              :aria-label="`color-${color.select}`" class="card_colors-btn"></button>
          </template>
        </div>

        <div class="card_country">
          <span>Країна виробник:</span> {{ card.data.country }}
        </div>

        <div class="card_price">
          {{ card.data.price.toLocaleString('uk-UA') }} грн
        </div>

        <button @click="detailsContainer(true, idx)" class="card_details">Детальніше</button>

        <Teleport to="body">
          <transition name="modal">
            <TheModalDetails v-if="toggleModalDetails && idx == idxDetails" :data="card.data" @buy="buyContainer(true)"
              @close="detailsContainer(false)" />
          </transition>
        </Teleport>

        <div class="card_commercial">
          <PrismicLink :field="card.data.commercial" download target="_blank" class="card_commercial-btn">
            <BaseIcon class="card_commercial-svg" name="commercial" viewBox="0 0 512 512" />
            <span>Комерційна пропозиція</span>
          </PrismicLink>
        </div>

        <button @click="buyContainer(true)" class="card_buy orangeBtn">Купити</button>
      </div>
    </template>

    <Teleport to="body">
      <transition name="modal">
        <TheModalForm v-if="toggleModalBuy" @close="buyContainer(false)" />
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import BaseIcon from './BaseIcon.vue';
import TheModalForm from './TheModalForm.vue';
import TheModalDetails from './TheModalDetails.vue';

const props = defineProps({
  data: { type: Object },
  category: { type: String }
});

const dataCard = ref(props.data);
let toggleModalBuy = ref(false);
let toggleModalDetails = ref(false);
let idxDetails = ref(0);

let react = reactive({
  dataCard,
  toggleModalBuy,
  toggleModalDetails,
  idxDetails,
});

const toggleColor = (item, index) => {
  item.forEach((element, idx) => {
    if (idx == index) {
      return element.checked = true;
    } else {
      return element.checked = false;
    }
  });
}

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

const detailsContainer = (flag, index) => {
  const lockMarginValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  if (flag) {
    document.body.classList.add('hidden');
    document.body.style.marginRight = lockMarginValue;
    react.toggleModalDetails = flag;
    react.idxDetails = index;
  } else {
    react.toggleModalDetails = flag;
    setTimeout(() => {
      document.body.classList.remove('hidden');
      document.body.style.marginRight = null;
    }, 300)
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.card {
  display: flex;
  flex-direction: column;
  padding: 0.95rem;
  border: 1px solid var(--blueDark);
  margin: 0 var(--gap) calc(var(--gap) * 2);
  max-width: 369px;
  flex: 1 1 calc(33.333% - calc(var(--gap) * 2));

  @media (max-width: 1023.98px) {
    flex: 1 1 calc(50% - calc(var(--gap) * 2));
  }

  @media (max-width: 649.98px) {
    flex: 1 1 calc(100% - calc(var(--gap) * 2));
  }

  &_wrap {
    --gap: 8px;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 calc(var(--gap) * -1);
  }

  &_title {
    font-weight: 700;
    @include toRem('font-size', 20);
    text-align: center;
    flex: 1;
  }

  &_colors {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 1.25rem -6px 0.2rem;

    &-btn {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin: 0 6px 12px;
      border: 1px solid #999;

      &.active {
        pointer-events: none;
      }
    }
  }

  &_img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center center;

    &-wrap {
      width: 100%;
      max-width: 365px;
      margin: 1rem auto 0;
      cursor: pointer;
    }

    &-inner {
      position: relative;
      padding-bottom: 100%;
    }
  }

  &_country {
    text-align: center;
    margin: 1.2rem 0;

    span {
      font-weight: 700;
    }
  }

  &_price {
    font-weight: 700;
    @include toRem('font-size', 30);
    text-align: center;
    color: var(--blueDark);
    margin-bottom: 1.2rem;
  }

  &_details {
    background-color: var(--blueDark);
    color: var(--white);
    text-transform: lowercase;
    margin: 0 auto;
    padding: 8px 40px;
    border-radius: 0;
    border-bottom: 1px solid var(--blueDark);

    @media (hover) {
      &:hover {
        background-color: var(--white);
        color: var(--blueDark);
      }
    }
  }

  &_commercial {
    display: flex;
    justify-content: center;
    margin: 1.2rem 0;

    &-btn {
      display: inline-grid;
      grid-template-columns: 18px 1fr;
      align-items: center;
      gap: 0.75rem;
      color: var(--base);

      @media (hover) {
        &:hover {
          text-decoration: none;
          color: var(--blueDark);
        }
      }
    }

    &-svg {
      fill: currentColor;
    }
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