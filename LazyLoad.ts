class LazyLoad{
    private readonly scrollElement: MyElement// 滚动容器元素
    private readonly lazyLoadElements: Array<MyElement> // 懒加载元素
    private readonly onenter: Function | undefined
    private readonly onleave: Function | undefined
    private isenter: Boolean = false
    private emitOnce: Boolean
    listener?: (progress: number, element: Element) => void


    // 检查是否进入
    private checkEnter():void {
        const that = this
        this.lazyLoadElements.forEach(value => {
            if (that.listener) {
                that.listener(value.checkVisible(that.scrollElement), value.element)
            }
        })
    }


    public constructor(data: LazyLoadData) {
        this.emitOnce = data.emitOnce
        // 搜索父元素
        if (typeof data.scrollElementSelector === 'string') {
            const scrollElement = new MyElement(data.scrollElementSelector)
            if (!scrollElement) {
                throw new Error('没有找到滚动容器选择器对应的元素')
            }
            this.scrollElement = scrollElement
        } else {
            this.scrollElement = new MyElement(document)
        }

        // 搜索懒加载元素
        if (Array.isArray(data.lazyLoadElementsSelector)) {
            const lazyLoadElements: Array<MyElement> = []
            data.lazyLoadElementsSelector.forEach((value) => {
                // 遍历选择器数组
                lazyLoadElements.push(new MyElement(value))
            })
            if (lazyLoadElements.length === 0) {
                throw new Error('没有找到可用的懒加载元素')
            }
            this.lazyLoadElements = lazyLoadElements
        } else {
            this.lazyLoadElements = [new MyElement(data.lazyLoadElementsSelector)]
        }
        // 绑定回调函数
        this.listener = data.listener
        this.start()
    }
    /**
     * 开始监听
     */
    private start ():void {
        // 还未进入
        const that = this
        if (this.scrollElement.isDocument) {
            document.addEventListener('scroll', (e) => {
                that.checkEnter()
            })
        } else {
            const rootElement = this.scrollElement.element
            rootElement.addEventListener('scroll', (e) => {
                that.checkEnter()
            })
        }
    }
}
