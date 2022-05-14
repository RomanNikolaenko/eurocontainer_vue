<template>
  <nav v-if="links" class="nav">
    <prismic-text :field="links.data.title" />

    <PrismicLink v-for="(item, i) in links.data.navs" :key="i" :field="item.link">
      <prismic-rich-text :field="item.label" />
    </PrismicLink>
  </nav>
</template>

<script setup>
import {
  useSinglePrismicDocument,
} from "@prismicio/vue";

const { data: links } = useSinglePrismicDocument("navlinks");
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";

.nav {
  --gap: 0.5rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 calc(var(--gap) * -1);

  >* {
    margin: 0 var(--gap) 1rem;
    color: var(--blueDark);
    font-weight: 700;

    @media (max-width: 1023.98px) {
      --gap: 0.7rem;
      @include toRem('font-size', 24);

      &:nth-child(1) {
        width: 100%;
        color: var(--base);
      }
    }

    &:nth-child(1),
    &:nth-last-child(-n+2) {
      text-transform: uppercase;
    }

    strong {
      @include toRem('font-size', 12);
    }
  }

  .footer & {
    a {
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
