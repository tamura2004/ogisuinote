<template lang="pug">
  v-toolbar(flat dark dense)
    v-toolbar-title {{ userName }} 様
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class BaseNavigationDrawerToolbar extends Vue {
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
</style>
