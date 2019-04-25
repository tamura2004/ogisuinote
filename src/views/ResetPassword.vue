<template lang="pug">
v-container
  base-menu-card(title="パスワードリセット")
    template(v-slot:form)
      v-form(v-model="valid")
        base-text-field-email(v-model="email")
    template(v-slot:action)
      v-btn(
        color="primary"
        @click="passwordReset"
        :disabled="!valid"
      ) リセットメール送信
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as ACTION from '@/types/ActionTypes';

@Component
export default class ResetPassword extends Vue {
  private email: string = '';
  private valid: boolean = false;

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
