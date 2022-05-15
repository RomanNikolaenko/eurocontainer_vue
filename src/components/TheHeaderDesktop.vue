<template>
  <header class="headerD">
    <div class="headerD_container container">
      <TheNav />

      <TheDropdown />
    </div>
  </header>
</template>

<script setup>
import TheNav from "./TheNav.vue";
import TheDropdown from "./TheDropdown.vue";
</script>

<style lang="scss" scoped>
.headerD {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-image: url('@/assets/images/bg-landscape.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 1.3rem;
  padding-bottom: 0.3rem;

  &_container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style>
