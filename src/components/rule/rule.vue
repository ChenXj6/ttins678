<template>
  <div>
    <div>
      <van-nav-bar :title="$t('m.Rule.rule1')" />
    </div>
    <div class="p20">
      <div v-html="rule"
           class="content">{{rule}}</div>
    </div>
    <div style="width:100%;height:98px"></div>
    <Foot></Foot>
  </div>
</template>

<script>
import Foot from '@/components/index/footer'

export default {
  components: {
    Foot
  },
  data () {
    return {
      rule: ''
    };
  },
  created () {
    this.logo()
  },
  mounted () {

  },
  methods: {
    logo () {
      this.$api.Post('logo').then(res => {
        this.rule = res.result.rule
      })
    },
  }
};
</script>

<style lang="less">
.p20 {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  background: #fff7f2;
  > .content {
    overflow: hidden;
  }
}
</style>
