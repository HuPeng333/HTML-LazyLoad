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
|listener | false | Function | 当元素进入时触发的回调函数 |

listener参数说明:

    -第一个参数为progress，代表元素显示的百分比
        若progress小于0，代表元素相对于容器在上方
        若progress大于1，代表元素相对于容器在下方(若容器高度小于元素高度，此特性将不可用)
    -第二个参数为element，代表当前懒加载元素




```
    // 例如
    const lazyLoad = new LazyLoad({
        scrollElementSelector: document,
        lazyLoadElementsSelector: ['.item1', '#item2'],
        listener (progress, element) {
            // do something
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

