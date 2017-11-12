
// OSI 模型  Open System Interconnection
即开放式通信系统互联参考模型，是国际标准化组织(ISO)提出的一个试图使各种计算机在世界范围
内互连为网络的标准框架，简称OSI。


// 网络七层  OSI将计算机网络体系结构(architecture）划分为以下七层：
物理层	//	传输在线缆上的电子信号	具有被搭线窃听的危险   保护措施：加密，流量填充
链路层	//	
网络层 	//	寻址和路由  协议:IP,ARP,
传输层	//	控制数据流  协议:TCP UDP  常用端口:21-ftp 22-ssh 23-telnet 80-http 139-bios

会话层	//	
表示层 	//
应用层	//	协议: SMTP HTTP FTP TELNET SNMP 最难保护的一层


// ARP协议  地址解析协议  Address Resolution Protocol
转换IP和MAC地址

// TCP协议
可靠的，面向链接的协议

// TCP 三次握手
# 我可以连接吗 - 当然可以 - 那我就连接了


// UDP协议 用户数据包协议	
不保证交付，也不保证顺序。发出去就完了，不论结果。
UDP非常快速，不需要验证很多东西。支持点对点和点对多传输。TCP只支持点对点传输

// SMTP 简单邮件传输协议  Simple Mail Transfer Protocol	  常用端口:25

// FTP 文本传输协议 File Transfer Protocol 
常用端口:20/21 20数据端口 21控制端口


// TELNET 
Telnet是Internet远程登录服务的标准协议和主要方式
