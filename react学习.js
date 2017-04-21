// react 环境
// 生成package.json  webpack.config.js
npm install react react-dom --save     
npm install express babel-core babel-polyfill babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0 babel-preset-react-hmre webpack webpack-dev-middleware webpack-hot-middleware --save-dev
// 安装 react-router 和 redux
// npm install prop-types --save     import PropTypes from 'prop-types';
// 配置webpack.config.js  entry output module
// webpack --progress --colors --watch  带有进度和颜色,自动监听
// npm install css-loader style-loader --save-dev
// npm install react-router-dom --save
// npm install whatwg-fetch --save

// .babelrc
{
  "presets": ["es2015","react","stage-0"],    // 转码规则
  "plugins": []
}


前端开发中,性能消耗最大的就是DOM操作
react最小化了重绘,避免了不必要的DOM操作

在状态发生变化时,由于读取和更新DOM的性能问题,js重新渲染页面会很慢。
react只更新DOM,而不读取。
使用虚拟DOM,运用高效算法,计算出最小更新



客户端渲染优点
1.服务器是花钱。客户端是消费客户的电脑处理能力,所以可以节省自己的服务器处理量，处理速度。
  换算成cpu时间,就是钱。把服务器的消耗转移到用户客户端浏览器，就是前端的活。
2.

缺点
1.SEO 很多爬虫是不认的。
2.首次打开速度，各种加载 速度很慢。


// 组件
props  // 在调用这个组件的时候传入的属性
state  // 当组件状态 state 有更改的时候，React 会自动调用组件的 render 方法重新渲染整个组件的 UI
Virtual DOM  // 将组件 DOM 结构就是映射到这个 Virtual DOM 上,通过算法,计算出最小更新
Data Flow   // '单向数据绑定' 是 React 推崇的一种应用架构的方式。 从父组件流向子组件
// Data Flow 只是一种应用架构的方式，比如数据如何存放，如何更改数据，如何通知数据更改等等
组件的变量名必须以大写开头

//组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。
//只有当它插入文档以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，
//都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 DOM diff 。
//它可以极大提高网页的性能表现。


JSX 的基本语法规则：遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；
遇到代码块（以 { 开头），就用 JavaScript 规则解析。
ReactDOM.render(
  <div>
  {
    names.map(function (name) {
      return <div>Hello, {name}!</div>    // 这里需要一个key唯一标示符,否则报错
    })  
  }
  </div>,
  document.getElementById('example')
);

JSX 将 { } 中的内容渲染为动态内容

// 属性的设置
<div id={this.state.id}></div>   变量 /
<div id={ this.getId() }></div>   函数 /
<div className={ this.state.isCompleted ? 'completed' : ''}></div>   三目运算  /
<div className={ if(this.state.isCompleted){'completed'} }></div>   判断  /

// 非DOM属性
key // key是可选的唯一标示符,可以提高渲染效率。当key相同时,只渲染第一个key,且发出警告
ref // 父组件对子组件保持引用

// 特殊属性,保留关键字
for htmlFor
class className

// style
var style = { color:'red';fontSize:'12px'}
<div style={style}>

// 事件
// 事件名规范为驼峰式 onClick onChange


var child = React.createElement(tagName, property object, innerHTML);

var ul = React.DOM.ul(null,li,li,li,li) // 可以写多个子元素,但不接受对象

ReactDOM.render(component/html,document.getElementById('example'));


// 小写字母对应DOM元素,大写字母对应组件元素
// 命名空间,解决组件名冲突
<Nav.Button  ufo='xxx' ></Nav.Button>  //  自定义标签中可以自定义属性
<Nav.Button  data-ufo='xxx' ></Nav.Button>  // 这个也可以
<Nav.Button  aria-ufo='xxx' ></Nav.Button>  // 网络无障碍属性也可以

// 在JSX中往DOM元素传自定义属性,无法被React解析
<div ufo='xxx'></div>  // 报错
<div data-ufo='xxx' ></div>  // 这个可以

// ES5 组件
var MyComponent = React.createClass({
  getInitialState() {
    return { /* initial state */ };
  },
});

// ES6 组件
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { /* initial state, this is ES6 syntax (classes) */ };
  }
}

props                // 父子组件通信 
回调函数 和 事件机制            //子组件向父组件通信  
getChildContext()    //跨组件通信   
// 我们并不推荐使用context,它就像是一个全局变量,大部分情况下,全局变量正是导致应用走向混乱的罪魁祸首。
// 给组件带来了外部依赖的副作用。context比较适合不会更改的全局信息,如界面主题,用户信息
import { EventEmitter } from 'events';
var emmiter = new EventEmitter();


