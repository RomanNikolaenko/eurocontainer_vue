<template>
  <div @click="$emit('close')" class="modal">
    <div class="modal_wrapper container" @click.stop>
      <button @click="$emit('close')" class="modal_close" aria-label="close"></button>

      <div class="modal_container details-modal">
        <prismicText :field="dataCard.title" wrapper="h2" class="details-modal_title" />

        <div class="details-modal_header">
          <div class="details-modal_header-col">
            <template v-for="color in dataCard.colors" :key="color.id">
              <div v-if="color.checked" @click="detailsContainer(true, idx)" class="details-modal_img-wrap">
                <div class="details-modal_img-inner">
                  <PrismicImage :field="color.img" width="330" height="330" :alt="color.img.alt || 'img'"
                    class="details-modal_img" />
                </div>
              </div>
            </template>
          </div>

          <div class="details-modal_header-col">
            <div class="details-modal_colors">
              <template v-for="(color, index) in dataCard.colors" :key="color.select">
                <button @click="toggleColor(data.colors, index)" :class="[color.select, color.checked ? 'active' : '']"
                  :aria-label="`color-${color.select}`" class="details-modal_colors-btn"></button>
              </template>
            </div>

            <div class="details-modal_price">
              <span>Ціна:</span>
              <strong>{{ dataCard.price.toLocaleString('uk-UA') }} грн з ПДВ</strong>
            </div>

            <div class="details-modal_commercial">
              <PrismicLink :field="dataCard.commercial" download target="_blank" class="details-modal_commercial-btn">
                <BaseIcon class="details-modal_commercial-svg" name="commercial" viewBox="0 0 512 512" />
                <span>Комерційна пропозиція</span>
              </PrismicLink>
            </div>

            <button @click="$emit('buy')" class="details-modal_buy orangeBtn">Купити</button>
          </div>

          <div class="details-modal_header-col header-col">
            <h3 class="header-col_title">ХАРАКТЕРИСТИКИ:</h3>

            <ul class="header-col_list">
              <li v-for="item in dataCard.modaldetailslist" :key="item.listtitle" class="header-col_list-item">
                <strong>{{ item.listtitle }}:</strong> {{ item.listtext }}
              </li>
            </ul>
          </div>
        </div>

        <div class="details-modal_wrap">
          <div class="details-modal_description">
            <prismicRichText v-if="$prismic.asText(dataCard.modaldescription)" :field="dataCard.modaldescription"
              class="details-modal_description-text list" />
            <prismicText v-if="$prismic.asText(dataCard.modaldescriptiontitle)" :field="dataCard.modaldescriptiontitle"
              class="details-modal_description-text2" />
          </div>

          <ul v-if="dataCard.characteristics != false" class="details-modal_characteristics">
            <li class="details-modal_characteristics-title">ХАРАКТЕРИСТИКИ</li>
            <li v-for="item in dataCard.characteristics" :key="item.characteristicstitle"
              class="details-modal_characteristics-item">
              <span>{{ item.characteristicstitle }}</span>
              <span>{{ item.characteristicstext }}</span>
            </li>
          </ul>

          <prismicRichText v-if="$prismic.asText(dataCard.description)" :field="dataCard.description"
            class="description-block list" />

          <prismicRichText v-if="$prismic.asText(dataCard.benefits)" :field="dataCard.benefits"
            class="benefits-block" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import BaseIcon from './BaseIcon.vue';

const props = defineProps(['data']);

const dataCard = ref(props.data);

