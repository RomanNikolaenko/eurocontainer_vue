<template>
  <footer v-if="phoneNumber" class="footer">
    <div class="footer_container container">
      <div class="footer_col">
        fgdfgdf
      </div>

      <div class="footer_col">
        <PrismicImage v-if="vars.showLogo" :field="slice.primary.logofooter" width="120" height="115"
          :alt="slice.primary.logofooter.alt" class="footer_logo" />

        <h3 class="footer_title">{{ slice.primary.contactsfooter }}</h3>
        <div class="footer_contacts">
          <PrismicLink v-for="item in phoneNumber.data.links" :key="item.linktext" :field="item.link"
            class="footer_col-link">
            {{ item.linktext }}
          </PrismicLink>
        </div>

        <h3 class="footer_title">{{ slice.primary.addresstitlefooter }}</h3>
        <p class="footer_text">{{ slice.primary.addresstextfooter }}</p>

        <h3 class="footer_title">{{ slice.primary.emailfootertitle }}</h3>
        <PrismicLink :field="slice.primary.emailfooterlink">
          {{ slice.primary.emailfooterlinktitle }}
        </PrismicLink>

        <h3 class="footer_title">{{ slice.primary.timeworktitle }}</h3>
        <p class="footer_text">{{ slice.primary.timeworktext }}</p>
      </div>

      <div class="footer_col">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.4723484873575!2d30.507607615731388!3d50.450928279475384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce594d663f53%3A0xb346b265ea802914!2z0YPQuy4g0K_RgNC-0YHQu9Cw0LLQvtCyINCS0LDQuywgMTMsINCa0LjQtdCyLCAwMTAwMQ!5e0!3m2!1sru!2sua!4v1566834528913!5m2!1sru!2sua"
          allowfullscreen="" title="map" class="footer_map"></iframe>
      </div>
    </div>

    <div class="footer_copy">
      <div class="footer_design container">
        <div>{{ slice.primary.footercopy }}</div>

        <prismic-rich-text :field="slice.primary.footerdesign" />
      </div>
    </div>
  </footer>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, reactive } from "vue";
import {
  getSliceComponentProps,
  useSinglePrismicDocument,
} from "@prismicio/vue";

const { data: phoneNumber } = useSinglePrismicDocument("phonenumber");

// The array passed to `getSliceComponentProps` is purely optional and acts as a visual hint for you
defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));

const vars = reactive(
  {
    width: 0,
    showLogo: true
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
  vars.width = window.innerWidth;

  if (vars.width < 1024) {
    vars.showLogo = false;
  } else if (vars.width >= 1024 && !vars.showLogo) {
    vars.showLogo = true;
  }

  return vars.showLogo
}
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";

.footer {
  background-image: linear-gradient(#d5eef3 0, var(--white) 70%);
  @include toRem("padding-top", 40);
  @include property('padding-bottom', 25, 0);

  &_container {
    display: grid;
    row-gap: 30px;
    @include property('column-gap', 100, 30, true, 1170, 1024);

    @media (min-width: 1024px) {
      grid-template-columns: 310px 1fr;
    }
  }

  &_col {
    &:nth-of-type(2) {
      @media (min-width: 1024px) {
        grid-row: 1/3;
      }

      @media (max-width: 1023.98px) {
        @include toRem('font-size', 21);
      }
    }
  }

  &_logo {
    display: block;
    margin: 0 auto;
    max-width: 120px;
  }

  &_title {
    font-weight: 700;
    margin-bottom: 0.3rem;
    margin-top: 0.75rem;
  }

  &_text {
    margin-bottom: 0;
  }

  &_contacts {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    @include toRem("font-size", 21);

    @media (max-width: 1023.98px) {
      @include toRem("font-size", 28);
    }
  }

  &_map {
    width: 100%;
    min-height: 260px;
  }

  &_copy {
    border-top: 1px solid var(--base);
    @include property('padding-top', 40, 15);
    margin: 0 -15px;
    @include property('margin-top', 60, 20);
  }

  &_design {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;

    >* {
      margin: 0 15px 15px;
      @include property('font-size', 16, 12);
      text-align: center;
    }

    a {
      padding: 3px;
      background-color: var(--grey);
    }
  }
}
</style>
