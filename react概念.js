
// 关于 React
React 并不是完整的 MVC/MVVM 框架， 它专注于提供清晰，简洁的View层解决方案
与模板引擎不同，React不仅专注于视图层的问题，又是一个包含 View 和 Controller 的库

// 特点
专注于视图层   // 更加轻量，渐进式，可以根据不同场景，选择业务层框架
虚拟DOM		   // 减少DOM操作，优化性能。便于和其他平台集成。 learn once，write everywhere
函数式编程     // 减少冗余代码。它本身是简单函数，所以易于测试。 函数式编程 才是 React 的精髓



// JSX 语法
JSX将 html语法直接加入到js中，再通过翻译器转换到纯JS后由浏览器运行。
尽管JSX是第三方标准，但这套标准适用于任何一个框架

<button class='btn btn-blue'><em>confirm</em></button>

// 将 html 转换成 JSON对象，这样我们就可以在 js 中创建 虚拟DOM 了
// 虚拟DOM的创建与更新都是在内存中完成，并不会插入到真实DOM中
{
  type:'button',
  props:{
    className:'btn btn-blue',
    children:{
      type:'em',
      props:{
        children:'confirm'
      }
    }
  }
}

// 组件的几项标准信息
基本的封装性    // 通过实例化的方法来创造对象
生命周期的呈现  // 如 created 和 destroy
明确的数据流动  // 单向 双向

// MV* 框架出现前的 组件
传统组件的问题在于 结构，样式和行为没有很好的结合。不同的参数下可能会导致不同的渲染。
比如常见的 show，hide，toggle。逻辑复杂时，就存在大量的 DOM操作

// 模板引擎的优势
模板可以承载逻辑，帮我们解决View上的逻辑问题，解决了数据与界面耦合的问题
在你需要根据不同数据，重复生成结构相同的html时候，模板可以大大节省你的代码量，以及提高可维护性。


// MVC架构  模板引擎诞生
View只关心怎么输出变量，所以诞生了各种 模板引擎


// React 组件
React组件是纯粹的 JSON对象，这意味着我们可以使用方法或类来创建。

React.createClass(object)          // ES5
class Button extends Component     // ES6
function Button() {  }             // 无状态函数


// 容器型组件
意味着组件是怎么工作的，数据是怎么更新的。它不包含任何虚拟DOM的修改和组合，也不包含组件的样式
如果映射到Redux上，就是使用connect的组件

// 展示型组件
意味着组件是怎么渲染的。包含了虚拟DOM的渲染和组合，也可能包含组件的样式。
不依赖任何store。一般可以写成无状态函数

// 区分原因
这样区分的目的是为了使用 相同的展示型组件 来配合不同的数据渲染。可以做到更好的复用性



// React数据流
React中，数据 是 自顶向下 单向流动的。 这条原则让组件之间的关系变得简单可预测


// state 和 props
state 只关心每个组件自己内部的状态。这些状态只能在组件内部改变
props 是 React 组件之间相互联系的一种机制。props是不可变的。props一定来自默认值或父组件

// Children    类似vue中的 slot
React.Chidlren 是官方提供的操作Children的方法。包括 forEach count map


// 静态属性 可以从类的外面访问它们

// setState的时机
componentWillMount  // 初始时的state 可以在 this.state中直接设置。 因此在这里setState没有意义
componentDidMount  // 会造成两次渲染。但有些场景必须setstate，如计算组件的位置或宽高,就必须让组件先渲染
componentWillReceiveProps(nextProps)   // 如果组件是由父组件更新props而更新的。在 shouldComponentUpdate
// 之前，会先执行componentWillReceiveProps。在这里调用setState不会造成二次渲染
componentDidUpdate

// 获取DOM元素的时机
componentDidMount
componentDidUpdate(prevProps, prevState)


// 监听 解除事件的时机
document.body.addEventListener('click',function(){ console.log(1)})
document.body.removeEventListener('click')
// 无状态函数    无state  无生命周期方法
无状态函数不会创建新的实例，它始终保持一个实例，避免了不必要的检测和内存分配，做到了内部优化
没有 shouldComponentUpdate 方法，因此每次父组件的props改变时，都会重新渲染。


// ReactDOM
React 将 涉及 DOM操作的部分剥离开，目的是抽象React，同时适用于Web端和移动端。
ReactDOM 的关注点 在 DOM 上，因此只适用于web端

// API
findDOMNode( ReactComponent )      // 返回组件实例的DOM节点。大多数情况下可以使用ref
unmountComponentAtNode( container )      // 卸载虚拟DOM，返回true/false
render( ReactElement, container, callback)   // render方法把虚拟DOM渲染到浏览器的DOM中,返回组件实例


// refs
对于React组件来说，refs会指向一个组件类的实例，所以可以调用该类的任何方法



// 性能优化  避免不必要的重绘reflow 和 重排 repaint
纯函数 
PureRender   //  react-addons-pure-render-mixin  插件
    import PureRenderMixin from 'react-addons-pure-render-mixin'
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

