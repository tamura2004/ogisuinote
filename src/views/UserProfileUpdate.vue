<template lang="pug">
v-container
  base-menu-card(title="ユーザー情報更新")
    template(v-slot:form)
      v-form(v-model="valid")
        base-username-text-field(v-model="form.name")
    template(v-slot:action)
      v-btn(color="primary" @click="signup" :disabled="!valid") 更新
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

  private get userId() {
    return this.$store.getters.userId;
  }

  private get user() {
    return this.$store.getters.user(this.userId);
  }

  private created() {
    if (this.user === undefined) {
      this.form = User.form();
    } else {
      const { name, email } = this.user;
      this.form = { name, email };
    }
  }

  private async signup() {
    if (!User.valid(this.form)) {
      alert(`bad user data: ${JSON.stringify(this.form)}`);
      return;
    }
    await this.$store.dispatch(ACTION.USER_PROFILE_UPDATE, this);
    this.$router.push('/');
  }
}
</script>

<style lang="stylus">
</style>
