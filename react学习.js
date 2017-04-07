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

JSX 将 { } 中的内容渲染为动态内容

// 属性的设置
<div id={this.state.id}></div>   变量 /
<div id={ this.getId() }></div>   函数 /
<div className={ this.state.isCompleted ? 'completed' : ''}></div>   三目运算  /
<div className={ if(this.state.isCompleted){'completed'} }></div>   判断  /

// 非DOM属性
key // key是可选的唯一标示符,可以提高渲染效率
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


// state
state只关心每个组件自己内部的状态,这些状态只能在组件内部改变。
setState()  // setState() 是一个异步方法,一个生命周期内的setState()方法会合并操作



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


// 表单
// 受控组件,每当表单状态发生变化,都会被写入到组件的state中,这种组件成为受控组件
// 表单初始值来自state,即单向数据绑定,通过onChange事件,将新的表单数据传回state,完成双向数据绑定
// 这也意味着我们在setState之前,可以对表单进行清洗和校验
inputHandler:function(name,e){
  var {value} = e.target
    switch(name){
      case 'user':
        value = value.substring(0,5).toUpperCase()
        break;
      case 'age':
        value =  isNaN(value) ? 0 : Number(value);
        break;
    }
  this.setState({
      [name]:value
  })
},
<input type="text" value={user} onChange={this.inputHandler.bind(this,'user')} />
<input type="text" value={age} onChange={this.inputHandler.bind(this,'age')} 
// 非受控表单  使用 defaultValue 和 defaultChecked 来表示
// 非受控组件的状态 不会受到 应用状态 的控制
<form onSubmit={this.handleSubmit}>
  <input type="text" ref='name' defaultValue='hangzhou'/>
  <button type='submit'>submit</button>
</form>
handleSubmit:function(e){
  e.preventDefault()
  const {value} = this.refs.name;  // 拿值
  console.log(value);
},



// style
{ width:10 }  // 自动添加px
// 使用classname库





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
componentWillUnmount()
shouldComponentUpdate()   // return boolean 确定是否要更新
componentWillReceiveProps()  //将要收到props

合成事件
// “合成事件”会以事件委托（event delegation）的方式绑定到组件最上层，
// 并且在组件卸载（unmount）的时候自动销毁绑定的事件。

原生事件
// 比如你在 componentDidMount 方法里面通过 addEventListener 绑定的事件就是浏览器原生事件。
// 使用原生事件的时候注意在 componentWillUnmount 解除绑定 removeEventListener。
// 所有通过 JSX 这种方式绑定的事件都是绑定到“合成事件”，
// 除非你有特别的理由，建议总是用 React 的方式处理事件。

参数传递
return <p onClick={this.handleClick.bind(this, 'extra param')}>;

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


// react-router

//Router  Route path  component
<Router history={hashHistory}>
  <Route path="/" component={App}/>
  <Route path="/repos" component={Repos}/>
  <Route path="/about" component={About}/>
</Router>

// Link to  activeStyle  activeClassName
<ul role="nav">
  <li><Link to="/about" activeClassName="active" >About</Link></li>
  <li><Link to="/repos" activeStyle={{ color: 'red' }} >Repos</Link></li>
</ul>

// 首页
<IndexRoute component={Home}/>


// 嵌入式路由 页面共享
<Router history={hashHistory}>
  <Route path="/" component={App}>
    {/* make them children of `App` */}
    <Route path="/repos" component={Repos}/>
    <Route path="/about" component={About}/>
  </Route>
</Router>

<div>
  <h1>React Router Tutorial</h1>
  <ul role="nav">
    <li><Link to="/about">About</Link></li>
    <li><Link to="/repos">Repos</Link></li>
  </ul>
  {this.props.children}
</div>


//  history={browserHistory}
hashHistory     // 开发环境
browserHistory  // 真实的url

//首先 browserHistory 其实使用的是 HTML5 的 History API，浏览器提供相应的接口来修改浏览器的历史记录；
//而 hashHistory 是通过改变地址后面的 hash 来改变浏览器的历史记录；

//History API 提供了 pushState() 和 replaceState() 方法来增加或替换历史记录。
//而 hash 没有相应的方法，所以并没有替换历史记录的功能。
//但 react-router 通过 polyfill 实现了此功能，具体实现没有看，好像是使用 sessionStorage。

//另一个原因是 hash 部分并不会被浏览器发送到服务端，
//也就是说不管是请求 http://domain.com/index.html#foo 还是 http://domain.com/index.html#bar ，
//服务只知道请求了 index.html 并不知道 hash 部分的细节。
//而 History API 需要服务端支持，这样服务端能获取请求细节。

//还有一个原因是因为有些应该会忽略 URL 中的 hash 部分，记得之前将 URL 使用微信分享时会丢失 hash 部分。








// Redux
// Redux 是一个有用的架构，但不是非用不可。事实上，大多数情况，你可以不用它，只用 React 就够了。
// "如果你不知道是否需要 Redux，那就是不需要它。"
// "只有遇到 React 实在解决不了的问题，你才需要 Redux 。"

// 基本概念
Store    // 保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
State    // Store对象包含所有数据。某个时点的数据集合，就叫做 State。
store.getState()  // 获取当前时刻的 State
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