let DATA = reactive({
  dataCard,
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
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";

.details-modal_description-text {
  >* {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  ul li {
    font-weight: 700;
  }
}

.description-block {
  >*:nth-child(1) {
    line-height: 2;
    background: var(--blueDark);
    text-align: center;
    color: var(--white);
    text-transform: uppercase;
    margin-bottom: 1rem;

    @include toRem('font-size', 26);

    @media (max-width: 1023.98px) {
      @include toRem('font-size', 21);
    }
  }
}

.benefits-block {
  border: 5px solid var(--blueDark);
  margin-top: 1rem;
  padding: 15px 15px 15px 0;

  @include toRem('font-size', 21);

  @media (max-width: 1023.98px) {
    @include toRem('font-size', 18);
  }

  >* {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    color: var(--blueDark)
  }

  ul {
    list-style: inherit;
    @include property('padding-left', 70, 25, true, 1170, 480);

    li {
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }

  p {
    font-weight: 700;
    @include property('padding-left', 70, 25, true, 1170, 480);
  }
}

.list {
  ul {
    @include property('padding-left', 70, 25, true, 1170, 480);

    li {
      position: relative;

      &:not(:last-child) {
        margin-bottom: 0.75rem;
      }

      &::before {
        content: '✔';
        position: absolute;
        top: 0;
        left: -25px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  display: flex;
  background-color: rgba(#000, 0.7);
  padding: 15px;
  overflow-y: auto;

  &_wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
    padding: 0;
    background: var(--white);
  }

  &_close {
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 40px;
    height: 40px;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 2px;
      background-color: var(--grey);
    }

    &::before {
      transform: translateX(-50%) rotate(-45deg);
    }

    &::after {
      transform: translateX(-50%) rotate(45deg);
    }
  }

  &_container {
    border-top: 2px solid var(--grey);
    padding: 25px 15px;
  }
}

.details-modal {
  &_title {
    font-weight: 700;
    @include property('font-size', 32, 21);
    text-align: center;
    margin-bottom: 2rem;
  }

  &_wrap {
    max-width: 800px;
    margin: 0 auto;
  }

  &_header {
    display: grid;
    grid-template-columns: 1.3fr 1.1fr 1fr;
    gap: 1rem;

    @media (max-width: 1023.98px) {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }

    @media (max-width: 767.98px) {
      grid-template-columns: 1fr;
      align-items: center;
    }
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

  &_commercial {
    display: flex;
    justify-content: center;
    margin: 1.2rem 0;

    &-btn {
      display: inline-grid;
      grid-template-columns: 18px 1fr;
      align-items: center;
      gap: 0.75rem;
      @include toRem('font-size', 21);
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

  &_price {
    display: flex;
    flex-direction: column;
    align-items: center;
    @include toRem('font-size', 26);
    font-weight: 700;
    border: 1px solid var(--blueDark);

    >* {
      padding: 5px;
    }

    span {
      color: var(--white);
      background-color: var(--blueDark);
      text-align: center;
      display: block;
      width: 100%;
    }
  }

  &_buy {
    margin: auto;
    display: block;
  }

  &_description {
    margin-top: 1.25rem;
    @include toRem('font-size', 21);

    @media (max-width: 1023.98px) {
      @include toRem('font-size', 18);
    }

    &-text2 {
      margin-top: 1.25em;
      padding: 5px;
      text-align: center;
      background-color: rgba(166, 230, 241, 0.561);
      font-weight: 700;
    }
  }

  &_characteristics {
    margin-top: 2rem;
    @include toRem('font-size', 21);

    @media (max-width: 575.98px) {
      @include toRem('font-size', 16);
    }

    &-title {
      line-height: 2;
      background: var(--blueDark);
      text-align: center;
      color: var(--white);
      text-transform: uppercase;

      @include toRem('font-size', 26);

      @media (max-width: 1023.98px) {
        @include toRem('font-size', 21);
      }
    }

    &-item {
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--blueDark);

      >* {
        display: block;
        padding: 10px 15px;
        flex: 0 0 50%;

        &:first-child {
          font-weight: 700;
        }
      }
    }
  }
}

.description-block {
  margin-top: 2rem;
  @include toRem('font-size', 21);

  @media (max-width: 1023.98px) {
    @include toRem('font-size', 18);
  }
}

.header-col {
  &_title {
    font-weight: 700;
    @include toRem('font-size', 21);
    @include toRem('margin-bottom', 15);
    text-transform: uppercase;
  }

  &_list {
    padding-left: 20px;

    &-item {
      position: relative;
      @include toRem('font-size', 20);
      list-style: initial;

      &:not(:last-child) {
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>
