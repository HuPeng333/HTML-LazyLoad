"use strict";
class LazyLoad {
    constructor(LazyLoad) {
        this.isRunning = false;
        if (typeof LazyLoad.scrollElementSelector === 'string') {
            const scrollElement = new MyElement(LazyLoad.scrollElementSelector);
            if (!scrollElement) {
                throw new Error('没有找到滚动容器选择器对应的元素');
            }
            this.scrollElement = scrollElement;
        }
        else {
            this.scrollElement = new MyElement(document);
        }
        const lazyLoadElements = [];
        LazyLoad.lazyLoadElementsSelector.forEach((value) => {
            lazyLoadElements.push(new MyElement(value));
        });
        if (lazyLoadElements.length === 0) {
            throw new Error('没有找到可用的懒加载元素');
        }
        this.lazyLoadElements = lazyLoadElements;
        this.onenter = LazyLoad.onenter;
        this.onleave = LazyLoad.onleave;
    }
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            const enter = () => {
                this.lazyLoadElements.forEach(value => {
                    if (value.checkVisible(this.scrollElement)) {
                        console.log('enter');
                    }
                });
            };
            this.enterFunction = enter;
            if (this.scrollElement.isDocument) {
                document.addEventListener('scroll', enter);
            }
            else {
                const rootElement = this.scrollElement.element;
                rootElement.addEventListener('scroll', enter);
            }
        }
        else {
            console.warn('该监听已经在运行了,不允许重复调用 start()方法');
        }
    }
    stop() {
        if (this.scrollElement.isDocument) {
            if (this.enterFunction) {
                document.removeEventListener('scroll', this.enterFunction);
            }
        }
        else {
            if (this.enterFunction) {
                this.scrollElement.element.removeEventListener('scroll', this.enterFunction);
            }
        }
    }
    getRunningStatus() {
        return this.isRunning;
    }
}
class MyElement {
    constructor(selector) {
        this.offsetTop = 0;
        this.scrollTop = 0;
        this.offsetHeight = 0;
        if (typeof selector === 'string') {
            const element = document.querySelector(selector);
            if (element !== null) {
                this.element = element;
                this.isDocument = false;
            }
            else {
                throw new Error('无法找到 \'' + selector + '\' 对应的元素');
            }
        }
        else {
            this.element = document.documentElement;
            this.isDocument = true;
        }
    }
    getOffsetTop() {
        if (this.element.offsetTop) {
            return this.element.offsetTop;
        }
        else {
            return 0;
        }
    }
    getScrollTop() {
        return this.element.scrollTop;
    }
    getOffsetHeight() {
        return this.isDocument ? window.innerHeight : this.element.offsetHeight;
    }
    checkVisible(root) {
        return this.getOffsetTop() - root.getOffsetHeight() - root.getScrollTop() <= 0;
    }
}
