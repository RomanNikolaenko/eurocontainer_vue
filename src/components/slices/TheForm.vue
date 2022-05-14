<template>
  <section class="form">
    <div class="form_container container">
      <prismic-rich-text :field="slice.primary.titleform" class="form_title" />

      <div class="form_wrap">
        <div class="form_wrap-col">
          <prismic-rich-text
            :field="slice.primary.textform"
            class="form_text"
          />

          <ThePhoneNumber />
        </div>
        <div class="form_wrap-col">
          <form class="form_form" @submit.prevent="handleSubmit">
            <label class="form_label">
              <input
                type="text"
                v-model="$v.name.$model"
                name="name"
                :placeholder="slice.primary.inputname"
              />
              <span
                v-if="$v.name.$dirty && !$v.name.required"
                class="form_label-error"
              >
                {{ slice.primary.inputnameerror }}
              </span>
            </label>

            <label class="form_label">
              <input
                type="text"
                v-model="$v.phone.$model"
                name="phone"
                :placeholder="slice.primary.inputphone"
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');"
              />
              <span
                v-if="$v.phone.$dirty && !$v.phone.required"
                class="form_label-error"
              >
                {{ slice.primary.inputphoneerror }}
              </span>
            </label>

            <label class="form_label">
              <textarea
                v-model="$v.message.$model"
                :placeholder="slice.primary.message"
                name="message"
              ></textarea>
              <span
                v-if="$v.message.$dirty && !$v.message.required"
                class="form_label-error"
              >
                {{ slice.primary.messageerror }}
              </span>
            </label>

            <button class="form_submit">
              {{ slice.primary.submit }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { getSliceComponentProps } from "@prismicio/vue";
import ThePhoneNumber from "./ThePhoneNumber.vue";

// The array passed to `getSliceComponentProps` is purely optional and acts as a visual hint for you
defineProps(getSliceComponentProps(["slice", "index", "slices", "context"]));

const form = reactive({
  name: "",
  phone: "",
  message: "",
});

const rules = {
  name: { required },
  phone: { required },
  message: { required },
};

const $v = useVuelidate(rules, form);

const handleSubmit = () => {
  console.log("asdasd");
  $v.value.$touch();

  if ($v.value.$invalid) return;
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";

.form {
  @include property('padding-bottom', 70, 30);

  &_title {
    color: var(--blueDark);
    text-align: center;
    @include property("padding-top", 60, 20);
    @include property("padding-bottom", 90, 20);

    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: 700;
      @include toRem("font-size", 40);
      margin-bottom: 0.3em;

      @media (max-width: 1023.98px) {
        @include toRem("font-size", 28);
      }

      br {
        @media (max-width: 767.98px) {
          display: none;
        }
      }
    }

    p {
      @include toRem("font-size", 24);

      @media (max-width: 1023.98px) {
        @include toRem("font-size", 18);
      }
    }
  }

  &_wrap {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 1.25rem;

    @media (max-width: 1023.98px) {
      grid-template-columns: 1fr;
    }

    &-col {
      width: 100%;
      max-width: 450px;
      margin: 0 auto;

      @media (max-width: 1023.98px) {
        &:nth-last-of-type(1) {
          order: -1;
        }
      }
    }
  }

  &_text {
    margin-bottom: 3.2rem;

    @media (max-width: 1023.98px) {
      margin-bottom: 1rem;
      margin-top: 1rem;
    }

    strong {
      color: var(--blueDark);
    }
  }

  &_form {
    display: grid;
    gap: 1rem;

    input,
    textarea {
      padding: 8px 15px;
      width: 100%;
      border: 1px solid var(--base);
    }

    textarea {
      resize: vertical;
      min-height: 200px;
    }
  }

  &_submit {
    background-color: var(--blueDark);
    color: var(--white);
    text-transform: uppercase;
    margin: 0 auto;
    padding: 5px 20px;
    border-radius: 0;
    border-bottom: 1px solid var(--blueDark);

    @media (hover) {
      &:hover {
        background-color: var(--white);
        color: var(--blueDark);
      }
    }
  }
}
</style>
