<template lang="pug">
v-container(fluid)
  the-user-headline(:userId="userId")
  task-row-title
  task-row-edit(
    v-for="[key, task] in tasks"
    :key="key"
    :taskId="key"
    :task="task"
    :userId="userId"
    :date="date"
  )
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
    return this.$store.getters.userId;
  }

  private get tasks() {
    return this.$store.getters.tasks(this.userId, this.date);
  }
}
</script>

<style lang="stylus" scoped>
</style>
