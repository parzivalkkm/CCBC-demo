if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _imports_0$1 = "/static/zhijian.png";
  const _imports_0 = "/static/logo.png";
  const _imports_1 = "/static/text_ccbc.png";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$3 = {
    name: "SplashScreen",
    props: {
      countdown: {
        type: Number,
        default: 3
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "splash-wrapper" }, [
      vue.createElementVNode("image", {
        class: "splash-photo",
        src: _imports_0$1,
        mode: "aspectFill"
      }),
      vue.createElementVNode("view", { class: "brand-layer" }, [
        vue.createElementVNode("image", {
          class: "brand-mark",
          src: _imports_0,
          mode: "widthFix"
        }),
        vue.createElementVNode("image", {
          class: "brand-text",
          src: _imports_1,
          mode: "widthFix"
        }),
        vue.createElementVNode("text", { class: "legal" }, "©2010-2025 China Construction Bank · All Rights Reserved")
      ]),
      vue.createElementVNode(
        "button",
        {
          class: "skip-btn",
          size: "mini",
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("skip"))
        },
        "跳过 " + vue.toDisplayString($props.countdown),
        1
        /* TEXT */
      )
    ]);
  }
  const SplashScreen = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-f2d967f7"], ["__file", "C:/Users/User/Desktop/MalTrans/UniDemo/CCBC/components/SplashScreen.vue"]]);
  const _sfc_main$2 = {
    name: "LoginPanel",
    props: {
      phone: {
        type: String,
        default: ""
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
      }
    },
    emits: ["update:phone", "area-change", "toggle-agreement", "submit", "open-doc"],
    computed: {
      currentArea() {
        const fallback = this.areaCodes[0];
        const current = this.areaCodes[this.selectedAreaIndex];
        return (current || fallback || { value: "" }).value;
      }
    },
    methods: {
      onAreaChange(event) {
        var _a;
        const index = Number((_a = event == null ? void 0 : event.detail) == null ? void 0 : _a.value) || 0;
        this.$emit("area-change", index);
      },
      onPhoneInput(event) {
        var _a;
        this.$emit("update:phone", ((_a = event == null ? void 0 : event.detail) == null ? void 0 : _a.value) || "");
      },
      openDoc(type) {
        this.$emit("open-doc", type);
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("scroll-view", {
      class: "login-scroll",
      "scroll-y": ""
    }, [
      vue.createElementVNode("view", { class: "login-container" }, [
        vue.createElementVNode("view", { class: "bank-brand" }, [
          vue.createElementVNode("image", {
            class: "bank-mark",
            src: _imports_0,
            mode: "heightFix"
          }),
          vue.createElementVNode("image", {
            class: "bank-wordmark",
            src: _imports_1,
            mode: "widthFix"
          })
        ]),
        vue.createElementVNode("view", { class: "login-header" }, [
          vue.createElementVNode("text", { class: "hello" }, "您好，"),
          vue.createElementVNode("text", { class: "welcome" }, "欢迎来到建设银行")
        ]),
        vue.createElementVNode("view", { class: "form-card" }, [
          vue.createElementVNode("view", { class: "picker-row" }, [
            vue.createElementVNode("picker", {
              class: "area-picker",
              mode: "selector",
              range: $props.areaCodes,
              "range-key": "label",
              value: $props.selectedAreaIndex,
              onChange: _cache[0] || (_cache[0] = (...args) => $options.onAreaChange && $options.onAreaChange(...args))
            }, [
              vue.createElementVNode("view", { class: "area-display" }, [
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString($options.currentArea),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("text", { class: "arrow" }, "⌄")
              ])
            ], 40, ["range", "value"]),
            vue.createElementVNode("input", {
              class: "phone-input",
              type: "number",
              maxlength: "11",
              placeholder: "输入手机号码",
              value: $props.phone,
              onInput: _cache[1] || (_cache[1] = (...args) => $options.onPhoneInput && $options.onPhoneInput(...args))
            }, null, 40, ["value"])
          ]),
          vue.createElementVNode(
            "button",
            {
              class: vue.normalizeClass(["primary-btn", { disabled: !$props.agreementChecked }]),
              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("submit"))
            },
            "注册 / 登录",
            2
            /* CLASS */
          ),
          vue.createElementVNode("view", { class: "agreement-row" }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["checkbox", { checked: $props.agreementChecked }]),
                onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("toggle-agreement"))
              },
              [
                $props.agreementChecked ? (vue.openBlock(), vue.createElementBlock("text", {
                  key: 0,
                  class: "checkmark"
                }, "✓")) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            ),
            vue.createElementVNode("view", { class: "agreement-text" }, [
              vue.createElementVNode("text", null, "本人已认真阅读并同意"),
              vue.createElementVNode("text", {
                class: "link",
                onClick: _cache[4] || (_cache[4] = ($event) => $options.openDoc("service"))
              }, "《中国建设银行股份有限公司电子银行个人客户服务协议》"),
              vue.createElementVNode("text", null, "、"),
              vue.createElementVNode("text", {
                class: "link",
                onClick: _cache[5] || (_cache[5] = ($event) => $options.openDoc("privacy"))
              }, "《中国建设银行股份有限公司个人信息保护政策》")
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "alt-login" }, [
          vue.createElementVNode("text", null, "其他登录方式"),
          vue.createElementVNode("view", { class: "icon-row" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($props.loginIcons, (icon) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: icon.name,
                  class: "icon-circle"
                }, [
                  vue.createElementVNode("image", {
                    class: "icon-img",
                    src: icon.src,
                    mode: "aspectFit"
                  }, null, 8, ["src"])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ])
    ]);
  }
  const LoginPanel = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-6fc5415e"], ["__file", "C:/Users/User/Desktop/MalTrans/UniDemo/CCBC/components/LoginPanel.vue"]]);
  let splashTimer = null;
  const _sfc_main$1 = {
    components: {
      SplashScreen,
      LoginPanel
    },
    data() {
      return {
        screen: "splash",
        countdown: 3,
        phone: "",
        agreementChecked: false,
        areaCodes: [
          { label: "+86 中国大陆", value: "+86" },
          { label: "+852 香港", value: "+852" },
          { label: "+853 澳门", value: "+853" },
          { label: "+886 台湾", value: "+886" }
        ],
        selectedAreaIndex: 0,
        loginIcons: [
          { name: "wechat", src: "/static/wechat.png" },
          { name: "alipay", src: "/static/Alipay.png" }
        ],
        documents: {
          service: {
            title: "电子银行个人客户服务协议",
            content: "请阅读《中国建设银行股份有限公司电子银行个人客户服务协议》、《中国建设银行股份有限公司个人信息保护政策》后勾选同意。"
          },
          privacy: {
            title: "个人信息保护政策",
            content: "我们依据相关法律法规保护您的个人信息，请详细阅读并确认同意后继续操作。"
          }
        }
      };
    },
    onLoad() {
      this.startSplashCountdown();
    },
    onUnload() {
      this.clearSplashTimer();
    },
    methods: {
      startSplashCountdown() {
        this.clearSplashTimer();
        splashTimer = setInterval(() => {
          if (this.countdown <= 1) {
            this.skipSplash();
            return;
          }
          this.countdown -= 1;
        }, 1e3);
      },
      clearSplashTimer() {
        if (splashTimer) {
          clearInterval(splashTimer);
          splashTimer = null;
        }
      },
      skipSplash() {
        this.clearSplashTimer();
        this.screen = "login";
      },
      handleAreaChange(index) {
        this.selectedAreaIndex = Number(index) || 0;
      },
      toggleAgreement() {
        this.agreementChecked = !this.agreementChecked;
      },
      openDoc(type) {
        const doc = this.documents[type];
        if (!doc) {
          return;
        }
        uni.showModal({
          title: doc.title,
          content: doc.content,
          confirmText: "确定",
          showCancel: false
        });
      },
      handleSubmit() {
        if (!this.phone) {
          uni.showToast({
            title: "请输入手机号",
            icon: "none"
          });
          return;
        }
        if (!this.agreementChecked) {
          uni.showModal({
            content: this.documents.service.content,
            showCancel: false,
            confirmText: "确定"
          });
          return;
        }
        uni.showToast({
          title: "模拟登录成功",
          icon: "success"
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_splash_screen = vue.resolveComponent("splash-screen");
    const _component_login_panel = vue.resolveComponent("login-panel");
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      $data.screen === "splash" ? (vue.openBlock(), vue.createBlock(_component_splash_screen, {
        key: 0,
        countdown: $data.countdown,
        onSkip: $options.skipSplash
      }, null, 8, ["countdown", "onSkip"])) : (vue.openBlock(), vue.createBlock(_component_login_panel, {
        key: 1,
        phone: $data.phone,
        "area-codes": $data.areaCodes,
        "selected-area-index": $data.selectedAreaIndex,
        "agreement-checked": $data.agreementChecked,
        "login-icons": $data.loginIcons,
        "onUpdate:phone": _cache[0] || (_cache[0] = ($event) => $data.phone = $event),
        onAreaChange: $options.handleAreaChange,
        onToggleAgreement: $options.toggleAgreement,
        onSubmit: $options.handleSubmit,
        onOpenDoc: $options.openDoc
      }, null, 8, ["phone", "area-codes", "selected-area-index", "agreement-checked", "login-icons", "onAreaChange", "onToggleAgreement", "onSubmit", "onOpenDoc"]))
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "C:/Users/User/Desktop/MalTrans/UniDemo/CCBC/pages/index/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/Users/User/Desktop/MalTrans/UniDemo/CCBC/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
