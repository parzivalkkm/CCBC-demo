<template>
  <view :class="['page', { 'page--splash': screen === 'splash' }]">
    <splash-screen
      v-if="screen === 'splash'"
      :countdown="countdown"
      @skip="skipSplash"
    />
    <login-panel
      v-else
      :phone="phone"
      :area-codes="areaCodes"
      :selected-area-index="selectedAreaIndex"
      :agreement-checked="agreementChecked"
      :login-icons="loginIcons"
      @update:phone="phone = $event"
      @area-change="handleAreaChange"
      @toggle-agreement="toggleAgreement"
      @submit="handleSubmit"
      @open-doc="openDoc"
    />
  </view>
</template>

<script>
import SplashScreen from '../../components/SplashScreen.vue'
import LoginPanel from '../../components/LoginPanel.vue'
import { POLICY_CONTENT } from '../../common/policies.js'

let splashTimer = null

export default {
  components: {
    SplashScreen,
    LoginPanel
  },
  data() {
    return {
      screen: 'splash',
      countdown: 3,
      phone: '',
      agreementChecked: false,
      areaCodes: [
        { label: '+86 中国大陆', value: '+86' },
        { label: '+852 香港', value: '+852' },
        { label: '+853 澳门', value: '+853' },
        { label: '+886 台湾', value: '+886' }
      ],
      selectedAreaIndex: 0,
      loginIcons: [
        { name: 'wechat', src: '/static/wechat.png' },
        { name: 'alipay', src: '/static/Alipay.png' }
      ],
      documents: POLICY_CONTENT
    }
  },
  onLoad() {
    this.startSplashCountdown()
  },
  onUnload() {
    this.clearSplashTimer()
  },
  methods: {
    startSplashCountdown() {
      this.clearSplashTimer()
      splashTimer = setInterval(() => {
        if (this.countdown <= 1) {
          this.skipSplash()
          return
        }
        this.countdown -= 1
      }, 1000)
    },
    clearSplashTimer() {
      if (splashTimer) {
        clearInterval(splashTimer)
        splashTimer = null
      }
    },
    skipSplash() {
      this.clearSplashTimer()
      this.screen = 'login'
    },
    handleAreaChange(index) {
      this.selectedAreaIndex = Number(index) || 0
    },
    toggleAgreement() {
      this.agreementChecked = !this.agreementChecked
    },
    openDoc(type) {
      const doc = this.documents[type]
      if (!doc) {
        return
      }
      uni.navigateTo({
        url: `/pages/policy/view?type=${type}`
      })
    },
    handleSubmit() {
      if (!this.phone) {
        uni.showToast({
          title: '请输入手机号',
          icon: 'none'
        })
        return
      }
      if (!this.agreementChecked) {
        uni.showModal({
          content: this.documents.service.notice,
          showCancel: false,
          confirmText: '确定'
        })
        return
      }
      uni.showToast({
        title: '模拟登录成功',
        icon: 'success'
      })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&display=swap');

page {
  background: #f5f7fb;
  min-height: 100%;
  font-family: 'Space Grotesk', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.page {
  min-height: 100vh;
  padding: 40rpx;
  display: flex;
  flex-direction: column;
}

.page--splash {
  padding: 0;
}
</style>
