type LazyLoadData = {
    scrollElementSelector: Document | string
    lazyLoadElementsSelector: Array<string> | String // id选择器数组
    emitOnce: Boolean // 事件是否只触发一次(即只在刚好进入或离开时调用)
    listener?: (progress: number, element: Element) => void
}

