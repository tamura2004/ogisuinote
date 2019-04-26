<template lang="pug">
task-row-layout
  template(v-slot:priority): base-row-cell-body {{ task.priority }}
  template(v-slot:name): base-row-cell-body {{ task.name }}
  template(v-slot:plan): base-row-cell-body {{ task.plan | toTime }}
  template(v-slot:actual): base-row-cell-body {{ task.actual | toTime }}
  template(v-slot:memo): base-row-cell-body {{ task.memo }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class TaskRowShow extends Vue {
  @Prop() private date!: number;
  @Prop() private userId!: string;
  @Prop() private taskId!: string;

  private get task() {
    return this.$store.getters.task(this.taskId);
  }
}
</script>

<style lang="stylus" scoped>
</style>
