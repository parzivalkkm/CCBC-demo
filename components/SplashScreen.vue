<template>
  <view class="splash-wrapper">
    <image class="splash-photo" src="/static/zhijian.png" mode="aspectFill"></image>
    <view class="brand-layer">
      <image class="brand-mark" src="/static/logo.png" mode="widthFix"></image>
      <image class="brand-text" src="/static/text_ccbc.png" mode="widthFix"></image>
      <text class="legal">©2010-2025 China Construction Bank · All Rights Reserved</text>
    </view>
    <button class="skip-btn" size="mini" @click="$emit('skip')">跳过 {{ countdown }}</button>
  </view>
</template>

<script>
export default {
  name: 'SplashScreen',
  props: {
    countdown: {
      type: Number,
      default: 3
    }
  }
}
</script>

<style scoped>
.splash-wrapper {
  position: relative;
  flex: 1;
  border-radius: 60rpx;
  overflow: hidden;
  background: #fdfefe;
  box-shadow: 0 40rpx 120rpx rgba(5, 64, 120, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

.splash-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.brand-layer {
  width: 100%;
  padding: 80rpx 60rpx 100rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  margin-top: auto;
}

.brand-mark {
  width: 180rpx;
  margin-bottom: 20rpx;
}

.brand-text {
  width: 320rpx;
  margin-bottom: 16rpx;
}

.legal {
  font-size: 22rpx;
  color: #0f60b1;
  opacity: 0.9;
  text-align: center;
}

.skip-btn {
  position: absolute;
  top: 40rpx;
  right: 40rpx;
  background: rgba(255, 255, 255, 0.85);
  color: #0f63b6;
  border: none;
  border-radius: 40rpx;
  font-size: 26rpx;
  padding: 0 28rpx;
}

button::after {
  border: none;
}
</style>
