<template lang="pug">
v-container(v-if="user")
  base-menu-card(title="ユーザー情報更新")
    template(v-slot:form)
      v-form(v-model="valid")
        base-text-field-username(v-model="name")
    template(v-slot:action)
      v-btn(color="primary" @click="update" :disabled="!valid") 更新
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as ACTION from '@/types/ActionTypes';
import User from '@/models/User';
import { mapGetters } from 'vuex';

type validateFunc = Array<(v: string) => boolean | string>;

@Component
export default class UserProfileUpdate extends Vue {
  private name: string = '';
  private valid: boolean = false;

  private get userId() {
    return this.$store.getters.userId;
  }
  private get user() {
    return this.$store.getters.user(this.userId);
  }

  private created() {
    if (this.user !== undefined) {
      this.name = this.user.name;
    }
  }

  private async update() {
    if (this.user === undefined) {
      alert('User must be logged in');
      return;
    }
    await this.$store.dispatch(ACTION.WAIT,
      async () => {
        await this.$store.dispatch(ACTION.UPDATE_USER, this);
      },
    );
    this.$router.push('/app/tasks');
  }
}
</script>

<style lang="stylus">
</style>
