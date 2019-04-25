<template lang="pug">
base-select(
  v-on="$listeners"
  label="引継者"
  :items="items"
  :value="value"
)
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class BaseSelectSuccessor extends Vue {
  @Prop() private value!: any;

  private get currentUserId() {
    return this.$store.getters.userId;
  }

  private get items(): Array<{ text: string, value: number }> {
    const ret = [];
    for (const [userId, user] of [...this.$store.getters.users]) {
      if (this.currentUserId !== userId) {
        ret.push({
          value: userId,
          text: user.name,
        });
      }
    }
    return ret;
  }
}
</script>

<style lang="stylus" scoped>
.b
  border solid 1px grey
</style>
