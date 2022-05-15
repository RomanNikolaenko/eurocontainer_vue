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

  .headerM_collapse & {
    flex-direction: column;
    flex-wrap: nowrap;
    margin-top: 1rem;
    width: 100%;
  }

  >* {
    margin: 0 var(--gap) 1rem;
    font-weight: 700;

    .footer & {
      color: var(--blueDark);
    }

    .headerD & {
      color: var(--white);
    }

    &:nth-child(1),
    &:nth-child(n+5) {
      .headerM_collapse & {
        &::before {
          content: '';
          position: absolute;
          top: -0.8rem;
          left: -15px;
          width: 100vw;
          height: 1px;
          background-color: var(--base);
        }
      }
    }

    .headerM_collapse & {
      position: relative;
      margin-top: 0.7rem;
      margin-bottom: 0.7rem;
      width: 100%;
      color: var(--blueDark);
    }

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

  .headerD & {
    a {
      @media (hover) {
        &:hover {
          text-decoration: none;
          color: var(--yellow);
        }
      }
    }
  }
}
</style>
