<template lang="pug">
v-app
  base-navigation-drawer(app fixed v-model="drawer")
  base-toolbar(@click="drawer=!drawer")
  v-content
    base-progress-circler(v-if="wait")
    router-view(v-else)
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
}
</script>

<style lang="stylus" scoped>
</style>