mixins
// MDN解释：把任意多个源对象所拥有的自身可枚举的属性复制给目标对象,然后返回目标对象
// 在react中,mixins数组可以增加多个mixin,但不允许出现同名方法
mixins的作用
// 工具方法 共享一些工具方法,在各个组件直接调用
// 生命周期继承 如果有很多mixin 来定义componentDidMount这个周期,react会合并起来执行。
// 也可以用在getInitialState的结果上,做state的合并,props也是这样合并的

// ES6 classes 形式构建组件时,并不支持mixins
// mixins 可能被 high order 替代。

纯函数  // kiss原则 keep it simple,stupid
// 给定相同的输入,返回相同的输出。不能使用Math.random() new Date()等方法
// 过程没有副作用,所有功能就是返回一个新的值，没有其他行为，尤其是不得修改外部变量的值。
// 没有额外的状态依赖,完全独立于外部状态。方法内的状态只在方法的生命周期内存活


immutable  // 不可改变的   
mutable    // 易变的
add ons    // 附件 插件 扩展 
suffix     // 后缀


// state
state只关心每个组件自己内部的状态,这些状态只能在组件内部改变。
setState()  // setState() 是一个异步方法,一个生命周期内的setState()方法会合并操作
// setState通过一个队列机制更新。当执行setState时,会将需要更新的state合并后放入状态队列,而不是立即更新
this.state.value = 1 //千万不要这样写。这是一种低效的做法,而且很有可能被之后的操作替换。
// 这种做法不会将state放入状态队列,当下次调用setState时,将忽略之前的修改,而造成无法预知的错误

// 如果在 shouldComponentUpdate 或 componentWillUdate 中调用  调用 setState。会调用内部的updateComponent
// 方法,而updateComponent 又会调用shouldComponentUpdate和componentWillUdate。造成循环调用,使浏览器内存
// 占满后崩溃

// virtual dom 在内存中以对象的形式存在
// syntheticEvent 合成事件可以给 virtual dom 添加事件,同样支持冒泡,所有的事件都自动绑定到最外层
// 尽量不要混用 合成事件 和 原生事件
class Demo extends Component {
  componentDidMount() {
    this.refs.button.addEventListener('click',() =>{
         //  绑定原生事件
    })
  }
  componentWillUnmount() {
    this.refs.button.removeEventListener('click',() =>{
         //  使用原生事件,一定要在组件卸载时手动移除,否则很可能出现内存泄露
    })
  }
  render() {
    return <button ref='button'></button>
  } 
}


// 前端架构
MVC // 一个view对应一个model,model的任何改变会应用到view中，view的操作通过controller应用到model中
// view对应js中的模板引擎。view是model的可视化。用户可以与view交互，读取或编辑model
// 问题：项目越大，逻辑越复杂，view和model越来越多。
MVVM 
// ViewModel取代了Controller。关键是 数据绑定 view的数据状态发生可以直接影响VM，反之亦然
Flux  
// Flux不是库,也不是框架,而是一种架构思想。其核心是单向数据流。
// 在flux中,数据从action 到dispatcher,再到store,再到view的路线是不可逆的 
Redux 
// 原则一
// 单一数据源，MVC中需要N个model,model直接可以互相监听,触发事件。这些在redux中是不允许的
// 使用单一数据源的好处是 整个应用的状态 都保存在一个对象中。
// 我们可以随时提取出 整个应用的状态 进行持久化。此外,这也为服务端渲染提供了可能
// 数据源过去判断的问题,可以通过Redux的工具函数combineReducers来解决

// 原则二
// 状态是只读的
// 我们定义一个reducer,根据当前触发的action对应用当前的状态进行迭代,并返回一个新的状态。而不是进行修改

// 原则三
// 状态修改由纯函数完成
// 每一个reducer都是一个纯函数。同样的输入得到同样的输出。使状态的修改变得简单，可测试。





