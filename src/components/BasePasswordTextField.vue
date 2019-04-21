<template lang="pug">
  v-text-field(
    prepend-icon="lock"
    label="password"
    type="password"
    :value="value"
    :rules="rules"
    @input="$emit('input', $event)"
  )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

type validateFunc = Array<(v: string) => boolean | string>;

@Component
export default class BasePasswordTextField extends Vue {
  @Prop() private value!: string;

  private rules: validateFunc = [
    (v: string) => !!v || '必須項目です',
  ];
}
</script>

<style lang="stylus">
</style>
