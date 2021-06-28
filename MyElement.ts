class MyElement{
    public readonly element: Element
    private offsetTop: Number = 0 // 距离父元素顶部距离
    private scrollTop: Number = 0// 滚动条滚动距离
    private offsetHeight: Number = 0 // 元素高度
    public readonly isDocument: Boolean
    private _isEnter:Boolean = false // 是否已经进入
    constructor (selector: String | Document) {
        if (typeof selector === 'string') {
            const element = document.querySelector(selector)
            if (element !== null) {
                this.element = element
                this.isDocument = false
            } else {
                throw new Error('无法找到 \'' + selector + '\' 对应的元素')
            }
        } else {
            this.element = document.documentElement
            this.isDocument = true
        }
    }

    get isEnter(): Boolean {
        return this._isEnter;
    }

    set isEnter(value: Boolean) {
        this._isEnter = value;
    }

    /**
     * 获取元素距离父元素顶部距离
     */
    public getOffsetTop():number {
        // @ts-ignore
        if (this.element.offsetTop) {
            // @ts-ignore
            return this.element.offsetTop
        } else {
            return 0
        }
    }

    /**
     * 获取元素滚动条滚动距离
     */
    public getScrollTop():number {
        // @ts-ignore
        return this.element.scrollTop
    }

    /**
     * 获取元素最大可见高度
     */
    public getOffsetHeight():number {
        // @ts-ignore
        return this.isDocument ? window.innerHeight : this.element.offsetHeight
    }

    /**
     * 返回当前元素相对于窗口的可见百分比
     * 无法返回退出时的百分比
     * @param root {MyElement} 滑动根组件
     */
    public checkVisible(root: MyElement): number {
        let total = this.getOffsetHeight() > root.getOffsetHeight() ? root.getOffsetHeight() : this.getOffsetHeight();
        return ( root.getScrollTop() + root.getOffsetHeight() - this.getOffsetTop()) / total
    }
}
