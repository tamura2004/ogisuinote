<template lang="pug">
v-app
  the-progress-circler(v-if="wait || !$store.getters.config")
  router-view(v-else)
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

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
