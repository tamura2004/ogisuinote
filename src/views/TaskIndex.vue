<template lang="pug">
v-container(fluid)
  v-layout(row align-center)
    v-flex(xs2)
      .display-1 {{ date.toLocaleDateString() }}
    v-flex(xs8)
      v-btn(small dark color="indigo lighten-1" @click="yesterday"): v-icon navigate_before
      v-btn(small dark color="indigo lighten-1" @click="today") 今日
      v-btn(small dark color="indigo lighten-1" @click="tomorrow"): v-icon navigate_next
  task-title-row
  task-body-row(
    v-for="[key, task] in Array.from(tasks)"
    :key="key"
    :taskId="key"
    :task="task"
  )
  task-row-new(:date="date" userId="abc")
</template>

<script lang="ts">
import _ from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import { CREATE } from '@/types/ActionTypes';
import Task from '@/models/Task';

@Component
export default class TaskIndex extends Vue {
  private date: Date = new Date();

  private get tasks() {
    return this.$store.state.tasks;
  }

  private today() {
    this.date = new Date();
  }

  private yesterday() {
    this.date = this.dateAdd(-1);
  }

  private tomorrow() {
    this.date = this.dateAdd(1);
  }

  private dateAdd(n: number): Date {
    const date = _.cloneDeep(this.date);
    date.setDate(date.getDate() + n);
    return date;
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
