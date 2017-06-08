数据库的写入速度和持久化存在矛盾关系。
写入磁盘的速度远远慢于写入内存RAM的速度。比如memcached，专门写入ram,速度非常快，但数据容易丢失。
但很少有数据库只写磁盘，因为操作性太低。所以要在速度和持久性之间做出平衡。

伸缩数据库
垂直扩展  最简单的方式就是升级服务器硬件。单节点垂直扩展到一个点以后，成本非常的高
水平扩展  多台机器上分布式存储数据库，可以减少硬件成本，减小宕机带来的丢失数据的后果

增删改  // 写操作
查      // 读操作


schema
Mongoose 通过 Schema 支持文档校验，虽说mongodb是no schema的，但在生产环境中使用 Schema 有两点好处。
一是对文档做校验，防止非正常情况下写入错误的数据到数据库，
二是可以简化一些代码，如类型为 ObjectId 的字段查询或更新时可通过对应的字符串操作，
不用每次包装成 ObjectId 对象。

先new 一个 model的实例，可以调用save方法保存数据到数据库

// mongoose 
实例方法 	// 必须是model的实例才能调用的方法
静态方法 	// 无需实例化,可以直接调用

//memcached
// 简单的键值存储。使用场景就是缓存，比如缓存一个页面。没有强制的schema数据定义。牺牲了持久化，换取速度。

// redis
// 如果你对数据持久化和数据同步有所要求，那么推荐你选择Redis。因为这两个特性Memcached都不具备。
// 即使你只是希望在升级或者重启系统后缓存数据不会丢失，选择Redis也是明智的。

// mysql oracle sql server
// 需要事务的系统或sql，规范化数据模型。比如银行和金融。垂直伸缩

// windows 32位操作系统最多能够支持4G内存

关系型数据库
// 支持sql查询语言，可以做复杂查询，支持事务
// 支持数据分析，通常数据可以大量导入数据库

文档数据库
// NOSQL是基于键值对的，而且不需要经过SQL层的解析，所以性能非常高。
// 同样也是因为基于键值对，数据之间没有耦合性，所以非常容易水平扩展。
// 无schema，节约沟通，修改schema的时间，快速开发

mongodb
// 使用C++编写
// 容易存储无schema的数据，也就是弱数据结构。
// 适合存储无法事先知道数据结构的数据
// 数据库伸缩
// 快速开发

// mongodb使用场景：高吞吐量的web应用，分析应用的首选数据库。

// 命令行工具
mongodump  //备份工具 把数据保存为原生的BSON格式
mongorestore  // 恢复备份



//启动mongodb
cmd输入mongo

// explain  查询计划


 db.help()		  // 查看帮助
 db.getMongo()    // 查看数据库地址
 db.stats()  	  // 查看数据库情况
 db.t1.stats()    // 查看表的情况
 db.getName()     // 查看当前数据库  select database()


//查看数据库
show dbs  // show databases;
use t1    // use t1

// 新建数据库  mongodb没有显示的创建数据库的方式。它会在第一次写入数据的时候创建数据库
use db1 // create database db1;

// 删除当前数据库
 db.dropDatabase()  // drop database test1

// 查看数据库下的集合
show collections  // show tables;


// 集合或表的操作
// 无需显示的创建一个数据库或集合
create table user(
	id int primary key auto_increment,
	name varchar(20),
	sex ENUM('0','1') not null
);

db.user.drop()     // 删除集合     drop table user;
db.user.remove()   // remove不会删除集合,只会删除数据 
delete from 表名   // 速度慢，数据可恢复
truncate table 表名;  // 速度快,无法恢复


// 数据增删改查 curd
db.movie.insert(
   document or array of documents,
   {
     writeConcern: document,
     ordered: boolean
   }
)

db.collection.remove(
   query,
   {
     justOne: boolean,
     writeConcern: document,
     collation: document
   }
)

db.movie.update(
	query,
	update,
	{
	    upsert: boolean,
	    multi: boolean,
	    writeConcern: document,
	    collation: document
    }
)      // 默认更新一条  multi为true更新多条

db.movie.find(query,{})  // 第二个参数用来控制输出,需要输出的打1,不需要输出的打0


// insert 和 save 的区别
一、使用save()函数，如果原来的对象不存在，那他们都可以向collection里插入数据，
如果已经存在，save会调用update更新里面的记录，而insert则会忽略操作。
save()方法只是对insert()和update()的包装

二、insert可以一次性插入一个列表，而不用遍历，效率高， save则需要遍历列表，一个个插入。
跟为详细的区别可以通过db.collectionname.save和db.collectionname.insert来查看对应的源码函数进行对比

// 插入数据
db.users.insert({name:'smith',sex:1},{name:'leo',sex:1});  // insert users value ('fjm','1')

