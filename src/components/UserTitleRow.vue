<template lang="pug">
user-row-layout
  template(v-slot:name): task-title-cell ユーザー名
  template(v-slot:plan): task-title-cell 見込時間
  template(v-slot:actual): task-title-cell 実績時間
  template(v-slot:memo): task-title-cell 差分
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UserTitleRow extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