// 表单
// 受控组件,每当表单状态发生变化,都会被写入到组件的state中,这种组件成为受控组件
// 表单初始值来自state,即单向数据绑定,通过onChange事件,将新的表单数据传回state,完成双向数据绑定
// 这也意味着我们在setState之前,可以对表单进行清洗和校验
// inputHandler:function(name,e){
//   var {value} = e.target
//     switch(name){
//       case 'user':
//         value = value.substring(0,5).toUpperCase()
//         break;
//       case 'age':
//         value =  isNaN(value) ? 0 : Number(value);
//         break;
//     }
//   this.setState({
//       [name]:value
//   })
// },
<input type="text" value={user} onChange={this.inputHandler.bind(this,'user')} />
<input type="text" value={age} onChange={this.inputHandler.bind(this,'age')} 
// 非受控表单  使用 defaultValue 和 defaultChecked 来表示
// 非受控组件的状态 不会受到 应用状态 的控制
<form onSubmit={this.handleSubmit}>
  <input type="text" ref='name' defaultValue='hangzhou'/>
  <button type='submit'>submit</button>
</form>
// handleSubmit:function(e){
//   e.preventDefault()
//   const {value} = this.refs.name;  // 拿值
//   console.log(value);
// }


// style
{ width:10 }  // 自动添加px
// 使用classnames库











react将数组中的每一项渲染为一个子节点
var text = ['apple',' ','juice'];
//<div>{text}</div>  

// this.props.children  它表示组件的所有子节点
// 设置组件属性默认值
//因为这个方法在实例初始化之前调用，所以在这个方法里面不能依赖 this 获取到这个组件的实例。
getDefaultProps()   //在组件装载之后，这个方法缓存的结果会用来保证访问 this.props 的属性时

// PropTypes，就是用来验证组件实例的属性是否符合要求
MyComponent.propTypes = {
  optionalArray: React.PropTypes.array,
  optionalBool: React.PropTypes.bool,
  optionalFunc: React.PropTypes.func,
  optionalNumber: React.PropTypes.number,
  optionalObject: React.PropTypes.object,
  optionalString: React.PropTypes.string,
  optionalSymbol: React.PropTypes.symbol
}

// 获取真实的DOM节点
//In most cases, you can attach a ref to the DOM node and avoid using findDOMNode at all
this.refs.name
//如果 ref 是设置在原生 HTML 元素上，它拿到的就是 DOM 元素，
//如果设置在组件上，拿到的就是组件实例，这时候就需要通过 findDOMNode 拿到组件的 DOM 元素。
ReactDOM.findDOMNode()  
componentDidMount() {
  const el = ReactDOM.findDOMNode(this);
}
// Refs 是访问到组件内部 DOM 节点唯一可靠的方法
// Refs 会自动销毁对子组件的引用（当子组件删除时）
 不要在 render 或者 render 之前访问 refs


// 更新表单 onChange事件  
// this.state
getInitialState: function() {
	return {liked: false};
}

// 组件生命周期
componentWillMount()
componentDidMount()    // 在这里请求数据,成功后setState刷新UI
componentWillUpdate(object nextProps, object nextState)
componentDidUpdate(object prevProps, object prevState)
componentWillUnmount()    // 记得解除原生事件的监听。合成事件会自动销毁
shouldComponentUpdate()   // return boolean 确定是否要更新,做性能优化使用
componentWillReceiveProps()  //将要收到props,第一次render时不会触发

合成事件
// “合成事件”会以事件委托（event delegation）的方式绑定到组件最上层，
// 并且在组件卸载（unmount）的时候自动销毁绑定的事件。

原生事件
// 比如你在 componentDidMount 方法里面通过 addEventListener 绑定的事件就是浏览器原生事件。
// 使用原生事件的时候注意在 componentWillUnmount 解除绑定 removeEventListener。
// 所有通过 JSX 这种方式绑定的事件都是绑定到“合成事件”，
// 除非你有特别的理由，建议总是用 React 的方式处理事件。

参数传递
return <p onClick={this.handleClick.bind(this, 'extra param')} />;

Mixin 
// 虽然组件的原则就是模块化，彼此之间相互独立，
// 但是有时候不同的组件之间可能会共用一些功能，共享一部分代码。
// 所以 React 提供了 mixins 这种方式来处理这种问题。
var TickTock = React.createClass({
    mixins: [SetIntervalMixin], // Use the mixin
})





// 所有组件类都必须有自己的 render 方法，用于输出组件。
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});

// 模板插入 <HelloMessage /> 时，会自动生成 HelloMessage 的一个实例
ReactDOM.render(
  <HelloMessage name="John" />,
  document.getElementById('example')
);


// this.props.children  它表示组件的所有子节点
var NotesList = React.createClass({
  render: function() {
    return (
      <ol>
      {
        React.Children.map(this.props.children, function (child) {
          return <li>{child}</li>;
        })
      }
      </ol>
    );
  }
});