// 删除数据  remove默认删除所有匹配的,第二个参数指定删除条数
db.users.remove({id:9})   // delete from users where id=9   truncate table 表名;


 //数据查询 find()  find接收参数对象，不传参数时，默认为空对象

 //查询所有 
 db.movie.find().pretty()   // select * from movie;

 // 查询条数  count()
 db.movie.count()   // select count(*) from movie;

// 运算符  $in $nin $all
db.num.find({tags:{'$in':['a','c']}})     //  有a或c
db.num.find({tags:{'$nin':['a','c']}})    //  没有a和c
db.num.find({tags:{'$all':['a','c']}})    //  有a也有c
 
 //条件查询--and
 db.movie.find({'title':'hello', 'stars':'leo'}).pretty()
 db.movie.find(
 {
   $and: 
     [  {'title':'hello'}, 
        {'stars':'leo'}
     ]
 }).pretty()
 select * from movie from where directed_by = 'hello' and stars = 'leo';


//条件查询--or
db.movie.find(
{
  $or: 
     [  {'stars':'Robin Wright'}, 
        {'stars':'Morgan Freeman'}
     ]
}).pretty()

select * from movie from where stars = 'Robin Wright' or stars = 'Morgan Freeman';



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


// 文档更新

// $set 用于更新一个字段或者新增一个字段
db.collection.update({}, {$set: {otherkey: ‘otherval’}}, {multi: 1})  // 给所有数据添加一个字段

db.movie.update({'title':'hello'},{$set:{year:1995}})  //找到title是hello的，设置year为1995
update movie set year = '1995', like=100;  // 更新多个字段,逗号分隔
// alter table example add sex varchar(20) after name; 


// $unset 删除一个字段
db.movie.update({'title':'hello'},{$unset:{year:1995}}) //删除的时候year的值可以随便填
// alter table example drop sex; 

//局部更新--增量更新 increase
db.movie.update({title:'Seven'}, {$inc:{likes:2}})  //likes+2

//如果有多部符合要求的电影。则默认只会更新第一个。如果要多个同时更新，要设置{multi:true}
db.movie.update({}, {$inc:{likes:10}},{multi:true})

//在原有值基础上,再添加--$push  适用于数组 但无法阻止重复数据  $addToSet可以阻止重复数据
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



// 创建索引  createIndex()
for(i=0;i<2000;i++){
	db.num.save({num:i})
}
db.num.createIndex({num:1})  // 建立升序索引

// getIndexes() 检查索引是否创建成功
db.num.getIndexes()





 //mongodb的collection和mysql的table
 //插入数据之前，我们并不需要先声明movie这个集合里面有哪些项目。我们直接插入就可以了~
 //这一点和SQL不一样，SQL必须先声明一个table里面有哪些列，而MongoDB不需要。















// mysql 学习
所有的函数以 select 开头  select now() select user()

// 登录mysql
mysql -h hostname -P port -u username -p databasename

// 用户管理
Mysql 中的 mysql 数据库存储的都是权限表。其中包括 user表，db表，host表等

user表 存储了所有的用户  select user,host from user;
db表  存储了某个用户对一个数据库的权限

// 新建用户
create user 'fjm'@'localhost' identified by '1111';

// 删除用户
drop user 'fjm'@'localhost';

//修改密码
set password = password('1212');

select user()    // 当前用户



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

// ENUM 枚举类型  括号里必须是字符串
ENMU(a,b,c)   // 加上not null 默认值为第一个值。每个值都有一个编号，数据库存储的是编号而不是值

create table user(
	id int primary key auto_increment,
	name varchar(20),
	sex ENUM('0','1') not null
);

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


// 修改密码
set password = password('abcd');



// 常用指令
show databases  // 查看数据库
select version();
select now();
SELECT DATABASE();
SELECT USER();


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

describe example;  // 查看表的结构   desc example  show columns from t1


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
alter table example change 旧字段名 新字段名 数据类型;

// 增加字段  add 默认添加到最后  first插入到最前面
// alter table example add 字段 数据类型 first|after 字段;  
alter table example add sex varchar(20) after name;  

// 删除字段 drop
alter table t2 drop name;




// sql语句

select * from t1;	 // 展示所有数据
select * from t1\G;  // 以网格形式展示数据

set names gbk   // 在客户端以gbk的格式展示数据，不影响数据库

// 数据查询 select
select 字段 from 表名|视图  [where表达式] [group by 字段 [having表达式] ] [order by 字段 [asc|desc]]

// as 别名
select id as user_id,name as user_name from users;

// in 
select * from students where age in (16,20);    // 查找16或20的数据

// between and    not between and
select * from students where name not in ('Ann','Leo');  // 查找不是Ann或Leo的数据
select * from students where age between 16 and 20;    // 查找16-20的数据   


