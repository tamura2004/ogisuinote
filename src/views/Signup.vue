<template lang="pug">
v-container
  base-menu-card(title="ID登録")
    template(v-slot:form)
      v-form(v-model="valid")
        v-text-field(
          prepend-icon="person"
          label="お名前"
          type="text"
          v-model="name"
          :rules="rules"
        )
        v-text-field(
          prepend-icon="person"
          label="メールアドレス"
          type="text"
          v-model="email"
          :rules="rules"
        )
        v-text-field(
          prepend-icon="lock"
          label="パスワード"
          type="password"
          v-model="password"
          :rules="rules"
          @keydown.enter="signup"
        )

    template(v-slot:action)
      v-btn(color="primary" @click="signup" :disabled="!valid") ID登録

    template(v-slot:footer)
      router-link(to="/signin") IDをお持ちの方はこちら
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as ACTION from '@/types/ActionTypes';
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
      ACTION.WAIT,
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
