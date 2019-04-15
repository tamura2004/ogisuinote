<template lang="pug">
  v-list(dense)
    v-list-tile(@click="logout")
      v-list-tile-action
        v-icon exit_to_app
      v-list-tile-title ログアウト
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { WAIT } from '@/types/ActionTypes';
import { SET_USER } from '@/types/MutationTypes';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component
export default class BaseNavigationDrawerList extends Vue {
  private async logout() {
    await this.$store.dispatch(
      WAIT,
      async ()  => firebase.auth().signOut(),
    )
    this.$store.commit(SET_USER, { user: null });
    this.$emit('logout');
    this.$router.push('/signin');
  }
}
</script>

<style lang="stylus" scoped>
</style>