ReactDOM.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.body
);

// PropTypes，就是用来验证组件实例的属性是否符合要求
var MyTitle = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
  },

  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});

var data = 123;

ReactDOM.render(
  <MyTitle title={data} />,
  document.body
);

// getDefaultProps 设置组件属性默认值
var MyTitle = React.createClass({
  getDefaultProps : function () {
    return {
      title : 'Hello World'
    };
  },

  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});

ReactDOM.render(
  <MyTitle />,
  document.body
);



// 获取真实的DOM节点
this.refs.xxx



// 组件生命周期
componentWillMount()
componentDidMount()    // 在这里请求数据,成功后setState刷新UI
componentWillUpdate(object nextProps, object nextState)
componentDidUpdate(object prevProps, object prevState)
componentWillUnmount()
shouldComponentUpdate()   // return boolean 确定是否要更新



// redux

// rducer




















aa.enable('a',{color:['red','green']})
aa.enable('b',{color:['blue']})


var tom = (function(){
	function a(t){
		console.log(t)
	}
	function say(t){
		document.addEventListener('mousedown',function(){
			a(t)
		});
	}
	function shutUp(){
		document.addEventListener('mousedown',howToWriteHere);
	}
	return {
		say:say,
		shutUp:shutUp
	}
})()

﻿

//History API 提供了 pushState() 和 replaceState() 方法来增加或替换历史记录。
//而 hash 没有相应的方法，所以并没有替换历史记录的功能。
//但 react-router 通过 polyfill 实现了此功能，具体实现没有看，好像是使用 sessionStorage。

//另一个原因是 hash 部分并不会被浏览器发送到服务端，
//也就是说不管是请求 http://domain.com/index.html#foo 还是 http://domain.com/index.html#bar ，
//服务只知道请求了 index.html 并不知道 hash 部分的细节。
//而 History API 需要服务端支持，这样服务端能获取请求细节。

//还有一个原因是因为有些应该会忽略 URL 中的 hash 部分，记得之前将 URL 使用微信分享时会丢失 hash 部分。



// 前端架构
MVC // 一个view对应一个model,model的任何改变会应用到view中，view的操作通过controller应用到model中
// view对应js中的模板引擎。view是model的可视化。用户可以与view交互，读取或编辑model
// 问题：项目越大，逻辑越复杂，view和model越来越多。
MVVM 
// ViewModel取代了Controller。关键是 数据绑定 view的数据状态发生可以直接影响VM，反之亦然
Flux  
// Flux不是库,也不是框架,而是一种架构思想。其核心是单向数据流。
// 在flux中,数据从action 到dispatcher,再到store,再到view的路线是不可逆的 
// 缺点：太过松散，哪里发请求,如何处理异步流
Redux 
// Redux 是一个可预测的状态容器
// 原则一
// 单一数据源，MVC中需要N个model,model直接可以互相监听,触发事件。这些在redux中是不允许的
// 使用单一数据源的好处是 整个应用的状态 都保存在一个对象中。
// 我们可以随时提取出 整个应用的状态 进行持久化。此外,这也为服务端渲染提供了可能
// 数据源过去判断的问题,可以通过Redux的工具函数combineReducers来解决

// 原则二
// 状态是只读的
// 我们定义一个reducer,根据当前触发的action对应用当前的状态进行迭代,并返回一个新的状态。而不是进行修改

// 原则三
// 状态修改由纯函数完成
// 每一个reducer都是一个纯函数。同样的输入得到同样的输出。使状态的修改变得简单，可测试。


React拆分成React 和ReactDOM 的好处
// 一个类库在核心逻辑上 和 平台实现 两个层面上进行拆分,保证了核心功能的最大程度跨平台复用
react-redux
// react-redux 提供了一个组件和一个api帮助react 和 redux 进行绑定。
// 组件是<Provider/>  接受一个store作为props
// API 是 connect()   提供了任意组件中获取store数据的功能

// Redux
// Redux 是一个有用的架构，但不是非用不可。事实上，大多数情况，你可以不用它，只用 React 就够了。
// "如果你不知道是否需要 Redux，那就是不需要它。"
// "只有遇到 React 实在解决不了的问题，你才需要 Redux 。"

