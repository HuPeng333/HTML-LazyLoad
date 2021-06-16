type LazyLoadData = {
    scrollElementSelector: Document | string
    lazyLoadElementsSelector: Array<string> | String // id选择器数组
    emitOnce: Boolean // 事件是否只触发一次(即只在刚好进入或离开时调用)
    onenter?: Function
    onleave?: Function
}

interface LazyLoadFunction {
    // /**
    //  * 开始监听
    //  *
    //  *  -该方法不允许重复调用
    //  */
    // start: () => void

    // /**
    //  * 停止监听
    //  *
    //  *  -该方法不允许重复调用
    //  */
    // stop: () => void

    // /**
    //  * 获取当前监听状态
    //  *
    //  * @return {Boolean} 运行状态
    //  *
    //  *  -true: 当前监听正在运行
    //  *
    //  *  -false: 当前监听没有运行
    //  */
    // getRunningStatus: () => Boolean
}

interface MyElementFunction {
    /**
     * 获取当前元素到父元素顶部的距离
     *
     * @return {Number} 距离
     *
     */
    getOffsetTop: () => Number

    /**
     * 获取当前元素滚动条滚动距离
     * @return {Number} 滚动距离
     */
    getScrollTop: () => Number

    /**
     * 查看当前元素是否可见
     *
     * 可见是相对浏览器窗口而言的,即使元素只露出一点距离,也会被视为可见
     * @param root {myElement} 该组件的父元素
     *
     * -true: 该元素可见
     *
     * -false: 该元素不可见
     */
    checkVisible: (root: MyElement) => Boolean
}
