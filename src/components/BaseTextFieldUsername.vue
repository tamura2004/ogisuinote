<template lang="pug">
  v-layout(row wrap)
    v-flex(xs6)
      v-text-field(
        prepend-icon="person"
        label="姓"
        :value="familyName"
        :rules="rules"
        @input="familyNameHandler($event)"
      )
    v-flex(xs6)
      v-text-field.ml-4(
        label="名"
        :value="givenName"
        :rules="rules"
        @input="givenNameHandler($event)"
      )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import * as ACTION from '@/types/ActionTypes';

type validateFunc = Array<(v: string) => boolean | string>;

@Component
export default class BaseTextFieldUsername extends Vue {
  @Prop() private value!: string | null;

  private rules: validateFunc = [
    (v: string) => !!v || '必須項目です',
  ];

  private get familyName() {
    return this.value ? this.value.split(' ').shift() : '';
  }

  private get givenName() {
    return this.value ? this.value.split(' ').pop() : '';
  }

  private familyNameHandler(name: string) {
    this.$emit('input', name + ' ' + this.givenName);
  }

  private givenNameHandler(name: string) {
    this.$emit('input', this.familyName + ' ' + name);
  }
}
</script>

<style lang="stylus">
</style>
