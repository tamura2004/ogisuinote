<template lang="pug">
  v-toolbar(flat dark dense)
    v-toolbar-title {{ userName }} 様
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class TheNavigationDrawerToolbar extends Vue {
  private get userName() {
    return this.$store.getters.userName(this.$store.getters.userId);
  }
  private get userId() {
    return this.$store.getters.userId;
  }
}
</script>

<style lang="stylus" scoped>
</style>
