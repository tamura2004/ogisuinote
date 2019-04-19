<template lang="pug">
v-container
  base-menu-card(title="パスワードリセット")
    template(v-slot:form)
      v-form(v-model="valid")
        v-text-field(
          prepend-icon="person"
          label="メールアドレス"
          type="text"
          v-model="email"
          :rules="rules"
        )
    template(v-slot:action)
      v-btn(color="primary" @click="passwordReset" :disabled="!valid") リセットメール送信
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as ACTION from '@/types/ActionTypes';

type validateFunc = Array<(v: string) => boolean | string>;

@Component
export default class Signin extends Vue {
  private email: string = '';
  private valid: boolean = false;

  private rules: validateFunc = [
    (v: string) => v !== '' || '必須項目です',
  ];

  private  passwordReset() {
    this.$store.dispatch(
      ACTION.WAIT,
      async () => this.$store.dispatch(ACTION.PASSWORD_RESET, this),
    );
    this.$router.push('/');
  }
}
</script>

<style lang="stylus">
</style>
