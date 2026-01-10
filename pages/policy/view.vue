<template>
  <view class="policy-page">
    <view class="policy-container">
      <view class="policy-header">
        <text class="policy-title">{{ title }}</text>
        <view class="close-btn" @click="handleClose">关闭</view>
      </view>
      <scroll-view class="policy-scroll" scroll-y>
        <text class="policy-content">{{ content }}</text>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { POLICY_CONTENT } from '../../common/policies.js'

const POLICY_MAP = POLICY_CONTENT

export default {
  data() {
    return {
      title: '政策条款',
      content: '加载中...'
    }
  },
  onLoad(options = {}) {
    const type = options.type || 'service'
    const config = POLICY_MAP[type] || POLICY_MAP.service
    this.title = config.title
    this.content = config.content
    uni.setNavigationBarTitle({ title: config.title })
  },
  methods: {
    handleClose() {
      if (getCurrentPages().length > 1) {
        uni.navigateBack()
        return
      }
      uni.reLaunch({ url: '/pages/index/index' })
    }
  }
}
</script>

<style>
page {
  background: #f5f7fb;
}

.policy-page {
  min-height: 100vh;
  padding: 0 24rpx 40rpx;
  display: flex;
  justify-content: center;
}

.policy-container {
  width: 100%;
  max-width: 900rpx;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 8rpx;
  box-sizing: border-box;
}

.policy-header {
  padding: 80rpx 0 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.policy-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #0f2040;
}

.close-btn {
  font-size: 28rpx;
  color: #1f7bff;
}

.policy-scroll {
  flex: 1;
  background: #ffffff;
  border-radius: 30rpx;
  padding: 32rpx;
  box-shadow: 0 20rpx 60rpx rgba(15, 38, 86, 0.08);
}

.policy-content {
  font-size: 26rpx;
  color: #253347;
  line-height: 1.8;
  white-space: pre-line;
}
</style>
