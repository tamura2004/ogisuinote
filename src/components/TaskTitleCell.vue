<template lang="pug">
.indigo.white--text.title.pa-1.ma-1
  slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TaskTitleCell extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
