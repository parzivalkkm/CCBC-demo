<template>
  <scroll-view class="login-scroll" scroll-y>
    <view class="login-container">
      <view class="bank-brand">
        <image class="bank-mark" src="/static/logo.png" mode="heightFix"></image>
        <image class="bank-wordmark" src="/static/text_ccbc.png" mode="widthFix"></image>
      </view>

      <view class="login-header">
        <text class="hello">您好，</text>
        <text class="welcome">欢迎来到建设银行</text>
      </view>

      <view class="form-card">
        <view class="picker-row">
          <picker class="area-picker" mode="selector" :range="areaCodes" range-key="label" :value="selectedAreaIndex" @change="onAreaChange">
            <view class="area-display">
              <text>{{ currentArea }}</text>
              <text class="arrow">⌄</text>
            </view>
          </picker>
          <input class="phone-input" type="number" maxlength="11" placeholder="输入手机号码" :value="phone" @input="onPhoneInput" />
        </view>
        <view class="code-row">
          <input class="phone-input" type="number" maxlength="6" placeholder="请输入短信授权码" :value="smsCode" @input="onSmsInput" />
          <text class="get-code" :class="{ disabled: smsCountdown > 0 }" @click="onRequestSms">{{ smsCountdown > 0 ? smsCountdown + 's' : '点击获取' }}</text>
        </view>
        <button class="primary-btn" :class="{ disabled: !agreementChecked }" @click="$emit('submit')">注册 / 登录</button>
        <view class="agreement-row">
          <view class="checkbox" :class="{ checked: agreementChecked }" @click="$emit('toggle-agreement')">
            <text v-if="agreementChecked" class="checkmark">✓</text>
          </view>
          <view class="agreement-text">
            <text>本人已认真阅读并同意</text>
            <text class="link" @click="openDoc('service')">《中国建设银行股份有限公司电子银行个人客户服务协议》</text>
            <text>、</text>
            <text class="link" @click="openDoc('privacy')">《中国建设银行股份有限公司个人信息保护政策》</text>
          </view>
        </view>
      </view>

      <view class="alt-login">
        <text>其他登录方式</text>
        <view class="icon-row">
          <view v-for="icon in loginIcons" :key="icon.name" class="icon-circle">
            <image class="icon-img" :src="icon.src" mode="aspectFit"></image>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
export default {
  name: 'LoginPanel',
  props: {
    phone: {
      type: String,
      default: ''
    },
    areaCodes: {
      type: Array,
      default: () => []
    },
    selectedAreaIndex: {
      type: Number,
      default: 0
    },
    agreementChecked: {
      type: Boolean,
      default: false
    },
    loginIcons: {
      type: Array,
      default: () => []
    },
    smsCode: {
      type: String,
      default: ''
    },
    smsCountdown: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:phone', 'update:sms-code', 'area-change', 'toggle-agreement', 'submit', 'open-doc', 'request-sms'],
  computed: {
    currentArea() {
      const fallback = this.areaCodes[0]
      const current = this.areaCodes[this.selectedAreaIndex]
      return (current || fallback || { value: '' }).value
    }
  },
  methods: {
    onAreaChange(event) {
      const index = Number(event?.detail?.value) || 0
      this.$emit('area-change', index)
    },
    onPhoneInput(event) {
      this.$emit('update:phone', event?.detail?.value || '')
    },
    onSmsInput(event) {
      this.$emit('update:sms-code', event?.detail?.value || '')
    },
    onRequestSms() {
      if (this.smsCountdown > 0) {
        return
      }
      this.$emit('request-sms')
    },
    openDoc(type) {
      this.$emit('open-doc', type)
    }
  }
}
</script>

<style scoped>
.login-scroll {
  flex: 1;
  padding: 40rpx;
  box-sizing: border-box;
}

.login-container {
  padding-top: 80rpx;
  padding-bottom: 120rpx;
  color: #0f2040;
  display: flex;
  flex-direction: column;
}

.bank-brand {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.bank-mark {
  height: 90rpx;
}

.bank-wordmark {
  width: 320rpx;
}

.login-header {
  margin-top: 40rpx;
  margin-bottom: 70rpx;
}

.hello {
  display: block;
  font-size: 68rpx;
  font-weight: 600;
}

.welcome {
  display: block;
  margin-top: 10rpx;
  font-size: 32rpx;
  color: #5b6f91;
}

.form-card {
  background: #ffffff;
  border-radius: 48rpx;
  padding: 60rpx 48rpx;
  box-shadow: 0 50rpx 120rpx rgba(15, 38, 86, 0.12);
}

.picker-row {
  display: flex;
  align-items: center;
  border-bottom: 2rpx solid #e4ecf5;
  padding-bottom: 24rpx;
  margin-bottom: 50rpx;
}

.code-row {
  display: flex;
  align-items: center;
  border-bottom: 2rpx solid #e4ecf5;
  padding-bottom: 24rpx;
  margin-bottom: 50rpx;
}

.area-picker {
  width: 220rpx;
  margin-right: 30rpx;
}

.area-display {
  display: flex;
  align-items: center;
  font-size: 32rpx;
  color: #0f2040;
}

.arrow {
  margin-left: 14rpx;
  font-size: 32rpx;
  color: #8da2bf;
}

.phone-input {
  flex: 1;
  font-size: 36rpx;
  color: #0f2040;
}

.get-code {
  margin-left: 24rpx;
  font-size: 30rpx;
  color: #1f7bff;
  white-space: nowrap;
}

.get-code.disabled {
  color: #9bb4d4;
  pointer-events: none;
}

.primary-btn {
  margin-top: 40rpx;
  background: linear-gradient(110deg, #237dfd, #3fc0ff);
  color: #ffffff;
  border-radius: 80rpx;
  font-size: 34rpx;
  font-weight: 500;
  height: 96rpx;
  line-height: 96rpx;
  border: none;
  transition: opacity 0.2s;
}

.primary-btn.disabled {
  opacity: 0.6;
}

.agreement-row {
  margin-top: 40rpx;
  display: flex;
  gap: 18rpx;
}

.checkbox {
  width: 36rpx;
  height: 36rpx;
  border-radius: 8rpx;
  border: 2rpx solid #b7c8df;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: #fff;
}

.checkbox.checked {
  background: #1f7bff;
  border-color: #1f7bff;
}

.checkmark {
  font-size: 24rpx;
}

.agreement-text {
  flex: 1;
  font-size: 24rpx;
  color: #6c7c96;
  line-height: 1.6;
}

.link {
  color: #1f7bff;
}

.alt-login {
  margin-top: 80rpx;
  text-align: center;
  color: #4a5c73;
  font-size: 26rpx;
}

.icon-row {
  margin-top: 30rpx;
  display: flex;
  justify-content: center;
  gap: 60rpx;
}

.icon-circle {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  background: #ffffff;
  box-shadow: 0 20rpx 40rpx rgba(15, 38, 86, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-img {
  width: 70rpx;
  height: 70rpx;
}

button::after {
  border: none;
}
</style>
