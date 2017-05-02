// vue 引入第三方js库
// 入口文件
import moment from 'moment';
Object.definePrototype(Vue.prototype, '$moment', { value: moment });
// Object.defineProperty能保护引入的库不被重新赋值
// $表示这些属性是公有的，你可以在任何地方使用。比如$refs， $on， $mount。

// this指向  现在你可以使用his.$libraryName的方式来访问你需要的库了。但要保证在函数内部this指向vue
// 箭头函数是很好的选择


