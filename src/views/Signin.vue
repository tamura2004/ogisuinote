<template lang="pug">
v-container
  v-card.elevation-12
    v-toolbar(dark dense color="indigo")
      v-toolbar-title ログイン
    v-card-text
      v-form(v-model="valid")
        v-text-field(
          prepend-icon="person"
          name="email"
          label="email"
          type="text"
          v-model="email"
          :rules="rules"
        )
        v-text-field(
          id="password"
          prepend-icon="lock"
          name="password"
          label="password"
          type="password"
          v-model="password"
          :rules="rules"
          @keydown.enter="signin"
        )
    v-card-actions
      v-spacer
      v-btn(color="primary" @click="signin" :disabled="!valid") ログイン
    v-card-text
      div: router-link(to="/signup") ID登録はこちら
      div: router-link(to="/password") パスワードを忘れた方はこちら
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { WAIT } from '@/types/ActionTypes';
import firebase from 'firebase/app';
import 'firebase/auth';

type validateFunc = Array<(v: string) => boolean | string>;

@Component
export default class Signin extends Vue {
  private email: string = '';
  private password: string = '';
  private valid: boolean = false;

  private rules: validateFunc = [
    (v: string) => v !== '' || '必須項目です',
  ];

  private async signin() {
    await this.$store.dispatch(
      WAIT,
      async () => firebase.auth().signInWithEmailAndPassword(this.email, this.password),
    );
    this.$router.push('/');
  }
}
</script>

<style lang="stylus">
</style>
