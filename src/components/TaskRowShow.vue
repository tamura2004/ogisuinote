<template lang="pug">
  task-row-layout
    template(v-slot:priority): task-row-cell {{ task.priority }}
    template(v-slot:name): task-row-cell {{ task.name }}
    template(v-slot:plan): task-row-cell {{ task.plan | toTime }}
    template(v-slot:actual): task-row-cell(v-on="$listeners") {{ task.actual | toTime }}
    template(v-slot:memo): task-row-cell(v-on="$listeners") {{ task.memo || '-' }}
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
