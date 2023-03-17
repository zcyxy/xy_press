module.exports = {
  title: '前端相关资料',
  description: '前端相关资料',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  head: [
    // 页面图标
    [
      'link', {
        rel: 'icon',
        href: '/svg/favicon.svg'
      },

    ],
    // 解决图片不显示
    [
      "meta", {
        name: "referrer",
        content: "no-referrer"
      }
    ]
  ],
  plugins: [['vuepress-plugin-code-copy', true]],
  theme: 'reco',
  themeConfig: {
    subSidebar: 'auto',
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      {
        text: 'xyzcy的 个人网站',
        link: 'http://47.111.22.150:8099/'
      },
      {
        text: 'Gitee',
        link: 'https://gitee.com/xyzcy'
      }
    ],
    // 侧边栏
    sidebar: [
      {
        title: '欢迎浏览',
        path: '/',
        collapsable: false, // 不折叠
        children: [
          { title: "前言", path: "/" }
        ]
      },
      {
        title: "原型与原型链",
        path: '/handbook/Prototype/Prototype',
        collapsable: false, // 不折叠
        children: [
          { title: "原型", path: "/handbook/Prototype/Prototype" },
          { title: "继承", path: "/handbook/Prototype/Inherit" }
        ],
      },
      {
        title: "执行上下文",
        path: '/handbook/ExecutionContext/ExecutionContext',
        collapsable: false, // 不折叠
        children: [
          { title: "执行上下文", path: "/handbook/ExecutionContext/ExecutionContext" },
          { title: "变量对象", path: "/handbook/ExecutionContext/ActivationObject" },
          { title: "作用域链", path: "/handbook/ExecutionContext/Scope" },
          { title: "This", path: "/handbook/ExecutionContext/This" },
        ],
      },
      {
        title: "闭包",
        path: '/handbook/Closure/Closure',
        collapsable: false, // 不折叠
        children: [
          { title: "闭包", path: "/handbook/Closure/Closure" },
        ],
      },
      {
        title: "事件循环",
        path: '/handbook/EventLoop/EventLoop',
        collapsable: false, // 不折叠
        children: [
          { title: "事件循环", path: "/handbook/EventLoop/EventLoop" },
          { title: "Promise", path: "/handbook/EventLoop/Promise" },
        ],
      },
      {
        title: "常用数组操作方法",
        path: '/handbook/Array/Array',
        collapsable: false, // 不折叠
        children: [
          { title: "常用数组操作方法", path: "/handbook/Array/Array" },
        ],
      },
      {
        title: "常用字符串操作方法",
        path: '/handbook/String/String',
        collapsable: false, // 不折叠
        children: [
          { title: "常用字符串操作方法", path: "/handbook/String/String" },
        ],
      },
      {
        title: "操作符优先级",
        path: '/handbook/Operator/Operator',
        collapsable: false, // 不折叠
        children: [
          { title: "操作符优先级", path: "/handbook/Operator/Operator" },
        ],
      },
      {
        title: "类型转换",
        path: '/handbook/Type/Type',
        collapsable: false, // 不折叠
        children: [
          { title: "类型转换", path: "/handbook/Type/Type" },
        ],
      },
      {
        title: "前端路由",
        path: '/handbook/Router/Router',
        collapsable: false, // 不折叠
        children: [
          { title: "前端路由", path: "/handbook/Router/Router" },
        ],
      },
    ]
  },
}