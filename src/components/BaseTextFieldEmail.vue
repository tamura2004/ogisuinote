<template lang="pug">
  v-layout(row wrap)
    v-flex(xs6)
      v-text-field(
        prepend-icon="email"
        label="メールアドレス"
        :value="email"
        :rules="rules"
        @input="inputHandler($event)"
      )
    v-flex(xs6)
      .subheading.mt-4.mx-2 {{ mailDomain }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

type validateFunc = Array<(v: string) => boolean | string>;

@Component
export default class BaseTextFieldEmail extends Vue {
  @Prop() private value!: string | null;

  private get email() {
    return this.value ? this.value.replace(this.mailDomain, '') : '';
  }

  private get mailDomain() {
    return this.$store.getters.mailDomain;
  }

  private rules: validateFunc = [
    (v: string) => !!v || '必須項目です',
    (v: string) => (!v || !v.includes('@')) || 'メールドメインは入力不要です',
  ];

  private inputHandler(e: string) {
    this.$emit('input', (e || '') + this.mailDomain);
  }
}
</script>

<style lang="stylus">
</style>
