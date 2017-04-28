//启动mongodb
进入bin目录,cmd输入mongo

//查看帮助
 db.help()

//查看数据库地址
 db.getMongo()

//查看数据库
 show dbs

//查看当前数据库
 db.getName()

//删除当前数据库
 db.dropDatabase()

 //查看数据库下的集合
 show collections

 //数据查询

 //查询所有
 db.movie.find().pretty()

 //条件查询--and
 db.movie.find({'directed_by':'David Fincher', 'stars':'Morgan Freeman'}).pretty()

//条件查询--or
db.movie.find(
{
  $or: 
     [  {'stars':'Robin Wright'}, 
        {'stars':'Morgan Freeman'}
     ]
}).pretty()

//条件查询--比较查询
db.movie.find({'likes':{$gt:500000}}).pretty()
db.movie.find({likes:{$lt:200000}}).pretty()
//类似的运算符还有：$let:小于或等于；$get:大于或等于；$ne:不等于。

//只查一条--findOne()自带pretty模式
db.movie.findOne({'title':'Forrest Gump'})

//限制查询数量--limit(),skip(1)跳过第一条
db.movie.find().limit(2).skip(1).pretty()


//局部查询
db.movie.find({'tags':'drama'},{'debut':1,'title':1}).pretty()  //返回debut和title

//这里find的第二个参数是用来控制输出的,1表示要返回,而0则表示不返回。默认值是0,但_id是例外.
//因此如果你不想输出_id,需要显式地声明：
db.movie.find({'tags':'drama'},{'debut':1,'title':1,'_id':0})


//局部更新--增量更新 increase
db.movie.update({title:'Seven'}, {$inc:{likes:2}})  //likes+2

//如果有多部符合要求的电影。则默认只会更新第一个。如果要多个同时更新，要设置{multi:true}
db.movie.update({}, {$inc:{likes:10}},{multi:true})

//在原有值基础上,再添加--$push
db.movie.update({'title':'Seven'}, {$push:{'tags':'popular'}})

//删除
db.movie.remove({'tags':'romance'})

//只删除一个
db.movie.remove({'tags':'romance'},1)


//聚集--aggregate GroupBy
db.movie.aggregate([{$group:{_id:'$directed_by'}}])  //按导演分类

//原子化操作(atomic operation)--多合一
db.movie.findAndModify(
    {
        query:{'title':'Forrest Gump'},
        update:{$inc:{likes:10}}
    }
)

//正则表达式
db.movie.find({title:/Fight/}).pretty() //查找含有'Fight'标题的电影




 //mongodb的collection和mysql的table
 //插入数据之前，我们并不需要先声明movie这个集合里面有哪些项目。我们直接插入就可以了~
 //这一点和SQL不一样，SQL必须先声明一个table里面有哪些列，而MongoDB不需要。















// mysql 学习

//  数据库概念
索引  // 索引是创建在表上的，是对表中的一列或多列的值进行排序的一种结构

索引定义  // 索引可以用来快速查询数据库表中的特定记录,是提高数据库性能的重要方式。
          // 包括普通索引，唯一索引，全文索引，单列索引，多列索引

索引缺点  // 维护索引需要耗费时间，数据越多，维护成本越高。索引占据一定的空间。curd时要动态维护索引
	      // 索引可以提高查询速度，但会降低插入速度。插入时，最好先删除索引，插入后，再添加索引

创建索引的原则
// 选择唯一性索引  
// 为经常需要排序，分组，联合操作的的字段创建索引
// 为常作为查询条件的字段创建索引	
// 限制索引的数目  
// 尽量使用数据量少的索引
// 删除不再使用的索引

create table t3(
	id int,
	name varchar(20)
	[unique|fulltext|spatial] index|key [别名] (字段名) [asc|desc]
)

// 创建一个普通索引
create table t3(
	id int,
	name varchar(20),
	index(id)
);


视图   // 视图是从一个或多个表中导出来的表，是一个虚拟的表。
	   // 通过视图，用户可以只看到自己关心的数据，方便操作




