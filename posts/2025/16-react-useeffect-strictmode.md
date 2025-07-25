---
title: 严格模式下useEffect 里 new 对象踩的坑
date: 2025-07-16
category: React
tags:
  - React
  - StrictMode
---

# 前言

在使用 vite 创建 React 应用时，对应的命令是 `npm create vite@latest my-app -- --template react`, `main.jsx` 会默认启用严格模式，如下

```js
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

官方文档的解释是

严格模式启用了以下仅在开发环境下有效的行为：

- 组件将 `额外重新渲染一次` 以查找由于非纯渲染而引起的错误。
- 组件将 `额外重新运行一次` `Effect` 以查找由于缺少 `Effect` 清理而引起的错误。
- 组件将 `额外重新运行一次` `refs` 回调以查找由于缺少 `ref` 清理函数而引起的错误。
- 组件将被 `检查是否使用了已弃用的` API。

目的是为组件内的整个组件树启用额外的开发环境检查，这些检查有助于在开发过程中尽早地发现组件中的常见错误。

# 发现问题

我最近在练习写下拉刷新库，首先写了原生 JS 的版本，然后打算将支持 React 使用。

于是有了下面的代码

```JS
import { useRef, useEffect } from 'react'
import TQPullDownRefresh from 'TQPullDownRefresh'
import refreshIcon from './refresh.png'
import './PullDownRefresh.css'

export default function PullDownRefresh({ 
  onPullStart, 
  onReleaseToRefresh, 
  onPulling 
}) {
  const pullDownRefresh = useRef(null)
  const containerRef = useRef(null)
  const refresherRef = useRef(null)

  useEffect(() => {
    pullDownRefresh.current = new TQPullDownRefresh({
      containerRef: containerRef.current,
      refresherRef: refresherRef.current,
    })

    pullDownRefresh.current.onPullStart = onPullStart
    pullDownRefresh.current.onReleaseToRefresh = () => {
      const e = {
        target: {
          springBack: () => {
            pullDownRefresh.current.springBack()
          }
        }
      }
      onReleaseToRefresh && onReleaseToRefresh(e)
    }
    pullDownRefresh.current.onPulling = onPulling
  }, [])

  return (
    <div className="container" ref={containerRef}>
      <div
        className="refresher" 
        ref={refresherRef}
      >
        <img src={refreshIcon} width="25px" height="25px" />
      </div>
    </div>
  )
}
```

看起来是挺正常的，但是在测试功能的时候遇到了很诡异的问题，下拉刷新结束以后，本来已经回弹到顶部的小球又回到了下拉的位置。

一开始排查，还以为是异步的问题，花了好长时间排查也没解决。

后来还是我的导师 `这波能反杀` 波波老师凭借着他一双敏锐的眼睛，立刻就定位到了是因为`StrictMode` 的原因导致的。

# 解决思路

看到 `TQPullDownRefresh` 的 构造函数是如下

```JS
constructor(options) {
  ...

  this.onPullStart = null
  this.onReleaseToRefresh = null 
  this.onPulling = null

  this.containerRef = options.containerRef 
  this.areaRect = this.containerRef.getBoundingClientRect()

  this.refresherRef = options.refresherRef 
  this.refresherRect = this.refresherRef.getBoundingClientRect()

  this.containerRef.addEventListener('touchstart', this.touchStart.bind(this))
  this.containerRef.addEventListener('touchmove', this.touchMove.bind(this))
  this.containerRef.addEventListener('touchend', this.touchEnd.bind(this))
}
```

其实这个诡异的原因也很好解释，就是在 `开发模式` 下， `useEffect` 会执行两次嘛，我注册的两个引用 `containerRef` 和 `refresher` 所对应的 `jsx` 却只有一份，然后 `TQPullDownRefresh` 类的参数正好就是这两个引用。

那原因也就很清晰了，同一个引用被注册了两次，生成了两个实例，这两个实例都注册了 `touch` 事件，彼此之间互相干扰了，导致出现了一些比较诡异的问题。

那要怎么解决呢？

在 React 代码里，是没有改动的空间了，所以只能让 `TQPullDownRefresh` 这个原生 JS 库来兼容一下了。

既然问题在于 `touch` 事件被两次注册，那么不让它两次注册不就好了。

所以呢，简单加个补丁如下

```JS
const map = new Map()
class TQPullDownRefresh {
  constructor(options) {
    ...

    this.onPullStart = null
    this.onReleaseToRefresh = null 
    this.onPulling = null

    this.containerRef = options.containerRef 
    this.areaRect = this.containerRef.getBoundingClientRect()

    this.refresherRef = options.refresherRef 
    this.refresherRect = this.refresherRef.getBoundingClientRect()

    // 避免重复引用
    if (map.get(options.containerRef)) {
      return
    }
    map.set(options.containerRef, true)

    this.containerRef.addEventListener('touchstart', this.touchStart.bind(this))
    this.containerRef.addEventListener('touchmove', this.touchMove.bind(this))
    this.containerRef.addEventListener('touchend', this.touchEnd.bind(this))
  }
}

```

