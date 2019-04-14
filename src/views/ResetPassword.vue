<template lang="pug">
v-container
  v-card.elevation-12
    v-toolbar(dark dense color="indigo")
      v-toolbar-title パスワードリセット
    v-card-text
      v-form(v-model="valid")
        v-text-field(
          prepend-icon="person"
          name="email"
          label="メールアドレス"
          type="text"
          v-model="email"
          :rules="rules"
        )
    v-card-actions
      v-spacer
      v-btn(color="primary" @click="passwordReset" :disabled="!valid") リセットメール送信
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
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
    const auth = firebase.auth();
    auth.languageCode = 'ja';
    try {
      await auth.sendPasswordResetEmail(this.email);
      this.$router.push('/signin');
    } catch (err) {
      alert(err);
    }
  }
}
</script>

<style lang="stylus">
</style>
