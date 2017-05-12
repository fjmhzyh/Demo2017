
// 创建地图
new ol.Map({

    layers: [ ],         // 数组 或 ol.Collection  如果为空,渲染一个空地图

    view: new ol.View({
      center: [0, 0],    // 定义地图显示中心于经度0度，纬度0度处
      zoom: 2            // 并且定义地图显示层级为2
    }),

    target: 'map',        // 地图容器

    controls: ol.control.defaults()     // 默认值

    interactions: ol.interaction.defaults()    // 默认值

    logo: false   // boolean 或者 url
});





// layers  地图的图层,也是数据的来源。 数组元素是 ol.layer.Base 类型的实例
new ol.Map({

    layers: [ 
    	new ol.layer.Tile({source: new ol.source.OSM()})   // 实例化时必须传入source参数,是数据的来源

    ]  

}


// view 
new ol.Map({

    view: new ol.View({

        center: [0, 0],    // 不设置的话地图不会显示

        projection: EPSG:3857     // 投影 ol支持 3857 或 4326

        zoom: 2            // 显示层级

        minZoom: 10,	   // 最小缩放级别

        maxZoom: 14,	   // 最大缩放级别

        extent: [102, 29, 104, 31],   // 地图范围  [minX, minY, maxX, maxY]的ol.Extent

    }),

}


// ol.interaction   交互方式
ol.interaction.defaults()    // 默认值
ol.interaction.DragRotate
ol.interaction.DoubleClickZoom
ol.interaction.DragPan
ol.interaction.PinchRotate
ol.interaction.PinchZoom
ol.interaction.KeyboardPan
ol.interaction.KeyboardZoom
ol.interaction.MouseWheelZoom
ol.interaction.DragZoom



// ol.control.defaults({})      controls: [] 关闭所有控件   
ol.control.Attribution     // 右下角的地图信息控件
ol.control.FullScreen      // 全屏控件
ol.control.MousePosition   // 鼠标位置控件
ol.control.OverviewMap     // 鸟瞰图控件
ol.control.Rotate          // 指北针控件
ol.control.ScaleLine       // 比例尺控件
ol.control.Zoom    		   // 缩放按钮控件
ol.control.ZoomSlider      // 缩放滚动条控件
ol.control.ZoomToExtent    // 放大到设定区域控件


var map = new ol.Map({
    // 在默认控件的基础上，再加上其他内置的控件
    controls: ol.control.defaults().extend([
        new ol.control.FullScreen(),
        new ol.control.MousePosition(),
    ]),
    controls: []  // 关闭所有控件 
})





// overlay  通过html元素插入图形元素等
当图标比较多的情况下，那么我们会加入非常多的HTML元素，从而造成效率降低。
使用html， 可以用css来处理，比如添加动画
// 下面把上面的图标附加到地图上，需要一个ol.Overlay
var anchor = new ol.Overlay({
	element: document.getElementById('anchor')
});
// 关键的一点，需要设置附加到地图上的位置
anchor.setPosition([104, 30]);
// 然后添加到map上
map.addOverlay(anchor);



// Feature + Style
// A vector object for geographic features with a geometry and other attribute properties
// feature的样式优先级是大于layer的样式的优先级的
var anchor = new ol.Feature({
	geometry: new ol.geom.Point([104, 30]),   // 必须要有geometry,其他属性可以自定义
	name:'hello circle', 
    age:'88'  
});

// 设置样式，在样式中就可以设置图标
anchor.setStyle(new ol.style.Style({
	image: new ol.style.Icon({
	  src: '../img/anchor.png'
	})
}));
// 添加到之前的创建的layer中去
layer.getSource().addFeature(anchor);


anchor.getProperties()  // getProperties() 获取所有自定义属性
anchor.get(key)   //  get(key) 获取其中一个属性
anchor.getGeometry()




// ol.interaction.Select  可以用于选择或高亮feature
var selectSingleClick = new ol.interaction.Select();  // 默认值singleClick

var selectPointerMove = new ol.interaction.Select({
	condition:  ol.events.condition.pointerMove    // 对应的事件,这里是hover
	layers: []  		// 从这些layer里面选择
	style:new ol.style.Style()  // 选中的style,有默认值
})

selectPointerMove.on('select',function(){

})

 clickSelect.getFeatures().clear();  // 清楚选中样式



// 单页面 多地图   实例化多个 ol.Map  

// 当多个地图的数据源相同时,拖动其中一个，另一个也将被拖动



// ol.source.XYZ   加载各种瓦片地图
var map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.XYZ({
            	//  Open Street Map
                url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'

                // 高德地图
                url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'

                // 雅虎地图  一般地图大小为256 雅虎用了512，所以需要指定说明
                tileSize: 512,
        		url:'https://{0-3}.base.maps.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/512/png8?lg=ENG&ppi=250&token=TrLJuXVK62IQk0vuXFzaig%3D%3D&requestid=yahoo.prod&app_id=eAdkWGYRoc4RfxVo0Z4B'
            })
        })
    ]
})


