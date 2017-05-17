
// vue cli 用法
vue   // 查看可用命令




// vue
Vue.js 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。
Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。


// 浏览器支持
Vue IE8+   // if(document.all){ alert('请更新您的浏览器')}  //  <!--[if lt IE 9]>  <![endif]-->


// React 和 Vue 应用场景
小项目中,更多的是开发风格的偏好。vue灵活性更好
大项目中,React+Flux架构更能胜任


// React 和 Vue 有许多相似之处
使用 Virtual DOM
提供了响应式（Reactive）和组件化（Composable）的视图组件。
将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库。


// react 优化
在 React 应用中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。如要避免不必要的
子组件的重渲染，你需要在所有可能的地方使用 PureComponent，或是手动实现 shouldComponentUpdate 方法。
同时你可能会需要使用不可变的数据结构来使得你的组件更容易被优化。

// vue 优化
在 Vue 应用中，组件的依赖是在渲染过程中自动追踪的，所以系统能精确知晓哪个组件确实需要被重渲染。
你可以理解为每一个组件都已经自动获得了 shouldComponentUpdate

Vue 的这个特点使得开发者不再需要考虑此类优化，从而能够更好地专注于应用本身。

// 性能
然而，假如你要开发一个对性能要求比较高的数据可视化或者动画的应用时，
你需要了解到下面这点：在开发中，Vue 每秒最高处理 10 帧，而 React 每秒最高处理不到 1 帧。


// JSX vs Templates
在 React 中，一切都是 JavaScript。不仅仅是 HTML 可以用 JSX 来表达。
现在的潮流也越来越多地将 CSS 也纳入到 JavaScript 中来处理。

事实上 Vue 也提供了渲染函数 ，甚至支持 JSX。然而，我们默认推荐的还是模板。
任何合乎规范的 HTML 都是合法的 Vue 模板。在底层的实现上， Vue 将模板编译成虚拟 DOM 渲染函数。
结合响应系统，在应用状态改变时，Vue 能够智能地计算出重新渲染组件的最小代价并应用到 DOM 操作上。


// css 组件作用域
<style scoped>
    @media (min-width: 250px) {
        .list-container:hover {
            background: orange;
        }
    }
</style> /

 这个可选 scoped 属性会自动添加一个唯一的属性（比如 data-v-21e5b78）为组件内 CSS 指定作用域，
 编译的时候 .list-container:hover 会被编译成类似 .list-container[data-v-21e5b78]:hover。



// 响应式原理
Vue 最显著的特性之一便是不太引人注意的响应式系统(reactivity system)。
模型层(model)只是普通 JavaScript 对象，修改它则更新视图(view)。这会让状态管理变得非常简单且直观

把一个普通 JavaScript 对象传给 Vue 实例的 data 选项，Vue 将遍历此对象所有的属性，
并使用 Object.defineProperty 把这些属性全部转为 getter/setter。
Object.defineProperty 是仅 ES5 支持，且无法 shim 的特性，
这也就是为什么 Vue 不支持 IE8 以及更低版本浏览器的原因。


由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在
才能让 Vue 转换它，这样才能让它是响应的。
var vm = new Vue({
  data:{
  a:1
  }
})
vm.a = 5     // `vm.a` 是响应的
vm.b = 2     // `vm.b` 是非响应的


Vue 不允许在已经创建的实例上动态添加新的根级响应式属性(root-level reactive property)。
然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上
还可以使用 vm.$set 实例方法，这也是全局 Vue.set 方法的别名：

Vue.set(vm.someObject, 'b', 2)
this.$set(this.someObject,'b',2)


// 异步更新队列
Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。

当你设置 vm.someData = 'new value' ，该组件不会立即重新渲染。
当刷新队列时，组件会在事件循环队列清空时的下一个“tick”更新。

如果你想在 DOM 状态更新后做点什么，可以在数据变化之后立即使用 Vue.nextTick(callback) 。
这样回调函数在 DOM 更新完成后就会调用。


// React中的 setState 不会立即更新数据 
当执行setState时，会将需要更新的state合并放入状态队列，而不会立即更新this.state



// vue 组件通信
组件之间的数据传递，vue 和 react 一样 默认是 单向的
props  // 父组件向子组件通信    props down
$emit  // 父组件向子组件通信    events up
$emit  // 非父子组件通信    $emit(events)  $on(events)  复杂情况下考虑VUEX


// 子组件索引
使用 ref 为子组件指定一个索引 ID 
<div id="parent">
  <user-profile ref="profile"></user-profile>
</div>
var child = parent.$refs.profile


// 单向数据流
prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。
这是为了防止子组件无意修改了父组件的状态——这会让应用的数据流难以理解。

不应该在子组件内部改变 prop 。如果你这么做了，Vue 会在控制台给出警告。
解决方案: 1.data中返回一个变量   2.计算属性


// 表单的 双向数据绑定   
// 表单的双向数据绑定 本质是 单向绑定 + onChange事件监听
v-model  // 在表单控件元素上创建双向数据绑定   // <input> <select> <textarea> components



// vue  指令
v-bind  // 绑定属性,冒号后接受一个事件参数   v-bind:title="message"  :title="message"  缩写
v-on    // 绑定事件,冒号后接受一个事件参数   v-on:click="clickHandler"   @click 缩写





// vue 组件
基本的封装性 -- 简单的生命周期的呈现 -- 明确的数据流动

// vue 生命周期

beforeCreate > created > beforeMount > mounted > beforeUpdate > updated > beforeDestroy > destroyed 


vm.$nextTick()
// 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
// 它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。

vm.$destroy()
// 完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
// 触发 beforeDestroy 和 destroyed 的钩子。




// vue 引入第三方js库
// 入口文件
import moment from 'moment';
Object.definePrototype(Vue.prototype, '$moment', { value: moment });
// Object.defineProperty能保护引入的库不被重新赋值
// $表示这些属性是公有的，你可以在任何地方使用。比如$refs， $on， $mount。

// this指向  现在你可以使用his.$libraryName的方式来访问你需要的库了。但要保证在函数内部this指向vue
// 箭头函数是很好的选择


// prop 传递  v-bind


// 变量检测问题
Vue 不能检测到对象属性的添加或删除。

由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，
所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。

data里面定义的变量都是响应式的

Vue.set(vm.someObject, 'b', 2)     // 将响应属性添加到嵌套的对象上
this.$set(this.someObject,'b',2)   // 将响应属性添加到嵌套的对象上


// props 传递数据   当传递的props不是字符串,注意不要用 驼峰式  
组件实例的作用域是孤立的。这意味着不能(也不应该)在子组件的模板内直接引用父组件的数据。
要让子组件使用父组件的数据，我们需要通过子组件的props选项。

<child my-message="hello!"></child>  // 注意不要用 驼峰式  
<child :my-message="['a','b','c','d']"></child>   // 传递一个数组  这里要用v-bind才能出来
<child :my-message="{a:1}"></child>   // 传递一个对象  这里要用v-bind才能出来

// 动态的 props
在模板中，要动态绑定父组件的数据到子模板的props，必须用 v-bind。
当父组件的数据变化时，该变化也会传给子组件
<child v-bind:my-message="parentMsg"></child>   // 注意不要用 驼峰式  


// 传过程分析
假设 parentMsg 是一个异步获取的对象， 那么一开始传递给子组件的 my-message 则是一个空对象