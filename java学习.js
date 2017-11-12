

// 类名 和 常量名 通常大写



// 数组
int [] arr;		// 申明数组		数据类型[ ] 数组名；
int [] arr = new int[5];		// 分配空间 指定长度
int [] arr = {1,2,3,4,5};		// 申明数组 + 分配空间 + 赋值;


// foreach
for( int  num : nums ){
     System.out.println(num);
}


// 返回值  必须申明返回值类型
public int add(a,b){
	return a+b;
}


// 方法的重载
当调用被重载的方法时， Java 会根据参数的个数和类型来判断应该调用
哪个重载方法，参数完全匹配的方法将被执行。



// 数据类型    java中有 8种 基本类型 primitive type

	// 四种整型 	  int short long byte 
	int 最常用 范围-20亿到20亿
	long  超过20亿

	// 两种浮点类型	  float double
	double 	最常用  精度是float的两倍

	// char类型  用于表示单个字符   强烈建议不要使用

	// boolean  true/false



// 变量   在java中每个变量都有一个类型。必须以字母开头。尽量在靠近变量第一次使用的地方申明
 
	// 变量初始化--赋值  千万不要使用未初始化的变量--否者报错   JS则会返回undefined 
	int age;
	System.out.println(age);  // error-variable not initialized


// 常量   final  全部大写
final INCH = 2.54;


// 自动类型转换  需要满足特定的条件 
// 如 double 型兼容 int 型，但是 char 型不能兼容 int 型  long int short byte
int score1 = 82;
double score2 = score1;

// 强制类型转换  强制类型转换可能会造成数据的丢失
// int 型的存储范围比 double 型的小。此时就需要通过强制类型转换来实现了。
double n1 = 7.8;
int n2 = (int)n1;



// 字符串   要用双引号
Strig text = "hello";
a.equals(b)   		  // 比较字符串是否相等
a.equalsIgnoreCase(b) // 比较字符串是否相等并忽略大小写
a.substring(0,3)	  // 字符串截取
a.length()   		  // 字符串长度
if(a != null && a.length() != 0)    // 判断既不是null也不是空



// 标准输入/输出流
System.in
System.out


// 文件输入和输出
Scanner in = new Scanner(Path.get("a.txt"),"UTF-8")  	  // in
Scanner in = new PrintWriter(Path.get("a.txt"),"UTF-8")   // out



// 数组 用来存储同一类型的值   数组的长度可以是变量   数组长度无法改变

	int [] a = {1,2,3,4,5}   	// 这种方式不需要new
	int [] {1,2,3,4,5}   		// 匿名数组

	int [] a = new int[6];   				// 数字数组的元素默认值为0
	float [] a = new float[6];   			// float和double默认值为0.0
	boolean [] arr = new boolean[score];	// 默认值为false
	String [] arr = new String[score];		// 默认值null


	// foreach 循环
	for( int ele:a){
		System.out.println(ele);
	}


	// 浅拷贝 和 深拷贝
	int [] b = a;    // 浅拷贝
	int [] b = Arrays.copyOf(a,a.length);    // 浅拷贝


	// 常用方法
	Arrays.toString(a);		// 打印数组
	Arrays.sort(a);			// 排序
	Arrays.fill(a,5);		// 填充数组每一项
	Arrays.equals(a,b);		// 比较数组内容是否相同



// Date 和 localDate
LocalDate t = LocalDate.now();   // 2017-10-01

LocalDate time = LocalDate.of(1900,12,31); 
time.getYear();
time.getMonthValue();
time.getDayOfMonth();




// 面向对象

	// 成员变量
	在类中定义
	具有初始值

	// 局部变量
	在类的方法中定义，保存临时数据
	没有初始值


	// 构造方法	  如果没有定义，系统会自动生成一个无参的构造方法
	子类的构造过程中，必须调用父类的构造方法
	如果子类没有调用，则系统默认调用父类无参构造方法
	如果显式调用，则必须在子类构造方法第一行


	// static 静态成员 -- JS的原型链，被所有对象共享
	静态方法中可以直接调用同类中的静态成员，但不能直接调用非静态成员
	如果希望在静态方法中调用非静态变量，可以通过创建类的对象，然后通过对象来访问非静态变量。

	在普通成员方法中，则可以直接访问同类的非静态变量和静态变量

	静态方法中不能直接调用非静态方法，需要通过对象来访问非静态方法



	// 封装
	只能通过规定的方法来访问数据
	隐藏类的实现细节，方便修改和实现

	// 封装实现步骤
	private关键字
	getter / setter 方法 


	// 包
	管理java文件
	解决类名冲突


	// 访问修饰符
	private  	// 只能在本类中访问 		无法继承
	默认   		// 本类 / 同包 可以访问
	protected 	// 本类 / 同包 / 子类 可以访问
	public 		// 在所有地方访问

	一般属性使用private修饰  方法使用public


	// this 关键字   指向当前对象


	// final 关键字
	修饰类  	则类无法被继承
	修饰方法 	方法不允许被覆盖
	修饰属性	属性无法修改




// Object 类  所有类的父类
如果一个类没有使用extends，则默认继承Object

Object.toString()  // 返回对象哈希码，对象的地址
Object.equals()    // 对象的引用是否指向同一块地址



// 抽象类 abstract
规定子类必须实现某些方法，但不关心子类如何实现



// 接口 interface   接口都是 abstract 的。通常不写，系统自动加
定义的属性都是常量   系统会自动加上 public static final


// 一个类可以实现多个接口    implements
class Dog extends Animal implements interface1 interface2
