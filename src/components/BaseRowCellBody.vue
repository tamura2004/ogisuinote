<template lang="pug">
.subheading.ma-1.pa-2
  slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BaseRowCellBody extends Vue {
}
</script>

<style lang="stylus" scoped>
.subheading
  border solid 1px lightgrey
  height 48px
</style>
