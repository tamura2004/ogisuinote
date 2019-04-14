<template lang="pug">
v-app
  v-navigation-drawer(app fixed v-model="drawer")
    v-toolbar(flat dark dense)
      v-toolbar-title {{ userName }} 様
    v-list(dense)
      v-list-tile(@click="logout")
        v-list-tile-action
          v-icon exit_to_app
        v-list-tile-title ログアウト
  v-toolbar(app dense)
    v-toolbar-side-icon(@click="drawer=!drawer")
    v-toolbar-title.headline.indigo--text おぎすい予定帳
  v-content
    router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component
export default class App extends Vue {
  private drawer: boolean = false;

  private async logout() {
    await firebase.auth().signOut();
    this.$store.commit('setUser', { user: null });
  }

  private get userName(): string | undefined {
    if (this.$store.state.user) {
      return this.$store.state.user.displayName;
    } else {
      return 'ゲスト';
    }
  }
}
</script>

<style lang="stylus" scoped>
.subheading
  border solid 1px lightgrey
  height 48px
.b
  border solid 1px black
</style>
