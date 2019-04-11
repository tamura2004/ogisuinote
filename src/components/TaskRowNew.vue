<template lang="pug">
task-row-layout
  template(v-slot:priority): task-priority-select(v-model="form.priority")
  template(v-slot:name): base-text-field(v-model="form.name")
  template(v-slot:plan): task-time-select(v-model="form.plan" :disabled="nameNull" @change="save")
  template(v-slot:actual): task-body-cell {{ form.actual }}
  template(v-slot:memo): task-body-cell {{ form.memo }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';
import { CREATE } from '@/types/ActionTypes';

@Component
export default class TaskRowNew extends Vue {
  @Prop() private date!: Date;
  @Prop() private userId!: string;

  private form: Form<Task> = Task.form();

  private get nameNull(): boolean {
    return this.form.name === null || this.form.name === '';
  }

  private async save() {
    this.form.userId = 'abc';
    this.form.date = this.date.toLocaleDateString(),

    alert(JSON.stringify(this.form));
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
