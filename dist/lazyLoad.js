"use strict";
class MyElement {
    constructor(selector) {
        this.offsetTop = 0;
        this.scrollTop = 0;
        this.offsetHeight = 0;
        this._isEnter = false;
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
    get isEnter() {
        return this._isEnter;
    }
    set isEnter(value) {
        this._isEnter = value;
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
        if (this.getOffsetTop() - root.getOffsetHeight() - root.getScrollTop() <= 0 && this.getOffsetHeight() + this.getOffsetTop() - root.getScrollTop() >= 0) {
            return true;
        }
        else {
            return false;
        }
    }
}
class LazyLoad {
    constructor(data) {
        this.isenter = false;
        this.emitOnce = data.emitOnce;
        if (typeof data.scrollElementSelector === 'string') {
            const scrollElement = new MyElement(data.scrollElementSelector);
            if (!scrollElement) {
                throw new Error('没有找到滚动容器选择器对应的元素');
            }
            this.scrollElement = scrollElement;
        }
        else {
            this.scrollElement = new MyElement(document);
        }
        if (Array.isArray(data.lazyLoadElementsSelector)) {
            const lazyLoadElements = [];
            data.lazyLoadElementsSelector.forEach((value) => {
                lazyLoadElements.push(new MyElement(value));
            });
            if (lazyLoadElements.length === 0) {
                throw new Error('没有找到可用的懒加载元素');
            }
            this.lazyLoadElements = lazyLoadElements;
        }
        else {
            this.lazyLoadElements = [new MyElement(data.lazyLoadElementsSelector)];
        }
        this.onenter = data.onenter;
        this.onleave = data.onleave;
        this.start();
    }
    checkEnter() {
        const that = this;
        this.lazyLoadElements.forEach(value => {
            if (value.checkVisible(this.scrollElement)) {
                if (that.emitOnce && value.isEnter)
                    return;
                this.onenter ? this.onenter() : '';
                value.isEnter = true;
            }
            else {
                if (that.emitOnce && !value.isEnter)
                    return;
                this.onleave ? this.onleave() : '';
                value.isEnter = false;
            }
        });
    }
    start() {
        const that = this;
        if (this.scrollElement.isDocument) {
            document.addEventListener('scroll', (e) => {
                that.checkEnter();
            });
        }
        else {
            const rootElement = this.scrollElement.element;
            rootElement.addEventListener('scroll', (e) => {
                that.checkEnter();
            });
        }
    }
}
