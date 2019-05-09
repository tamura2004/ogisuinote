<template lang="pug">
v-container
  base-menu-card(title="ID登録")
    template(v-slot:form)
      v-form(v-model="valid")
        base-text-field-username(v-model="name")
        base-text-field-email(v-model="email")
        base-text-field-password(v-model="password")

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
  private name = null;
  private email = null;
  private password = null;
  private manager = false;

  private valid: boolean = false;

  private rules: validateFunc = [
    (v: string) => v !== '' || '必須項目です',
  ];

  private signup() {
    this.$store.dispatch(
      ACTION.WAIT,
      async () => this.$store.dispatch(ACTION.SIGNUP, this),
    );
    this.$router.push('/');
  }
}
</script>

<style lang="stylus">
</style>
