import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "银耳的博客",
  description: "沉淀学习的地方",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    nav: [
      {
        text: 'leetcode',
        link: '/leetcode/',
      },
      { 
        text: '大前端', 
        items: [
          { text: 'JavaScript', link: '/bigFE/JS/' },
          { text: 'React', link: '/bigFE/React/' },
        ] 
      },
      { text: '关于我', link: '/about' }
    ],

    sidebar: {
      "/bigFE/": {
        text: "大前端",
        items: [
          { text: '大前端', link: '/bigFE/' },
          { text: 'JS', link: '/bigFE/JS/' },
          { text: 'React', link: '/bigFE/React/' },
        ]
      },
      "/bigFE/JS/": {
        text: "html",
        items: [
          { text: 'JS1', link: '/bigFE/JS/js1' },
          { text: 'JS2', link: '/bigFE/JS/js2' },
        ]
      },
      "/bigFE/React/": {
        text: "html",
        items: [
          { text: 'React', link: '/bigFE/React/' }
        ]
      },
    
    },

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  }
})
