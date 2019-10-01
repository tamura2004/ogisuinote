<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      v-text-field(
        prepend-icon="email"
        label="メールアドレス"
        :value="value"
        :rules="rules"
        @input="$emit('input', $event)"
      )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

type validateFunc = Array<(v: string) => boolean | string>;

@Component
export default class BaseTextFieldEmail extends Vue {
  @Prop() private value!: string | null;

  private rules: validateFunc = [
    (v: string) => !!v || '必須項目です',
  ];
}
</script>

<style lang="stylus">
</style>
