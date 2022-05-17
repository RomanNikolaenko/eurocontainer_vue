<template>
  <div @click="$emit('close')" class="modal">
    <div class="modal_wrapper" @click.stop>
      <button @click="$emit('close')" class="modal_close" aria-label="close"></button>

      <div class="modal_container">
        <h3 class="modal_title">Замовити контейнер</h3>

        <form class="modal_form">
          <label class="modal_form-label">
            <input type="text" name="name" placeholder="Ім'я" />
          </label>
          <label class="modal_form-label">
            <input type="text" name="phone" placeholder="Телефон"
              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');" />
          </label>
          <label class="modal_form-label">
            <textarea name="message" placeholder="Напишіть, будь-ласка, коментар"></textarea>
          </label>

          <button type="submit" class="modal_form-submit orangeBtn">Надіслати</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  background-color: rgba(#000, 0.7);
  padding: 15px;
  overflow-y: auto;

  &_wrapper {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 100%;
    margin: auto;
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

  &_title {
    font-weight: 700;
    @include property('font-size', 28, 20);
    text-align: center;
  }

  &_form {
    display: flex;
    flex-direction: column;

    &-label {
      display: flex;
      margin-top: 1.2rem;
    }

    &-submit {
      margin-top: 1.2rem;
    }

    input, textarea {
      width: 100%;
      border: 1px solid var(--grey);
      padding: 15px;
      font-weight: 700;
      font-size: 1rem;
    }

    textarea {
      min-height: 150px;
      resize: vertical;
    }
  }
}
</style>