// 基本概念
Store    // 保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
State    // Store对象包含所有数据。某个时点的数据集合，就叫做 State。
// store 的 四个方法
store.getState()  // 获取当前时刻的 State   
store.dispatch()  // 分发一个action
store.subscribe() // 注册一个监听
store.replaceReducer(nextReducer)  // 更新当前store里的reducer 一般开发时使用
// Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。
// 你知道 State，就知道 View 是什么样，反之亦然。
Action  // State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。
// 所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。
// Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置
const action = {
    type: 'ADD_TODO',
    payload: 'Learn Redux'
};
Action Creator    // Action的函数生成器
store.dispatch()  // View 发出 Action 的唯一方法
store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});

Reducer  // Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。
// 这种 State 的计算过程就叫做 Reducer。
// Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。
const reducer = function (state, action) {
  // ...
  return new_state;
};

combineReducers  //你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。
import { combineReducers } from 'redux';
const chatReducer = combineReducers({
  chatLog,
  statusMessage,
  userName
})
// 返回一个state对象


// 实际应用中，Reducer 函数不用像上面这样手动调用，store.dispatch方法会触发 Reducer 的自动执行。
// 为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。
// createStore方法还可以接受第二个参数，表示 State 的最初状态。这通常是服务器给出的。
// 如果提供了这个参数，它会覆盖 Reducer 函数的默认初始值。
import { createStore } from 'redux';
const store = createStore(reducer, window.STATE_FROM_SERVER);

// Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。
// 由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。
// 但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象

store.subscribe(listener); // Store允许使用store.subscribe设置监听,一旦State发生变化,就自动执行这个函数
// 显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen,
// 就会实现 View 的自动渲染。
// store.subscribe方法返回一个函数，调用这个函数就可以解除监听。
var unsubscribe = store.subscribe(listener);
unsubscribe()  // 解除监听


// 服务端渲染
// SPA首屏加载太慢,导致白屏。react的解决方案就是服务端渲染

// 优势
// 利于SEO，可以让搜索引擎更容易抓取页面的meta信息以及其他SEO信息
// 加速渲染 用户首次打开时，已经是渲染好的页面，打开速度更快
// 服务端和客户端共享某些代码，避免重复定义




// 什么是路由
// 在web开发中，'route'是指根据url分配到对应的处理程序。

react-router4
// 那么 react-router 和react-router-dom 是不是两个都要引用呢？
// 不同之处就是后者比前者多出了 <Link> <BrowserRouter> 这样的 DOM 类组件。
// 因此我们只需引用 react-router-dom 这个包就行了。
// 当然，如果搭配 redux ，你还需要使用 react-router-redux。

<BrowserRouter>
// A <Router> that uses the HTML5 history API (pushState, replaceState and the popstate event) 
// to keep your UI in sync with the URL.

// 作用：为所有位置添加一个基准URL
// 使用场景：假如你需要把页面部署到服务器的二级目录，你可以使用 basename 设置到此目录
<BrowserRouter basename="/minooo" />

// 作用：导航到此页面前执行的函数，默认使用 window.confirm
// 使用场景：当需要用户进入页面前执行什么操作时可用，不过一般用到的不多
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}
<BrowserRouter getUserConfirmation={getConfirmation('Are you sure?', yourCallBack)} />

// 如果为true,则强制刷新页面,可能只有在不支持H5的浏览器中使用
<BrowserRouter forceRefresh={!supportsHistory} />

// keyLength: number  The length of location.key. Defaults to 6.
<BrowserRouter keyLength={12}/>


<HashRouter>
// A <Router> that uses the hash portion of the URL (i.e. window.location.hash) 
// to keep your UI in sync with the URL.

// Route 的三种渲染方法
<Route component>
<Route render>
<Route children>

// children渲染的元素不会被替换,render渲染出的元素会被替换掉
<Route exact path={match.url} children={() => (<h3>halo</h3>)}/>


// 三种方法都接受三个参数
match
//{"match":{"path":"/topic/:topicId","url":"/topic/react","isExact":true,"params":{"topicId":"react"}}}
match.path // 就是Route里定义的path,可能带有参数
match.url  // 当前的url
match.params // 路径参数

location
//{"pathname":"/topics/rendering","search":"","hash":"","key":"uw98jh"}
history
//{"length":42,"action":"PUSH","location":{"pathname":"/topics/rendering","search":"","hash":"","key":"uw98jh"}}

// example
<Route path="/user/:username" component={User}/>
const User = ({ match }) => {   // 组件里拿到了match参数
  return <h1>Hello {match.params.username}!</h1>
}
// exact: bool 如果为 true，path 为 '/one' 的路由将不能匹配 '/one/two'，反之，亦然。
// strict: bool 如果为 true。path 为 '/one/' 将不能匹配 '/one' 但可以匹配 '/one/two'。
<Route exact strict path="/one" component={One}/>

