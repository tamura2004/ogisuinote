<template lang="pug">
span
  template(v-if="overworkTime(userId, date) > 0")
    slot
  template(v-else)
    slot(name="else")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  computed: {
    ...mapGetters([
      'date',
      'overworkTime',
    ]),
  },
})
export default class OverworkOnly extends Vue {
  @Prop() private userId!: string;
}
</script>

<style lang="stylus" scoped>
</style>
