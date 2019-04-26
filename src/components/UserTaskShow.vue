<template lang="pug">
div
  the-user-headline(:userId="userId")
  task-row-title
  task-row-show(
    v-for="[taskId, task] in tasks"
    :key="taskId"
    :taskId="taskId"
    :userId="userId"
    :date="date"
  )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class UserTaskShow extends Vue {
  @Prop() private userId!: string;
  @Prop() private date!: number;

  private get tasks() {
    return this.$store.getters.tasks(this.userId, this.date);
  }
}
</script>

<style lang="stylus" scoped>
</style>
