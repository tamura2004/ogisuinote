<template lang="pug">
task-row-layout
  template(v-slot:priority): task-body-cell {{ form.priority }}
  template(v-slot:name): task-body-cell {{ form.name }}
  template(v-slot:plan): task-body-cell {{ form.plan | toTime }}
  template(v-slot:actual): task-time-select(v-model="form.actual" @input="save")
  template(v-slot:memo)
    base-text-field(
      v-model="form.memo"
      @blur="save"
      @keydown.enter="save"
    )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';
import { UPDATE } from '@/types/ActionTypes';

@Component
export default class TaskRowEdit extends Vue {
  @Prop() private date!: number;
  @Prop() private userId!: string;
  @Prop() private taskId!: string;
  @Prop() private task!: Task;

  private form: Task = new Task(this.task);

  private save() {
    this.form.userId = this.userId;
    this.form.date = this.date;
    this.$emit('done');

    if (Task.valid(this.form)) {
      this.$store.dispatch(UPDATE, {
        collectionName: 'tasks',
        id: this.taskId,
        updates: {
          ...this.form,
        },
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
