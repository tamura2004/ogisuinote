<template lang="pug">
v-container(fluid)
  user-task-show(
    v-for="userId in userIds"
    :userId="userId"
    :date="date"
    :key="userId"
  )
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import { listen } from '@/plugins/firebase';
import Task from '@/models/Task';

@Component
export default class UsersTasks extends Vue {
  private unsubscribe: any;

  private created() {
    this.unsubscribe = listen<Task>(
      this.$store,
      Task,
      moment().startOf('day').subtract(2, 'days').valueOf(),
    );
  }

  private destroyed() {
    this.unsubscribe();
  }

  private get date() {
    return this.$store.getters.date;
  }

  private get userIds() {
    return this.$store.getters.userIds;
  }
}
</script>

<style lang="stylus" scoped>
</style>
