<template lang="pug">
div
  task-layout(
    v-for="userId in userIds"
    :userId="userId"
    :key="userId"
  )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UsersTasks extends Vue {
  private get userIds() {
    return this.$store.getters.userIds;
  }
}
</script>

<style lang="stylus" scoped>
</style>
