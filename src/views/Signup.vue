<template lang="pug">
v-container
  base-menu-card(title="ID登録")
    template(v-slot:form)
      v-form(v-model="valid")
        v-layout(row wrap)
          v-flex(xs6)
            v-text-field(
              prepend-icon="person"
              label="姓"
              type="text"
              v-model="form.familyName"
              :rules="rules"
            )
          v-flex(xs6)
            v-text-field.ml-4(
              label="名"
              type="text"
              v-model="form.givenName"
              :rules="rules"
            )
        v-layout(row wrap)
          v-flex(xs6)
            v-text-field(
              prepend-icon="mail"
              label="メールアドレス"
              type="text"
              v-model="form.email"
              :rules="rules"
            )
          v-flex(xs6)
            .subheading.mt-4.mx-2 {{ mailDomain }}
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
      router-link(to="/") IDをお持ちの方はこちら
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as ACTION from '@/types/ActionTypes';
import User from '@/models/User';
import { mapGetters } from 'vuex';

type validateFunc = Array<(v: string) => boolean | string>;

@Component({
  computed: {
    ...mapGetters(['mailDomain']),
  },
})
export default class Signup extends Vue {
  private form = User.form();
  private password: string = '';
  private valid: boolean = false;

  private rules: validateFunc = [
    (v: string) => v !== '' || '必須項目です',
  ];

  private async signup() {
    if (!User.valid(this.form)) {
      alert(`bad user data: ${JSON.stringify(this.form)}`);
      return;
    }
    await this.$store.dispatch(ACTION.SIGNUP, {
      form: this.form,
      password: this.password,
    });
    this.$router.push('/');
  }
}
</script>

<style lang="stylus">
</style>
