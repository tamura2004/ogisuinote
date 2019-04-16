<template lang="pug">
div
  the-navigation-drawer(app fixed v-model="drawer")
  base-toolbar(@click="drawer=!drawer")
  v-content
    v-container(fluid)
      base-time-select
      router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TheNavigator extends Vue {
  private drawer: boolean = false;
}
</script>

<style lang="stylus" scoped>
</style>
