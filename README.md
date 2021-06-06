#元素懒加载

##使用方法
1.引入js文件

2.创建一个懒加载对象
```
    const lazyLoad = new LazyLoad({
        scrollElementSelector: 'id选择器,不需要加#号或者直接填写document',
        lazyLoadElementsSelector: ['类选择器,不需要加点']
    })
    
    // 例如
    const lazyLoad = new LazyLoad({
        scrollElementSelector: document,
        lazyLoadElementsSelector: ['item1', 'item2']
    })
    
    const lazyLoad2 = new LazyLoad({
        scrollElementSelector: 'parent',
        lazyLoadElementsSelector: ['item1']
    })
    
```
3.调用开始方法
```
    lazyLoad.start()
```

4.停止监听
```
    lazyLoad.stop()
```

##注意事项

1.如果使用区域滚动,则父元素需要设置定位 如 ***position: relative***

2.stop()方法暂时没有 (*因为ts太麻烦了啊啊啊!!!*)
