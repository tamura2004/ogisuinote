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
import firebase from 'firebase/app';
import 'firebase/auth';

type validateFunc = Array<(v: string) => boolean | string>;

@Component
export default class Signin extends Vue {
  private email: string = '';
  private valid: boolean = false;

  private rules: validateFunc = [
    (v: string) => v !== '' || '必須項目です',
  ];

  private async passwordReset() {
    await this.$store.dispatch(
      ACTION.WAIT,
      async () => {
        const auth = firebase.auth();
        auth.languageCode = 'ja';
        await auth.sendPasswordResetEmail(this.email);
      },
    );
    this.$router.push('/signin');
  }
}
</script>

<style lang="stylus">
</style>
