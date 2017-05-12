// vue 引入第三方js库
// 入口文件
import moment from 'moment';
Object.definePrototype(Vue.prototype, '$moment', { value: moment });
// Object.defineProperty能保护引入的库不被重新赋值
// $表示这些属性是公有的，你可以在任何地方使用。比如$refs， $on， $mount。

// this指向  现在你可以使用his.$libraryName的方式来访问你需要的库了。但要保证在函数内部this指向vue
// 箭头函数是很好的选择

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