<template>
  <div v-if="phoneNumber && props.socials" class="socials">
    <PrismicLink v-for="(item, i) in phoneNumber.data.socials" :key="i" :field="item.link" class="socials_link"
      :aria-label="item.img.alt || 'link'">
      <PrismicImage :field="item.img" width="52" height="52" :alt="item.img.alt || 'icon'" class="socials_img" />
    </PrismicLink>
  </div>

  <div v-if="phoneNumber" class="contacts">
    <PrismicLink v-for="item in phoneNumber.data.links" :key="item.linktext" :field="item.link" class="contacts_link">
      {{ item.linktext }}
    </PrismicLink>
  </div>
</template>

<script setup>
import {
  useSinglePrismicDocument,
} from "@prismicio/vue";

const { data: phoneNumber } = useSinglePrismicDocument("phonenumber");

const props = defineProps({
  socials: { default: false },
});
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";

.socials {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -5px 0.3rem;

  &_link {
    width: 50px;
    height: 50px;
    margin: 0 5px;
  }
}

.contacts {
  display: flex;
  flex-direction: column;

  .footer & {
    align-items: flex-start;
  }

  .form & {
    align-items: center;
  }

  &_link {
    &:not(:last-child) {
      margin-bottom: 0.2rem;
    }

    .footer & {
      @include toRem("font-size", 21);

      @media (max-width: 1023.98px) {
        @include toRem("font-size", 28);
      }

      @media (hover) {
        &:hover {
          text-decoration: none;
          color: var(--blueDark);
        }
      }
    }

    .form & {
      color: var(--blueDark);
      font-weight: 700;
      @include toRem("font-size", 40);

      @media (max-width: 1023.98px) {
        @include toRem("font-size", 28);
      }

      @media (hover) {
        &:hover {
          text-decoration: none;
          color: var(--base);
        }
      }
    }
  }
}
</style>