// like  not like     %代表任意长度的字符串  _表示单个字符   escape 1转义
select * from students where address like '北京%';
select * from students where name like '张_';   // 找出姓张的，两个字的同学
select * from students where name like '张1%' escape 1;

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

select count(*) from students  //查询记录条数



// 子查询  
// 出现在其他sql语句中的select语句，必须出现在括号内
// 子查询返回的结果可以是一行，一列或子查询
select * from t2 where price >( select avg(price) from t2 )  // 查询价格大于平均数的item

// 子查询返回多个结果时，使用any some all做修饰
select * from t2 where price > any ( select price from t2 where brand = 'apple' ) 


// 连接  表1 连接方式 表2 on 连接条件
inner join // 仅仅显示符合条件的记录，取交集
select id,name,cate_name from t2 inner join cates on t2.cate = cates.cate_id;  //搜索两张表中的字段

left join  // 左外连接显示左表的全部 和右表符合条件的

right join // 右外连接显示右表的全部 和左表符合条件的


// 多表连接
select id,name,cate_name,brands.brand_name,price from t2
	inner join cates on t2.cate = cates.cate_id
	inner join brands on t2.brand_name = brands.brand_id;







// 数据操作
insert users values(null,'Tom','12345','22',1);   // null或default
insert users values(null,'Ann','12345','16',1),(null,'Din',md5(12),'26',1); // 插入多条,逗号隔开

insert users set name = 'Lua',password = '551122';   


// 将查询数据写入表  insert...select
insert t1(name) select name from users where age>20;   // 使用子查询

// 单表更新
update users set age = age+10;  // 更新一个字段
update users set age = age-10,sex=0;  // 更新多个字段,逗号分隔
update users set age = age+10 where id%2 = 0;  // 条件更新

// 参照别的表，更新表   多表更新
update t2 inner join cates ON cate=cate_name set cate=cate_id;  // cate对应cate_name,将cate改成cate_id
// 字段名相同时候，使用别名
update t2 as t inner join brands as b on  t.brand_name = b.brand_name set t.brand_name = b.brand_id;

// create...select
create table brands(
	brand_id smallint unsigned primary key auto_increment,
	brand_name varchar(40) not null
)
select brand_name from t2 group by brand_name;

//别名更新

// 单表删除
delete from users where id = 6;




// 字符函数
concat()
concat_ws('|','a','b')
format()   // 数字格式化
lower()
upper()
left('mysql','2')
right()
length()
ltrim()
rtrim()
substring()
replace()

// 日期函数
now()   // 返回当前时间
curdate()  // 2015-3-12
curtime()  // 15:22:22

// 信息函数
database()
user()
version()


select concat('a','b')   // 'ab'
select concat(first,last) as fullname from t2;  
upper(left('mysql','2'))


// 聚合函数
sum()
max()
min()
avg()
round(num,2)   // 四舍五入，保留两位小数

count()
select count(*) from students  //查询记录条数


// 加密函数
md5()  		 // 信息摘要算法
password()   // 加密算法



// 存储过程
输入sql  -- 分析是否正确  -- 编译 -- 执行 -- 执行结果 -- 返回客户端

存储过程是sql语句和控制语句的预编译集合，以一个名称存储并作为一个单元处理


// 优点
增强sql语句的功能和灵活性   // 可以接受参数  可以存在多个返回值
加快执行速度   // 存储过程是预编译的
减少网络流量   // 调用delete id 把id传过去就行

// 参数 
in     // 必须在调用时指定
out    // 可以被改变和返回
inout  // 在调用时指定，并且可以被改变和返回

// 过程体  
由合法的sql语句组成
超过2个语句以上，要用begin...and 包含其中

//局部变量
begin...end 中间创建的变量是局部变量

// 用户变量
set @num = 7;


// 创建存储过程  必须使用定界符
create procedure sp1() select version();

// 调用存储过程
call sp1; //可以不带括号


// 删除存储过程
delete procedure sp1;


delimiter //
create procedure del(in myid int unsigned, out total int unsigned)
begin
delete from t1 where id = myid;
select count(id) from t1 into total;
end
//
 delimiter ;


 call del(5,@total) 
 select @total


// mysql charset 字符集 
// 修改数据库字符集：
ALTER DATABASE db_name DEFAULT CHARACTER SET character_name [COLLATE ...];

// 把表默认的字符集和所有字符列（CHAR,VARCHAR,TEXT）改为新的字符集：
ALTER TABLE tbl_name CONVERT TO CHARACTER SET character_name [COLLATE ...] 
如：ALTER TABLE logtest CONVERT TO CHARACTER SET utf8 

// 只是修改表的默认字符集：
ALTER TABLE tbl_name DEFAULT CHARACTER SET character_name [COLLATE...]; 
如：ALTER TABLE logtest DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;