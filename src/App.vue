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
    v-spacer
    v-toolbar-items.hidden-sm-and-down
      v-btn(flat) {{ userName }}

  v-content(v-if="wait")
    v-container(fluid)
      v-layout(align-center justify-center fill-height)
        v-progress-circular.mt-5(:size="100" color="primary" indeterminate)

  v-content(v-else)
    router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SET_USER } from '@/types/MutationTypes';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component
export default class App extends Vue {
  private drawer: boolean = false;

  private get wait(): boolean {
    return this.$store.state.wait;
  }

  private async logout() {
    await firebase.auth().signOut();
    this.$store.commit(SET_USER, { user: null });
    this.drawer = false;
    this.$router.push('/signin');
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
