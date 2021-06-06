"use strict";
class LazyLoad {
    constructor(LazyLoad) {
        // 搜索父元素
        if (typeof LazyLoad.scrollElementSelector === 'string') {
            const scrollElement = document.getElementById(LazyLoad.scrollElementSelector);
            if (!scrollElement) {
                throw new Error('没有找到滚动容器选择器对应的元素');
            }
            this.scrollElement = scrollElement;
        }
        else {
            this.scrollElement = document;
        }
        // 搜索懒加载元素
        const lazyLoadElements = [];
        LazyLoad.lazyLoadElementsSelector.forEach((value, index) => {
            // 遍历选择器数组
            const nodeList = document.querySelectorAll(value);
            if (nodeList.length === 0) {
                console.warn('懒加载选择器中有无法找到的元素,索引: ' + index);
            }
            else {
                nodeList.forEach(value1 => {
                    lazyLoadElements.push(value1);
                });
            }
        });
        if (lazyLoadElements.length === 0) {
            throw new Error('没有找到可用的懒加载元素');
        }
        this.lazyLoadElements = lazyLoadElements;
        // 绑定回调函数
        this.onenter = LazyLoad.onenter;
        this.onleave = LazyLoad.onleave;
    }
    /**
     * 开始监听
     */
    start() {
        console.log(this.scrollElement);
        // 给父元素绑定滚动事件
        this.scrollElement.addEventListener('scroll', () => {
            this.lazyLoadElements.forEach(element => {
                // @ts-ignore 懒加载元素到父元素顶部的距离
                const elementOffsetTop = element.offsetTop;
                if (this.scrollElement === document) {
                    // 非区域滚动
                    if (elementOffsetTop - this.scrollElement.documentElement.scrollTop - window.innerHeight <= 0) {
                        this.onenter ? this.onenter() : '';
                    }
                }
                else {
                    // 区域滚动
                    // @ts-ignore 父元素滚动条已滚动高度
                    const scrollElementScrollTop = this.scrollElement.scrollTop;
                    // @ts-ignore 父元素可用高度
                    const scrollElementHeight = this.scrollElement.offsetHeight;
                    console.log(elementOffsetTop, scrollElementScrollTop, scrollElementHeight);
                    if (elementOffsetTop - scrollElementScrollTop - scrollElementHeight <= 0) {
                    }
                }
            });
        });
    }
    /**
     * 停止监听
     */
    stop() {
    }
}
