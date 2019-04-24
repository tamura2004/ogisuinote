<template lang="pug">
v-container
  base-menu-card(title="ログイン")
    template(v-slot:form)
      v-form(v-model="valid")
        base-email-text-field(v-model="email")
        base-password-text-field(v-model="password" @keyup.enter="signin")

    template(v-slot:action)
      v-btn(color="primary" @click="signin" :disabled="!valid") ログイン

    template(v-slot:footer)
      div
        router-link(to="/signup") ID登録はこちら
      div
        router-link(to="/password") パスワードを忘れた方はこちら
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as ACTION from '@/types/ActionTypes';

type validateFunc = Array<(v: string) => boolean | string>;

@Component
export default class Signin extends Vue {
  private email: string = '';
  private password: string = '';
  private valid: boolean = false;

  private rules: validateFunc = [
    (v: string) => v !== '' || '必須項目です',
  ];

  private signin() {
    this.$store.dispatch(
      ACTION.WAIT,
      async () => this.$store.dispatch(ACTION.SIGNIN, this),
    );
    this.$router.push('/app/tasks');
  }
}
</script>

<style lang="stylus">
</style>
