<template lang="pug">
  v-text-field(
    prepend-icon="lock"
    label="password"
    type="password"
    :value="value"
    :rules="rules"
    v-on="inputListeners"
  )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

type validateFunc = Array<(v: string) => boolean | string>;

@Component
export default class BaseTextFieldPassword extends Vue {
  @Prop() private value!: string;

  private rules: validateFunc = [
    (v: string) => !!v || '必須項目です',
  ];

  private get inputListeners() {
    return Object.assign({},
      this.$listeners,
      {
        input: (event: Event) => {
          this.$emit('input', event);
        },
      },
    );
  }
}
</script>

<style lang="stylus">
</style>
