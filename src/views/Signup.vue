<template lang="pug">
v-container
  v-card.elevation-12
    v-toolbar(dark dense color="indigo")
      v-toolbar-title ID登録
    v-card-text
      v-form(v-model="valid")
        v-text-field(
          prepend-icon="person"
          name="name"
          label="お名前"
          type="text"
          v-model="name"
          :rules="rules"
        )
        v-text-field(
          prepend-icon="person"
          name="email"
          label="メールアドレス"
          type="text"
          v-model="email"
          :rules="rules"
        )
        v-text-field(
          id="password"
          prepend-icon="lock"
          name="password"
          label="パスワード"
          type="password"
          v-model="password"
          :rules="rules"
          @keydown.enter="signup"
        )
    v-card-actions
      v-spacer
      v-btn(color="primary" @click="signup" :disabled="!valid") ID登録
    v-card-text
      router-link(to="/signin") IDをお持ちの方はこちら
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { WAIT } from '@/types/ActionTypes';
import firebase from 'firebase/app';
import 'firebase/auth';

type validateFunc = Array<(v: string) => boolean | string>;

@Component
export default class Signup extends Vue {
  private name: string = '';
  private email: string = '';
  private password: string = '';
  private valid: boolean = false;

  private rules: validateFunc = [
    (v: string) => v !== '' || '必須項目です',
  ];

  private async signup() {
    const auth = firebase.auth();
    auth.languageCode = 'ja';

    await this.$store.dispatch(
      WAIT,
      async () =>  {
        const { user } = await auth.createUserWithEmailAndPassword(this.email, this.password);
        if (user === null) {
          alert('fail to create user');
          return;
        }
        await user.updateProfile({
          displayName: this.name,
        });
        // await user.sendEmailVerification();
      },
    );
    this.$router.push('/signin');
  }
}
</script>

<style lang="stylus">
</style>
