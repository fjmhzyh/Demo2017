// 新建一个集合
db.movie.insert({title:'hello',like:20,stars:'fjm'})

// 插入多条数据
db.movie.insert({title:'hello',like:20,stars:'fjm'})
db.movie.insert({title:'hello',like:20,stars:'fjm'})

// 删除重复的两条  remove函数第一个参数为匹配对象，第二个参数为删除的条数，默认删除所有
db.movie.remove({},2)

// 添加字段   第一个参数对象用来查询，第二个参数对象用来添加
db.movie.update({title:'hello'},{$set:{tags:'culture'}})

// 删除字段
db.movie.update({title:'hello'},{$unset:{tags:1}})

// 给数组类型push一个值,如果没有这个字段，会自动添加
db.movie.update({title:'hello'},{$push:{tags:'culture'}})

// $pushAll push多个值
db.movie.update({title:'hello'},{$pushAll:{tags:['a','b','c']}})

// $pull,$pullAll 删除数组中的值  会删除所有重复值
db.movie.update({title:'hello'},{$pull:{tags:'culture'}}) 
db.movie.update({title:'hello'},{$pullAll:{tags:['a','b','c']}})  

// 添加一个重复数据  $addToSet 可以阻止重复数据 $push则不会
db.movie.update({title:'hello'},{$addToSet:{tags:'culture'}})

// for循环插入2000条数据
for(i=0;i<2000;i++){
	db.num.save({num:i})
}

// $gt $lt 范围查找  闭区间 不包含10和20     $gte $lte  大于等于 小于等于
db.num.find({num:{"$gt":10,"$lt":20}})  



