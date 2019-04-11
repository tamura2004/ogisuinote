<template lang="pug">
  task-row-layout(v-if="!edit" @click.native="edit=true")
    template(v-slot:priority): task-body-cell {{ task.priority }}
    template(v-slot:name @click="edit=true"): task-body-cell(@click="edit=true") {{ task.name }}
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
import TaskRowLayout from '@/components/TaskRowLayout.vue';
import TaskBodyCell from '@/components/TaskBodyCell.vue';
import TaskRowEdit from '@/components/TaskRowEdit.vue';

@Component({
  components: {
    TaskRowLayout,
    TaskBodyCell,
    TaskRowEdit,
  },
})
export default class TaskBodyRow extends Vue {
  @Prop() private taskId!: string;
  @Prop() private task!: Task;
  private edit: boolean = false;
}
</script>

<style lang="stylus" scoped>
</style>
