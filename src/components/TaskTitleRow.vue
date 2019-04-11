<template lang="pug">
task-row-layout
  template(v-slot:priority): task-title-cell 優先度
  template(v-slot:name): task-title-cell 作業内容
  template(v-slot:plan): task-title-cell 見込時間
  template(v-slot:actual): task-title-cell 実績時間
  template(v-slot:memo): task-title-cell コメント
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TaskRowLayout from '@/components/TaskRowLayout.vue';
import TaskTitleCell from '@/components/TaskTitleCell.vue';

@Component({
  components: {
    TaskRowLayout,
    TaskTitleCell,
  },
})
export default class TaskTitleRow extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
