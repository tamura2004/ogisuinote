<template lang="pug">
task-row-layout
  template(v-slot:priority): task-priority-select(v-model="form.priority")
  template(v-slot:name): base-combobox(v-model="form.name" :items="taskNames")
  template(v-slot:plan)
    task-time-select(
      v-model="form.plan"
      :disabled="nameInvalid"
      @change="save"
    )
  template(v-slot:actual): task-body-cell {{ form.actual }}
  template(v-slot:memo): task-body-cell {{ form.memo }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';
import { CREATE } from '@/types/ActionTypes';
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
      await this.$store.dispatch(CREATE,
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
.subheading
  border solid 1px lightgrey
  height 48px
.b
  border solid 1px black
</style>