// sql  structured query language 结构化查询语言
// 数据类型
float dobule decimal(18,2) // 长度,精度   普通的用double就行
// 时间  如果就是一般的时间字段，没有什么精度长度限制的就datetime吧。
// bigint用在特殊场景，比如精度要求很高，或者时间长度超长。

//  字符串
char(100)      // 固定长度100
varchar(100)   // 最长100,根据实际变化

// ENUM 枚举类型
ENMU(a,b,c)   // 加上not null 默认值为第一个值。每个值都有一个编号，数据库存储的是编号而不是值

// set 类型   选取列表中多个值
set(a,b,c)



// 关键字与函数名称全部大写
// 数据库名，表名，字段名全部小写
// sql语句必须以分号结尾


// mysql 引擎
innodb  // 需要频繁更新和删除操作,对事务要求较高,支持外键,可以选择
myISAM  // 比较常用。插入少，查询非常频繁。没有事务，可以选择

show variables like '%storage_engine%';  // 查看数据库引擎


// 约束 
primary key     // 主键
foreign key     // 外键   建立 当前表 与 父表 的联系
not null 		// 非空
unique			// 值唯一
auto_increment  // 自动生成唯一ID    一个表中只有一个字段可也使用
default         // 默认值


// 设置外键
CREATE TABLE example(
	id int Primary key,
	student_id INT,
	course_id INT,
	CONSTRAINT name FOREIGN KEY( student_id,course_id)
		REFRENCES example2(student_id,course_id)
)


// 登录与退出
mysql -u root -p -P -h // 登录
exit quit \q  // 退出



// 常用指令
show databases  // 查看数据库
show create database example;   // 查看创建时的指令



// 数据库curd
create database|schema if not exists name default character set utf8  // 语法
drop database|schema if exists name
create database example;   // 新增example表
drop database example;  // 删除
alter database example character set utf8;  // 改编码方式
show databases;   // 查看所有数据库
show create database example;   // 查看创建时的指令    show create table students 
select database();   // 查看当前数据库



// 表的curd
show create table example  // 查看创建时的指令

describe example;  // 查看表的结构   desc example


CREATE TABLE example(
	id int Primary key auto_increment,
	student_id INT,
	course_id INT,
	CONSTRAINT name FOREIGN KEY( student_id,course_id)
		REFRENCES example2(student_id,course_id)
)


alter table example1 rename test;   // 重命名

alter table t1 engine = myISAM;    // 修改表的引擎

alter table t1 drop foreign key 外键名   // 删除外键名



// 删除表   删除表时表的 数据 也会被删除。应该先做好数据的备份




// 修改字段类型  modify
// alter table example modify 字段 数据类型;
alter table example modify name varchar(30);   // 可以用来修改字段的位置

// 修改字段名  change
// alter table example change 旧字段名 新字段名 数据类型;

// 增加字段  add 默认添加到最后  first插入到最前面
// alter table example add 字段 数据类型 first|after 字段;  
alter table example add sex varchar(20) after name;  

// 删除字段 drop
alter table t2 drop name;




// sql语句
select 字段 from 表名|视图  [where表达式] [group by 字段 [having表达式] ] [order by 字段 [asc|desc]]


// in 
select * from students where age in [16,20];    // 查找16或20的数据

// between and    not between and
select * from students where name not in ['Ann','Leo'];  // 查找不是Ann或Leo的数据
select * from students where age between 16 and 20;    // 查找16-20的数据   


// like  not like     %代表任意长度的字符串  _表示单个字符
select * from students where address like '北京%';
select * from students where name like '张_';   // 找出姓张的，两个字的同学

// is null   查询为空值的字段    is not null  查询非空
select * from students where score is null 

// and
select name age height from students where age<20 and height>160 and sex=female order by age desc

// or
select * from students where address like '北京%' or name like '张%'


// distinct  去重
select distinct d_id from students 


// group by  单独使用 只显示每个分组的一条数据

// group by 和group_concat() 一起用
select sex group_concat(name) from students group by sex;
select sex count(sex) from students group by sex;

// having 表达式   满足条件才显示
select sex count(sex) from students group by sex having count(sex)>=3;

// limit 位置 数量
select * from students limit 0 10  //从0开始取10条


// 函数
sum()
max()
min()
avg()

count()
select count(*) from students  //查询记录条数
