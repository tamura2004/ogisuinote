<template lang="pug">
v-container(fluid)
  user-task-rows(:userId="userId")
    task-row-new(:date="date" :userId="userId")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TaskIndex extends Vue {
  private get date() {
    return this.$store.getters.date;
  }

  private get userId(): string {
    if (this.$store.state.user) {
      return this.$store.state.user.email;
    } else {
      return '';
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
