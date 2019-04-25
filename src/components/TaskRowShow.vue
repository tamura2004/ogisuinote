<template lang="pug">
  task-row-layout
    template(v-slot:priority): base-row-cell-body {{ task.priority }}
    template(v-slot:name): base-row-cell-body {{ task.name }}
    template(v-slot:plan): base-row-cell-body {{ task.plan | toTime }}
    template(v-slot:actual): base-row-cell-body(v-on="$listeners") {{ task.actual | toTime }}
    template(v-slot:memo): base-row-cell-body(v-on="$listeners") {{ task.memo || '-' }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Task from '@/models/Task';

@Component
export default class TaskRowShow extends Vue {
  @Prop() private task!: Task;
}
</script>

<style lang="stylus" scoped>
</style>
