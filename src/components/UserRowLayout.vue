<template lang="pug">
  v-layout(row align-center)
    v-flex(xs3): slot(name="name")
    v-flex(xs2): slot(name="plan")
    v-flex(xs2): slot(name="starttime")
    v-flex(xs2): slot(name="lasttime")
    v-flex(xs2): slot(name="overwork")
    v-flex(xs1): slot(name="permit")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UserRowLayout extends Vue {
}
</script>

<style lang="stylus" scoped>
</style>