<Link>
// to:string  作用：跳转到指定路径
<Link to="/courses" />  
// to:object  作用：携带参数跳转到指定路径
<Link to={ {pathname: '/course',search: '?sort=name',state: { price: 18 }} } />


<NavLink>
// activeClassName: string  导航选中激活时候应用的样式名，默认样式名为 active
<NavLink to="/about" activeClassName="selected">MyBlog</NavLink>
// activeStyle: object  如果不想使用样式名就直接写style
<NavLink to="/about" activeStyle={{ color: 'green', fontWeight: 'bold' }}>MyBlog</NavLink>

// exact 若为 true，只有当访问地址严格匹配时激活样式才会应用
// 若为 true，只有当访问地址后缀斜杠严格匹配（有或无）时激活样式才会应用
// isActive A function to add extra logic for determining whether the link is active.
<NavLink exact strict  isActive={func} to="/profile">Profile</NavLink>

<Switch>
// 只渲染出第一个与当前访问地址匹配的 <Route> 或 <Redirect>。
// 思考如下代码，如果你访问 /about，那么组件 About User Nomatch 都将被渲染出来，
// 因为他们对应的路由与访问的地址 /about 匹配。
// 这显然不是我们想要的，我们只想渲染出第一个匹配的路由就可以了，于是 <Switch> 应运而生！
<Route path="/about" component={About}/>
<Route path="/:user" component={User}/>
<Route component={NoMatch}/>



// 组件的生命周期
// componentWillMount 和 componentDidMount 都只会在组件初始化时运行一次
componentWillMount() {
    // 在这里调用setSate 组件会更新state,但组件只渲染一次。
    // 初始化时的state都可以放在this.state
}

componentDidMount() {
    // 在这里调用setSate 组件会再次更新state,组件将渲染两次,这并不是什么好事。
}

componentWillUnmount() {
    // 组件卸载时,我们常常执行一些清理方法,如事件回收或是清楚定时器 
}

componentWillReceiveProps(nextProps) {
    // 如果组件是由父组件更新props而更新的,那么会先执行此方法
    // 这里是setState的机会
}

shouldComponentUpdate(nextProps, nextState) {
    // 不用在这里setState,否则无限循环
}

componentWillUpdate(nextProps, nextState) {
    // 不用在这里setState,否则无限循环
}

componentDidUpdate(prevProps, prevState) {
  
}

// redux
// react 的 缺陷
// 两个子组件如何相互通信,共享数据？  将共享数据作为父组件的state,作为props分发给子组件 
// 子组件改变父组件的state ？ 父组件设置回调函数,作为props传给子组件

// 为了所有可能的扩展问题，最容易想到的办法是把所有state集中放到所有组件顶层，然后分发给所有组件。
// 为了有更好的state管理，就需要一个库来作为更专业的顶层state分发给所有React应用，这就是Redux。

action  // 是纯声明式的数据结构，只提供事件的所有要素，不提供逻辑。
reducer // 是一个匹配函数，action的发送是全局的：所有的reducer都可以捕捉到并匹配与自己相关与否，
// 相关就拿走action中的要素进行逻辑处理，修改store中的状态，不相关就不对state做处理原样返回。
store  // store是一个Object,负责存储状态 
state  // 当前的状态  Object类型
Provider  // 作为顶层app的分发点，它只需要store属性就可以了。它会将state分发给所有被connect的组件
connect   // 是真正的重点，它是一个科里化函数,先绑定数据,再绑定组件

// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])(MyComponent)
// 设置参数,绑定组件。connect 函数不会修改传入的 React 组件,而是返回一个新的组件
mapStateToProps(state, [ownProps]) 
// 函数,返回一个对象。store更新时,将被调用.
// If you don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps
// ownProps 可选 如果有 将被当做参数传入组件
ownProps 是指组件自身的props
mapDispatchToProps(dispatch, [ownProps])
// 函数/对象 If an object is passed, each function inside it is assumed to be a Redux action creator. 
// If a function is passed, it will be given dispatch
mergeProps(stateProps, dispatchProps, ownProps)
// 函数 
// If you omit it, Object.assign({}, ownProps, stateProps, dispatchProps) is used by default.
options
// 对象 可选

combineReducers(reducers)
// 随着应用变得复杂，需要对 reducer 函数 进行拆分，拆分后的每一块独立负责管理 state 的一部分。
// 返回一个 function。 最终生成一个state对象,每个reducer是state的一个属性
