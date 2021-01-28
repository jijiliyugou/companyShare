<template>
  <div class="footBox">
    <div class="footWrap">
      <div class="item">
        Shantou Qunsheng Toys Co., Ltd
      </div>
      <div class="item">
        Tel: 85800403 Mobile: 13556449083 e-mail: icy@qstoys.com.cn
      </div>
      <div class="item">
        Address: 6th floor, Jiayuan supermarket, Dengfeng Road, Chenghai
        District, Shantou City, Guangdong Province
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
.footBox {
  width: 100%;
  height: 143px;
  background-color: #3f434d;
  color: #ffffff;
  font-size: 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  .footWrap {
    .item {
      text-align: center;
      margin-top: 10px;
      &:first-of-type {
        margin-top: 0;
      }
    }
  }
}
</style>
