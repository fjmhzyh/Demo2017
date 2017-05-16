
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
PureRender   // this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)