// tileUrlFunction  加载的在线瓦片地图的坐标系




//  ol.animation  动画
ol.animation.bounce   // 来回弹。
ol.animation.pan      // 平移。
ol.animation.rotate   // 旋转。
ol.animation.zoom     // 缩放。


var pan = ol.animation.pan({
  duration: 2000,
  source: map.getView().getCenter()
  easing: sin
});
// 注意： 使用beforeRender来添加
map.beforeRender(pan);
// 重设中心点
map.getView().setCenter(ol.proj.transform([104, 30], 'EPSG:4326', 'EPSG:3857'));



// postcompose 动画
// 只要改变地图上的某个feature或者layer或者其他任何东西，就会触发重新渲染。
 var radius = 0;
map.on('postcompose', function(){
    // 增大半径，最大20
    radius++;
    radius = radius % 20;
    // 设置样式
    circle.setStyle(new ol.style.Style({
        image: new ol.style.Circle({
            radius: radius,
            stroke: new ol.style.Stroke({
                color: 'red',
                size: 1
            })
        })
    }));
})





// 地图缩小后，出现多个一样的地图。设置wrapX属性为false就可以。

// EasyUI和OL3有冲突，体现在浏览器大小缩放时，地图会变形，具体原因未知。
// ol.js这个文件千万不能使用源码目录中的src\ol\ol.js。请下载官网的*-dist.zip，用解压后文件夹里面的ol.js。


// 事件监听/取消
// 常用事件：singleclick  dblclick  pointermove  pointerdrag
var key = map.on('singleclick', function(event){
    alert('hello');
    // 下面这行代码就是取消事件监听
    map.unByKey(key);
})


// 自定义事件
ol.Feature继承于ol.Object，而ol.Object具有派发事件(dispatchEvent)和监听事件(on)的功能。


// ol.proj.transform 坐标的转换
ol.proj.transform([104.06, 30.67], 'EPSG:4326', 'EPSG:3857')  // 坐标,当前坐标系,目标坐标系


// map.getView().fit()   让地图最大化完全地显示区域[104, 30.6, 104.12, 30.74]
map.getView().fit([104, 30.6, 104.12, 30.74], map.getSize());


// 切换地图layer
map.removeLayer(map.getLayers().item(0));
map.addLayer(mapQuestLayer);


// 显示/隐藏图层
layer.setVisible(true);

// 调整图层顺序
Layer.setZIndex(3);
Layer.setZIndex(Layer.getZIndex()-1);




//WKT格式
new ol.format.WKT().writeGeometry(feature.getGeometry())
POLYGON((13807912.078867743 3791849.764691053,13807912.078867743 3791849.764691053))

// 空间坐标   不带POLYGON和括号
13807912.078867743 3791849.764691053,13807912.078867743 3791849.764691053

var str = '';
leftPoint.forEach(function(item,index){
	var s = item.join();
	str += s + ','
})
str = str.substr(0,str.length-1)



// 坐标系及投影
由于存在着多种坐标系，即使同样的坐标，在不同的坐标系中，也表示的是不同的位置。
这就是大家经常遇到的偏移问题的根源，要解决这类问题，就需要纠偏，把一个坐标系
的坐标转换成另一个坐标系的坐标。

投影方式也多种多样，其中有一种投影叫墨卡托投影(Mercator Projection)，广泛使用于网页地图


// WGS84  EPSG:4326等同于WGS84
WGS84是全球通用的坐标系，也是我国常用的坐标系。
WGS84，全称World Geodetic System 1984，是为GPS全球定位系统使用而建立的坐标系统




// 瓦片地图
瓦片地图源于一种大地图解决方案，针对一整块非常大的地图进行切片，分成很多相同大小的小块地图
，在用户访问的时候，再一块一块小地图加载，拼接在一起，从而还原成一整块大的地图。

几乎所有的在线网页地图服务，都使用的是瓦片地图。

我们通常使用xyz这样的坐标来精确定位一张瓦片。
通常z用于表示地图层级，而xy表示某个层级内的瓦片平面，x为横纵坐标，y为纵轴坐标



// 矢量地图
矢量图使用直线和曲线来描述图形，这些图形的元素是一些点、线、矩形、多边形、圆和弧线等等。
它们都是通过数学公式计算获得的。
矢量图形最大的优点是无论放大、缩小或旋转等不会失真。
常见的格式有GeoJSON，TopoJSON，GML，KML，ShapeFile等等。
var map = new ol.Map({
    layers: [
        // 底图用Open Street Map 地图
        new ol.layer.Tile({source: new ol.source.OSM()}),
        // 再加载一个geojson的矢量地图
        new ol.layer.Vector({
            source: new ol.source.Vector({
                url: '../data/geojson/line-samples.geojson',     // 地图来源
                format: new ol.format.GeoJSON()    // 解析矢量地图的格式化类
            })
        })
    ],
    view: new ol.View({ 
        center: [0,0],
        zoom: 8,
    }),
    target: 'map'
});

加载矢量图使用的source是ol.source.Vector, layer是ol.layer.Vector