<template lang="pug">
task-row-layout
  template(v-slot:priority): base-select-priority(v-model="form.priority")
  template(v-slot:name): base-combobox(v-model="form.name" :items="taskNames" @input="save")
  template(v-slot:plan): base-row-cell-no-data
  template(v-slot:actual): base-row-cell-no-data
  template(v-slot:memo): base-row-cell-no-data
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';
import * as ACTION from '@/types/ActionTypes';
import _ from 'lodash';

@Component
export default class TaskRowNew extends Vue {
  @Prop() private date!: number;
  @Prop() private userId!: string;

  private form: Form<Task> = Task.form();

  private get nameInvalid(): boolean {
    return this.form.name === null || this.form.name === '';
  }

  private get todayTasks() {
    return [...this.$store.state.tasks]
      .filter(([, task]) => task.userId === this.userId && task.date === this.date)
      .map(([, task]) => task.name);
  }

  private get otherdayTasks() {
    return [...this.$store.state.tasks]
      .filter(([, task]) => task.userId === this.userId && task.date !== this.date)
      .map(([, task]) => task.name);
  }

  private get taskNames(): string[] {
    return _.difference(this.otherdayTasks, this.todayTasks);
  }

  private async save() {
    this.form.userId = this.userId;
    this.form.date = this.date;

    if (Task.valid(this.form)) {
      await this.$store.dispatch(ACTION.CREATE,
        new Task({...this.form}),
      );
      this.form = Task.form();
    } else {
      alert(`invalid task data: ${JSON.stringify(this.form)}`);
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
