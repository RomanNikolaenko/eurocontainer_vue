<template>
  <header :class="{ 'activeBurger': toggleBtn }" class="headerM">
    <div class="headerM_container container">
      <PrismicImage :field="props.data.data.logo" width="65" height="60" :alt="props.data.data.logo.alt || logo"
        class="headerM_logo" />

      <prismic-rich-text :field="props.data.data.title" class="headerM_title" />

      <button @click="toggle" class="headerM_burger" aria-label="menu">
        <div class="headerM_burger-wrap"><i></i><i></i><i></i></div>
      </button>

      <transition name="fade">
        <div v-show="toggleBtn" class="headerM_inner">
          <div class="headerM_collapse">
            <div class="headerM_collapse-wrap">
              <ThePhoneNumber socials="true" />
              <TheNav />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import ThePhoneNumber from "./ThePhoneNumber.vue";
import TheNav from "./TheNav.vue";

const props = defineProps(['data']);

const toggleBtn = ref(false)
const toggle = () => {
  toggleBtn.value = !toggleBtn.value;
  document.body.classList.toggle('lock');

  return { toggleBtn }
}

document.addEventListener("click", (e) => {
  if (toggleBtn.value && !e.target.classList.contains('headerM_burger') && !e.target.classList.contains('headerM_collapse')) {
    toggleBtn.value = false;
    document.body.classList.remove('lock');
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.headerM {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-image: url('@/assets/images/bg-landscape.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  &_container {
    display: flex;
    align-items: center;
  }

  &_logo {
    @include property('width', 65, 50);
  }

  &_title {
    font-weight: 700;
    text-transform: uppercase;
    @include toRem('font-size', 18);
    color: #15156d;
    margin: 0 0.5rem;
  }

  &_burger {
    position: relative;
    z-index: 20;
    width: 60px;
    height: 50px;
    margin-left: auto;
    background-color: var(--yellow);
    padding: 7px;

    * {
      pointer-events: none;
    }

    .activeBurger & {
      background-color: var(--white);

      i {
        width: 100% !important;
        background-color: var(--grey);
        transition: top 0.2s, width 0.2s, transform 0.3s 0.2s, opacity 0.2s 0.2s;

        &:nth-child(1) {
          top: 50%;
          transform: translate(0, -50%) rotate(45deg);
        }

        &:nth-child(2) {
          opacity: 0;
        }

        &:nth-child(3) {
          top: 50%;
          transform: translate(0, -50%) rotate(-45deg);
        }
      }
    }

    &-wrap {
      position: relative;
    }

    i {
      position: absolute;
      top: 0;
      height: 2px;
      background-color: var(--white);
      border-radius: 5px;
      will-change: transform;
      transition: top 0.2s 0.2s, width 0.2s 0.2s, transform 0.2s,
        opacity 0.2s 0.2s;

      &:nth-of-type(1) {
        width: 50%;
        left: 0;
        top: calc(50% - 13px);
      }

      &:nth-of-type(2) {
        width: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      &:nth-of-type(3) {
        width: 50%;
        right: 0;
        top: calc(50% + 11px);
      }
    }
  }

  &_inner {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 3;
    background-color: rgba(#cccccc, 0.5);
  }

  &_collapse {

    max-width: 400px;
    width: 100%;
    background-color: var(--white);
    padding: 70px 15px 0;
    height: 100%;
    margin-left: auto;
    overflow: hidden auto;

    &-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all .3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
