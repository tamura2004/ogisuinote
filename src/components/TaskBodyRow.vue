<template lang="pug">
  task-row-layout(v-if="!edit" @click.native="edit=true")
    template(v-slot:priority): task-body-cell {{ task.priority }}
    template(v-slot:name): task-body-cell {{ task.name }}
    template(v-slot:plan): task-body-cell {{ task.plan }}
    template(v-slot:actual): task-body-cell {{ task.actual }}
    template(v-slot:memo): task-body-cell {{ task.memo || '-' }}
  task-row-edit(
    v-else
    :taskId="taskId"
    :task="task"
    @done="edit=false"
  )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';

@Component
export default class TaskBodyRow extends Vue {
  @Prop() private taskId!: string;
  @Prop() private task!: Task;
  private edit: boolean = false;
}
</script>

<style lang="stylus" scoped>
</style>
