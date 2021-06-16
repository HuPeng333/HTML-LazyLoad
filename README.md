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
| lazyLoadElementsSelector | true | Array\<String\> &#124; String | 需要懒加载的元素,数组内可以为id,或类等选择器(如果使用类选择器,则只会选中第一个元素) |
| emitOnce | false | Boolean | 是否只触发一次事件,即只在刚好进入和离开的时候调用回调函数 |
|onenter | false | Function | 当元素进入时触发的回调函数 |
|onleave | false | Function | 当元素离开时触发的回调函数 |





```
    // 例如
    const lazyLoad = new LazyLoad({
        scrollElementSelector: document,
        lazyLoadElementsSelector: ['.item1', '#item2'],
        onenter (element) {
            console.log('我进来了')
        }
    })
    
    const lazyLoad2 = new LazyLoad({
        scrollElementSelector: '.box',
        lazyLoadElementsSelector: ['.item1', '#item2']
    })
    
```


注意事项
----

1.如果使用区域滚动,父元素需要设置定位,建议设置成相对定位(relative)

2.对象一旦创建,监听就无法停止

3.回调函数的参数是对应触发事件的元素,而不是滚轮
