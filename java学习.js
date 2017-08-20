
// 自动类型转换  需要满足特定的条件 
// 如 double 型兼容 int 型，但是 char 型不能兼容 int 型  long int short byte
int score1 = 82;
double score2 = score1;

// 强制类型转换  强制类型转换可能会造成数据的丢失
// int 型的存储范围比 double 型的小。此时就需要通过强制类型转换来实现了。
double n1 = 7.8;
int n2 = (int)n1;

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