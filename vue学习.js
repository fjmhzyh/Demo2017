
// vue cli 用法
vue   // 查看可用命令





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