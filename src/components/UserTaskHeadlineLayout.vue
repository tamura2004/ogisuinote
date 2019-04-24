<template lang="pug">
  v-layout(row align-center)
    v-flex(xs6): slot(name="name")
    v-flex(xs6): slot(name="worktime")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UserTaskHeadlineLayout extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
