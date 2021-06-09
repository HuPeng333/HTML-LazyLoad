/// <reference path="./myElement.ts" />
/// <reference path="interface.d.ts" />
type LazyLoadData = {
    scrollElementSelector: Document | string,
    lazyLoadElementsSelector: Array<string>, // id选择器数组
    onenter?: Function,
    onleave?: Function
}
class LazyLoad implements LazyLoadFunction{
    private readonly scrollElement: MyElement// 滚动容器元素
    private readonly lazyLoadElements: Array<MyElement> // 懒加载元素
    private readonly onenter: Function | undefined
    private readonly onleave: Function | undefined
    private enterFunction: Function | undefined
    private isRunning:Boolean = false


    constructor(LazyLoad: LazyLoadData) {
        // 搜索父元素
        if (typeof LazyLoad.scrollElementSelector === 'string') {
            const scrollElement = new MyElement(LazyLoad.scrollElementSelector)
            if (!scrollElement) {
                throw new Error('没有找到滚动容器选择器对应的元素')
            }
            this.scrollElement = scrollElement
        } else {
            this.scrollElement = new MyElement(document)
        }

        // 搜索懒加载元素
        const lazyLoadElements: Array<MyElement> = []
        LazyLoad.lazyLoadElementsSelector.forEach((value) => {
            // 遍历选择器数组
            lazyLoadElements.push(new MyElement(value))
        })
        if (lazyLoadElements.length === 0) {
            throw new Error('没有找到可用的懒加载元素')
        }
        this.lazyLoadElements = lazyLoadElements
        // 绑定回调函数
        this.onenter = LazyLoad.onenter
        this.onleave = LazyLoad.onleave
    }
    /**
     * 开始监听
     */
    public start ():void {
        if (!this.isRunning) {
            this.isRunning = true
            const enter = () => {
                this.lazyLoadElements.forEach(value => {
                    if (value.checkVisible(this.scrollElement)) {
                        console.log('enter')
                    }
                })
            }
            this.enterFunction = enter
            if (this.scrollElement.isDocument) {
                document.addEventListener('scroll', enter)
            } else {
                const rootElement = this.scrollElement.element
                rootElement.addEventListener('scroll', enter)
            }
        } else {
            console.warn('该监听已经在运行了,不允许重复调用 start()方法')
        }
    }

    /**
     * 停止监听
     */
    public stop ():void{
        if (this.scrollElement.isDocument) {
            if (this.enterFunction) {
                // @ts-ignore
                document.removeEventListener('scroll', this.enterFunction)
            }
        } else {
            if (this.enterFunction) {
                // @ts-ignore
                this.scrollElement.element.removeEventListener('scroll', this.enterFunction)
            }
        }
    }

    /**
     * 获取当前运行状态
     */
    public getRunningStatus(): Boolean {
        return this.isRunning
    }

}