Immutable   
// JS中 Object 一般是可变的。但当应用复杂时，可变性的优点变得得不偿失。
// 为了解决这个问题，一般使用 浅/深拷贝。但这又造成了CPU和内存的浪费
Immutable Data 是一旦创建，就不能更改的数据。对Immutable进行curd，都会返回一个新的Immutable对象。

key  // 渲染动态子组件时，必须添加 key. 应该把 key 和 当前项的 唯一信息 匹配起来。
// key 是独一无二的。如果出现相同的key，react只渲染第一个





// 性能检测工具   react-addons-perf
Perf.start()
Perf.stop()


// 测试工具
Mocha   // describe it 包裹测试
Enzyme  // React专用测试工具  模拟用户交互的自动化工具
Expect  // 断言测试


// setState 异步更新    setState通过一个队列机制实现state更新。
// 当执行setState时，会将需要更新的state合并放入状态队列，而不会立即更新this.state.
// 队列机制可以高效的批量更新state，同时避免了重复更新
this.state.value = 1  // 这样的写法是完全错误的。


// Vue 的数据更新
Vue会立即更新数据，但不会立即刷新DOM
Vue异步执行 DOM 更新。只要观察到数据变化，Vue将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变



// React 独立架构
React 是一个自带 View 和 Controller 的库，不需要其他库也可以运行
React 可以通过抽象 '容器型组件' 来集成 Model 的功能


// MVC
Model       // 负责保存数据，和后端交互同步数据，校验数据
View        // View 是 Model 的可视化。一个View对应一个或多个Model。
Controller  // controller 负责连接 View 和 Model。View的操作通过 C 应用到 Model
// 缺点
项目越大，逻辑越复杂。数据流动的方式就越混乱
对于增删改，MVC都需要编写 View 渲染处理函数，业务复杂以后，导致controller变得臃肿。
局部更新也会使逻辑变得更加复杂

// MVVM
VM 取代了 Controller。只有一个model。
数据的双向绑定。


// Flux
Flux 架构的核心思想是 数据和逻辑永远单向流动。
Flux 并没有限定 view 的具体实现方式。因此，其他的视图也可以使用flux，比如angular，vue

// Redux
Redux 是 Flux 架构的实现

// Redux 三大原则
单一数据源   // 整个应用状态保存在一个对象中，随时可以提取出整个应用的状态做持久化。
// 并且为服务端渲染提供了可能。单一数据源导致对象特别庞大的问题可以用combineReducers化解
状态只读     // reducer 根据 action 对当前应用状态 state 进行迭代。返回一个新的 state
状态修改由纯函数完成   // reducer是纯函数，没有副作用，不依赖于外部状态。固定输入，固定输出



// Redux Api
createStore
combineReducers
bindActionCreators
applyMiddleware     // 加载 middleware   
compose


// react-redux Api
Provider
connectAdvanced
connect 


// Redux middleware
它提供一个分类处理action的机会。在middleware中，你可以检阅每个流过的action
挑选出特定类型的action进行相应的操作，给你一次改变action的机会

// middleware 使用 currying 形式。易串联，共享store
// 每个 middleware 接受 Store 的 dispatch 和 getState 函数作为命名参数，并返回一个函数。

返回值:Function 一个应用了 middleware 后的 store enhancer。这个 store enhancer 就是一个函数。
并且需要应用到 createStore。它会返回一个应用了 middleware 的新的 createStore

let store = applyMiddleware(mid1,mid2,mid3)(createStore)(reducer,null);

// thunk 函数
thunk函数 实现上就是针对多参数的 currying 以实现对函数的惰性求值。
任何函数，只要参数有回调函数，就能以thunk函数的形式实现


fs.readFile( file , callback )
// thunk 形式实现
thunk = function(file) {
  return function(callback) {
    fs.readFile( file , callback )
  }
}
readFile = thunk(file)(callback)


// redux-thunk  它会判断action是否是函数。如果是，执行action。否则，传递action给下一个mid

// redux-saga   它用 generator 代替了 promise

// 复杂异步流  
在实际场景中，我们不但有短连接，还有轮询请求，多异步串联请求，或是在异步中加入同步处理的逻辑。









// 服务端渲染 
React之所以能做到服务端渲染，主要是因为 ReactDOM。
它有一个分之 react-dom/server。可以让 React 组件以 '字符串' 的形式渲染
通常需要在服务端预加载数据，这样浏览器才能收到携带数据的页面。
如果在客户端请求数据，则往往会出现 '闪屏' 等问题

renderToString()   
// 把 React元素转成 HTML字符串 并在服务端标识 reactid。
// 所以在重新渲染时，React只是做事件绑定等操作。而不会重新渲染整个DOM树

renderToStaticMarkup()
// renderToString的 简化版。如果应用基本上是静态文本，建议使用这个方法