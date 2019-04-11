<template lang="pug">
task-row-layout
  template(v-slot:priority): task-priority-select(v-model="form.priority")
  template(v-slot:name): base-text-field(v-model="form.name")
  template(v-slot:plan): task-time-select(v-model="form.plan" :disabled="nameNull")
  template(v-slot:actual): task-time-select(v-model="form.actual")
  template(v-slot:memo): base-text-field(v-model="form.memo")
  template(v-slot:action)
    v-btn(fab small dark color="primary" @click="save")
      v-icon done
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';
import { CREATE } from '@/types/ActionTypes';
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
export default class TaskRowNew extends Vue {
  @Prop() private date!: Date;
  @Prop() private userId!: string;

  private form: Form<Task> = Task.form();

  private get nameNull(): boolean {
    return this.form.name === null || this.form.name === '';
  }

  private save() {
    this.form.userId = 'abc';
    this.form.date = this.date.toLocaleDateString(),

    alert(JSON.stringify(this.form));
    if (Task.valid(this.form)) {
      this.$store.dispatch(CREATE,
        new Task({...this.form}),
      );
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
