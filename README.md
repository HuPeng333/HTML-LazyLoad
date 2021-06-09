元素懒加载
====


使用方法
----

1.引入js文件

2.创建一个懒加载对象


| 参数 | 是否必须 | 类型 |
| :---: | :---: | :---: |
| LazyLoadData | true | Object |

LazyLoadData对象说明:

| 参数 | 是否必须 | 类型 | 说明 |
| :---: | :---: | :---: | :---:|
| scrollElementSelector | true | String &#124; Document | 容器元素(懒加载元素的父元素),可以为id,或者类等选择器 |
| lazyLoadElementsSelector | true | Array\<String\> | 需要懒加载的元素,数组内可以为id,或类等选择器(如果使用类选择器,则只会选中第一个元素) |




```
    // 例如
    const lazyLoad = new LazyLoad({
        scrollElementSelector: document,
        lazyLoadElementsSelector: ['.item1', '#item2']
    })
    
    const lazyLoad2 = new LazyLoad({
        scrollElementSelector: '.box',
        lazyLoadElementsSelector: ['.item1', '#item2']
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

注意事项
----

1.如果使用区域滚动,父元素需要设置定位,建议设置成相对定位(relative)

