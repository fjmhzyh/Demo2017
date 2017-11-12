

// 不要随意在根目录存放文件。可以在用户目录和tmp目录存放文件。


//  /    根目录
对你的电脑来说，有且只有一个根目录。

// /root
系统管理员的目录

// /etc
这里主要存放了系统配置文件。

// /bin  /sbin 
存放系统命令

// /boot
启动目录，存放启动相关文件

// /lib
函数库

// /usr/local
这里主要存放那些手动安装的软件

// /home
这里主要存放你的个人数据。

// /tmp
这是临时目录。


// /media
有些linux的发行版使用这个目录来挂载那些usb接口的移动硬盘（包括U盘）、CD/DVD驱动器等等。


// dev 目录  device 的缩写
硬件设备是以文件的形式存储在dev目录下的。linux可以自动识别硬件设备
这个目录中包含了所有Linux系统中使用的外部设备。它实际上是一个访问这些外部设备的端口。
我们可以非常方便地去访问这些外部设备，和访问一个文件，一个目录没有任何区别。




// 系统分区

// 什么是磁盘分区	逻辑上分区，没有把硬盘劈开
磁盘分区是使用分区编辑器（partition editor）在磁盘上划分几个逻辑部分。
不同类的文件可以存储进不同的分区。

// 分区需要给定盘符。windows上的 a和b被软驱占用，c是系统盘符。理论上还能添加23个分区。

// linux需要给每个分区取一个名字，才能分配盘符。linux把目录作为盘符

// 格式化	格式化的根本目的是为了写入文件系统。把我们的分区分成等大小的数据块。不是清空数据
// 给柜子打隔断，要先把里面的衣服拿出来。分区也一样，格式化的时候，会附带的把分区里的数据给清空
// FAT32 单个文件不能超过4个G
格式化 又成 逻辑格式化，它是根据用户选定的文件系统如(FAT32 NTFS EXT3 EXT4),在磁盘的特定区域写入特定数据

分区是把大硬盘分成小硬盘，格式化是在分区里写入文件系统。




// 设备文件名

//  /dev /hda1    /dev /sda1    sda1  第一个sata接口硬盘的第一个分区
hd 和 sd 代表设备接口    a 代表第一个硬盘	1代表第一个分区


// linux 主分区和扩展分区总数不能超过4个	扩展分区最多只有一个。
// 扩展分区不能直接存储数据。必须建立逻辑分区，才能存储数据
// linux 必要分区    /	根分区  swap分区（交换分区，内存4个G以上，和内存一样大。4个G以内，内存两倍）
// 推荐分区	   /boot分区	200mb




fdisk -l   // 列出所有分区表
df -h      // 查看硬盘使用情况
mkfs 	   // 分区格式化    只有主分区和逻辑分区才能格式化
mkfs.ext4 /dev/sdb1  把sdb1格式化为ext4的文件系统



// 分区挂载   没有挂载的分区是无法使用的
mount  /dev/sdb1 /mnt/imooc		// 挂载  一次性有效，重启失效
unmount /mnt/imooc	// 卸载




// 用户和用户组    
// 一个用户可以同时属于多个用户组

//   /etc/group  存储当前系统中所有用户组信息
group: x : 123 :a,b,c  // 组名称：组密码占位符：组编码：组成员


//   /etc/gshadow  存储当前系统中所有用户组的密码
// 密码是 * 代表密码为空     组管理者为空，即所有人都可以管理这个用户组
group: * :  :a,b,c  // 组名称：组密码：组管理者：组成员


//   /etc/password  存储当前系统中所有用户的信息   类似/etc/group
//   /etc/shadow    存储当前系统中所有用户的密码  类似/etc/gshadow  里面的密码都是被加密的



groupadd students      		   // 新建用户组
groupmod -n friend  students   // 修改组名称
groupmod -g 668  students      // 修改组编号
groupadd -g 888 boss           // 新建用户组，并指定组编号

groupdel students      		   // 删除用户组   必须先删除用户


useradd -g boss aaa     	// 新增用户，并用户aaa添加到boss用户组   
							// 如果不添加用户组，系统会新增一个和用户名一样的用
useradd -g boss -G group1,group2 aaa     	// 新增用户，-G添加到附属组   
usermod -l ccc aaa			// 修改用户名
userdel -r ccc   		    // 删除用户  -r 同时删除个人文件



// 禁止普通账户登录	 文件内容无关紧要	
touch /etc/nologin	

// 锁定账户
password -l cls   

// 解锁账户
password -u cls  

// 清空密码  可以无密码登录
password -d cls  



// 切换用户
su username		// 不加username  默认切换到root

// 显示用户
id username		

// 显示用户所在组
group username






//  linux 权限


// 文件的基本权限
-rw-r--r--   // 共10位   文件类型 + u 所有者权限 + g 所属组权限 + o其他人权限

// 第一位  文件类型		- 文件  d 目录  l 软链接文件
// r read  w write  x 执行


// 修改文件权限  
chmod -R 模式 文件名	// -R 递归

chmod u+x cangls  		// 给所有者 执行权限
chmod g+x,o+x cangls    // 给用户组，其他人 执行权限

// 删除权限
chmod g-x,o-x cangls    // 给用户组，其他人 删除权限


// 更方便的方法
chmod u=rwx,g=rw cangls  
chmod a=rwx cangls  		// 给所有人rwx权限


// 数字表示法   r=4 w=2 x=1
chmod 755  cangls   	//  u=rwx g=rx o=rx
chmod 644  cangls   	//  rw-r--r--


// 777 最高权限  755 执行权限  644 只读权限



// 对目录来说，要小心写权限。 对文件权限，要小心执行权限

// 权限对目录的作用   目录的最高权限是 w    
r  // 可以查询目录下文件名 ls
w  // 修改目录结构的权限
x  // 进入目录的权限


