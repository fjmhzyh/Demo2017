
// wampserver 配置
安装之前一定要装 visual c 2013

httpd.config		  // apache的配置文件  里面的#是注释符号
httpd.vhosts.config   // 配置扩展文件  默认不加载

// 配置项目根目录
httpd.config 文件中修改 DocumentRoot 和 Directory 路径
httpd.vhosts.config 中 配置具体端口的目录


// 修改左键菜单中www目录
在wamp根文件夹中修改 wampmanager.ini 和 wampmanager.tpl 文件 


// 多站点配置
httpd.vhosts.config 中 配置具体项目端口和目录
httpd.config 文件中 加载 httpd.vhosts.config  去掉#号
将 require local 改为 Require all granted  允许所有访问

// 修改apache默认端口
httpd.config 中修改80为要改的端口  listen 和 servername

// 监听多端口
listen处添加需要监听的端口  Listen 888



// 常用函数
	print_r()  // 如果给出的是 string、integer 或 float，将打印变量值本身。
	// 如果给出的是 array，将会按照一定格式显示键和元素。object 与数组类似。
	// 记住，print_r() 将把数组的指针移到最后边。使用 reset() 可让指针回到开始处。

	var_dump() // 打印变量的相关信息  没有返回值。
	empty() // 检查一个变量是否为空  返回 FALSE/TRUE.
			// '',NULL,false,0,空数组,没赋值的变量, 被认为是空
	die('可以传值')  // 等同于 exit() 输出一个消息并且退出当前脚本。如果没有参数，可以省略括号



// PHP数据类型
Integer Float String Boolean Array Object Null resource

// 常量
define('NUM',100)	// 常量用大写字母,便于区分。常量,在全局可见。

// 超级全局变量
$GLOBALS  // 所有全局变量组成的数组   $GLOBALS['foo']
$_SERVER  // 是一个包含了诸如头信息(header)、路径(path)、脚本位置(script locations)等信息的数组
$_GET     // GET方法传递给该脚本的变量数组
$_POST    // POST方法传递给该脚本的变量数组
$_COOKIE  // COOKIE变量数组
$_SESSION // SESSION 变量数组
$_FILES   // 文件上传相关的变量数组
$_ENV	  // 环境变量数组
$_REQUEST // 包含了$_GET,$_POST ,$_COOKIE的内容

// 引用操作符
$a = 5;
$b = &$a; // $a和$b指向内存中的同一块地址,改变$a则改变$b


// 字符串
	// PHP允许我们在双引号串中直接包含字串变量。而单引号串中的内容总被认为是普通字符。
	$str='hello';
	echo "str is $str"; //运行结果: str is hello
	echo 'str is $str'; //运行结果: str is $str

	// 字符替换
	$str = '苹果很好吃。';
	$str = str_replace('苹果', '香蕉', $str);  // 把苹果换成香蕉

	// 去空格
	trim()  ltrim()  rtrim()

	// 字符串长度
	strlen($str); // 英文
	mb_strlen($str,"UTF8"); // 中文


	// 字符串截取
	substr($str, 2, 4);  // 英文 从下标2开始,取4个字符
	mb_substr($str, 4, 2, 'utf8');  // 中文 

	$str = implode('', $arr);   // js中的join(),数组转成字符串
	$arr = explode('',$str);	// js中的split(),字符串转数组


	// addslashes()  用于对特殊字符加上转义字符，返回一个字符串
	$str = "what's your name?";
	echo addslashes($str);//输出：what\'s your name?



// 数组  PHP有两种数组：索引数组、关联数组。
	$fruit = array("苹果","香蕉","菠萝");    // 索引数组

	// 索引数组
	$fruit = array(
	    'firstName'=>"super",
	    'lastName'=>"man",
	); 


	print_r($_POST);  // 打印数组 键值对

	// forEach 打印 数组键值对
	foreach($fruit as $key=>$value){
	    echo '<br>第'.$key.'值是：'.$value;
	}



// 函数   返回值默认为null
	function add($a,$b) {
	    return $a+$b;
	}
	// 返回语句会立即中止函数的运行，并且将控制权交回调用该函数的代码行

	// 函数不能返回多个值，但可以通过返回一个数组来得到类似的效果。
	function numbers() {
	    return array(1, 2, 3);
	}
	list ($one, $two, $three) = numbers();


// 时间
date_default_timezone_set("Asia/Shanghai"); //设置默认时区是中国

time()  // 返回当前的 Unix 时间戳
date("Y-m-d");	// 输出当前时间
date("Y-m-d",'1396193923');		// 格式化时间戳




