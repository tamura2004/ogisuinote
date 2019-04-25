<template lang="pug">
div
  overwork-row-title
  overwork-row-body(
    v-for="userId in userIds"
    :userId="userId"
    :key="userId"
  )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class OverworkIndexPage extends Vue {
  private get userIds() {
    return this.$store.getters.userIds;
  }
}
</script>

<style lang="stylus" scoped>
</style>
