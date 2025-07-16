---
outline: deep
---

# 记一次写 JS 动画的 bug

直接上有问题的代码

```JS
// 下拉刷新等待接口请求时小球的自我旋转
rotate(angle) {
  let timer = null

  if (this.isSpringBack) {
    cancelFrame(timer)
    timer = null
    return
  }

  this.refresherRef.style.transform = `translate(0px, ${this.state.y}px)  rotate(${angle}deg)`

  angle = angle === -360 ? 0 : angle - 5

  if (this.state.isRunning) {
    timer = nextFrame(() => {
      this.rotate(angle)
    })
  } else {
    cancelFrame(timer)
    timer = null
  }
}
```

这里的问题是，我自以为加上了这两段退出的逻辑动画就可以结束了

```JS
if (this.isSpringBack) {
  cancelFrame(timer)
  timer = null
  return
}
```

```JS
else {
  cancelFrame(timer)
  timer = null
}
```

但是其实不是，因为 `timer` 是直接定义在 `rotate` 函数里的，所以在每一次递归的时候，都注册了一个 `timer` 变量，所以 `cancelFrame(timer)` 也只能销毁当前调用函数里的 `timer`，并不能真正的将递归调用终止。

那么，要修复这个 bug 的思路也就很清晰了，也就是让 `timer` 变量放在递归调用之外，这样任何一次将 `timer` 置为 null，才能真正的停下动画。

修复代码如下

```JS
// 记录日志：动画结束的时机
rotate(angle) {
  let timer = null

  if (this.isSpringBack) {
    cancelFrame(timer)
    timer = null
    return
  }

  funtion animate(angle) {
    this.refresherRef.style.transform = `translate(0px, ${this.state.y}px)  rotate(${angle}deg`

    angle = angle === -360 ? 0 : angle - 5

    if (this.state.isRunning) {
      timer = nextFrame(() => {
        animate(angle - 5)
      })
    } else {
      cancelFrame(timer)
      timer = null
    }
  }
}
```