// class
// 构造函数 每次实例化时候将被调用
// 在子类中如果定义了__construct则不会调用父类的__construct，
// 如果需要同时调用父类的构造函数，需要使用parent::__construct()显式的调用。
	class Car {
	   function __construct() {
	       print "构造函数被调用\n";
	   }
	}
	// 子类调用父类构造函数
	class Truck extends Car {
	   function __construct() {
	       print "子类构造函数被调用\n";
	       parent::__construct();
	   }
	}

	// 析构函数  指的是当某个对象的所有引用被删除，或者对象被显式的销毁时会执行的函数。
	class Car {
	   function __destruct() {
	       print "析构函数被调用 \n";
	   }
	}
	$car = new Car(); //实例化时会调用构造函数
	unset($car); //销毁时会调用析构函数


	//定义一个类
	class Car {
		// 类的属性必须定义 访问控制
	    var $name = '汽车';    //采用 var 定义，则被视为公有。
	    function getName() {	// 方法默认为 公有
	        return $this->name;
	    }
	}

	//实例化一个car对象
	$car = new Car();
	$car->name = '奥迪A6'; //设置对象的属性值
	echo $car->getName();  //调用对象的方法 输出对象的名字


	// 静态属性与方法  可以在不实例化类的情况下调用，直接使用类名::方法名的方式进行调用。
	// 静态属性不允许对象使用->操作符调用。
	// 静态方法中，$this伪变量不允许使用。可以使用self，parent，static在内部调用静态方法与属性。
	class Car {
	    private static $speed = 10;
	    
	    public static function getSpeed() {
	        return self::$speed;
	    }
	}
	echo Car::getSpeed();  //调用静态方法


	// 访问控制
	public 	   // 类的内部和外部都可以访问
	protected  // 只能在类的内部访问,可以被继承
	private    // 只能在类的内部访问,不能被继承


	从类的外部直接访问类的属性是一个糟糕的想法。可以通过函数来实现对属性的访问。

	只有一个访问接口，就可以实现对要保存的数据进行检测，确保被保存的属性是有意义的。


	静态属性与方法可以在不实例化类的情况下调用，直接使用类名::方法名的方式进行调用

	class Car {
	    $speed = 10; //错误 属性必须定义访问控制
	    public $name;   //定义共有属性
	}



	PHP 不支持 多重继承。每个类只能继承一个父类。



// 正则
preg_match(pattern,字符串,matches)  // 返回0或1
matches  // 如果提供了参数matches，它将被填充为搜索结果。$matches[0]将包含完整模式匹配到的文本



// require()失败后给出致命错误  include()失败后给出警告




// cookie 操作
setcookie(name,value,expire,path.domain);  // 设置cookie
setcookie('test', '', time()-1); 	// 删除cookie
$_COOKIE	// 读取客户端发会回的cookie   $_COOKIE[key]


// session 操作
session_start()   // 启动新会话或者重用现有会话
$_SESSION['name'] = 'job';  // 设置session
unset($_SESSION['name'])	// 删除



// 文件根目录
$_SERVER['DOCUMENT_ROOT'] 
$DOCUMENT_ROOT 

// 文件读写    打开文件 > 写入/读取数据 > 关闭文件
@ $fp = fopen(path,mode)  // 打开文件   返回 resource/false  @符号屏蔽PHP的报错
fwrite($fp,string)  // 写入数据
fclose($fp)   // 关闭文件

file_exists($filename)	// 判断是否存在
$size = filesize($filename);	 // 判断文件大小,字节
$str = file_get_contents(path)   // 将整个文件读入一个字符串
unlink(filename)   // 删除文件


// 错误处理
$filename = 'test.txt';
try {
    if (!file_exists($filename)) {
      throw new Exception('文件不存在');
    }
} catch(Exception $e) {
    echo $e->getMessage();	// 错误信息
    echo $ex->getLine();	// 错误行
}



// 数据库连接

// mysql
$link = mysql_connect('mysql_host', 'mysql_user', 'mysql_password');

// mysqli
$link = mysqli_connect('mysql_host', 'mysql_user', 'mysql_password');


// 例子
$link = mysql_connect('127.0.0.1', 'code1', '') or die('数据库连接失败');
mysql_select_db('code1');
mysql_query("set names 'utf8'");
// 对于查询类的语句会返回一个资源句柄（resource），可以通过该资源获取查询结果集中的数据。
$result = mysql_query('select * from user limit 1');
$row = mysql_fetch_assoc($result);
print_r($row);
mysql_close($link);  // 关闭数据库连接
