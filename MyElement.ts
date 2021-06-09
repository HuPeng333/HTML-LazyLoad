/// <reference path="interface.d.ts" />
class MyElement implements MyElementFunction{
    public readonly element: Element
    private offsetTop: Number = 0 // 距离父元素顶部距离
    private scrollTop: Number = 0// 滚动条滚动距离
    private offsetHeight: Number = 0 // 元素高度
    public readonly isDocument: Boolean
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

    /**
     * 获取元素距离父元素顶部距离
     */
    public getOffsetTop():Number {
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
    public getScrollTop():Number {
        // @ts-ignore
        return this.element.scrollTop
    }

    /**
     * 获取元素最大可见高度
     */
    public getOffsetHeight():Number {
        // @ts-ignore
        return this.isDocument ? window.innerHeight : this.element.offsetHeight
    }

    /**
     * 检查元素当前是否可见
     * @param root {MyElement} 滑动根组件
     */
    public checkVisible(root: MyElement): Boolean {
        return <number>this.getOffsetTop() - <number>root.getOffsetHeight() - <number>root.getScrollTop() <= 0
    }
}
