<template lang="pug">
  v-layout(row align-center)
    v-flex(xs1): slot(name="priority")
    v-flex(xs4): slot(name="name")
    v-flex(xs2): slot(name="plan")
    v-flex(xs2): slot(name="actual")
    v-flex(xs3): slot(name="memo")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TaskRowLayout extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
