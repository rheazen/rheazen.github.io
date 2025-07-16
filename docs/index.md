---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "银耳的博客"
  text: "沉淀学习的地方"
  tagline: 前端学习记录
  image:
    src: /logo.jpg
    alt: logo
  actions:
    - theme: brand
      text: 一起学习大前端
      link: /bigFE
    - theme: alt
      text: 我的 github
      link: https://github.com/rheazen

# features:
#   - title: Feature A
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#   - title: Feature B
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
#   - title: Feature C
#     details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #282a29 10%, #70a288);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #282a29 50%, #70a288 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
