<template lang="pug">
task-row-layout
  template(v-slot:priority): task-priority-select(v-model="form.priority")
  template(v-slot:name): base-text-field(v-model="form.name")
  template(v-slot:plan): task-time-select(v-model="form.plan" @change="save")
  template(v-slot:actual): task-time-select(v-model="form.actual")
  template(v-slot:memo): base-text-field(v-model="form.memo")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';
import { UPDATE } from '@/types/ActionTypes';
import TaskRowLayout from '@/components/TaskRowLayout.vue';
import BaseTextField from '@/components/BaseTextField.vue';
import TaskPrioritySelect from '@/components/TaskPrioritySelect.vue';
import TaskTimeSelect from '@/components/TaskTimeSelect.vue';

@Component({
  components: {
    TaskRowLayout,
    TaskPrioritySelect,
    BaseTextField,
    TaskTimeSelect,
  },
})
export default class TaskRowEdit extends Vue {
  @Prop() private date!: Date;
  @Prop() private userId!: string;
  @Prop() private taskId!: string;
  @Prop() private task!: Task;

  private form: Task = new Task(this.task);

  private async save() {
    this.form.userId = 'abc';
    this.form.date = this.date.toLocaleDateString(),
    this.$emit('done');

    alert(JSON.stringify(this.form));
    if (Task.valid(this.form)) {
      await this.$store.dispatch(UPDATE, {
        collectionName: 'tasks',
        id: this.taskId,
        updates: this.form,
      });
    } else {
      alert(`invalid task data: ${JSON.stringify(this.form)}`);
    }
  }
}
</script>

<style lang="stylus" scoped>
.subheading
  border solid 1px lightgrey
  height 48px
.b
  border solid 1px black
</style>
