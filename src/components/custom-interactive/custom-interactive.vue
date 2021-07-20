<template>
  <view class="custom-interactive" :style="{ height: (show || loadingLazy) ? '100vh' : '' }">
    <view v-if="show || loadingLazy" class="loading" :class="[show ? 'in' : 'out']">
      <image class="loading-img" src="../../static/loading.gif"></image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      loadingLazy: false
    };
  },
  methods: {
    _$loading() {
      this.show = this.loadingLazy = true
      setTimeout(() => {
        this.show = false
        setTimeout(() => this.loadingLazy = false, 500)
      }, 2333)
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin flex($c: row) {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: $c;
}

@mixin abs($t: 0, $l: 0, $w: 100%, $h: 100%) {
  top: $t;
  left: $l;
  width: $w;
  height: $h;
  position: absolute;
}

.custom-interactive {
  top: 0;
  left: 0;
  width: 100vw;
  position: fixed;

  .loading {
    opacity: 0;
    @include abs();
    @include flex();
    background: rgb(43, 44, 48);

    &.in {
      animation: fade-in 0.5s forwards;
    }

    &.out {
      animation: fade-out 0.5s forwards;
    }

    .loading-img {
      width: 200rpx;
      height: 200rpx;
    }
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.9;
  }
}

@keyframes fade-out {
  from {
    opacity: 0.9;
  }
  to {
    opacity: 0;
  }
}
</style>
