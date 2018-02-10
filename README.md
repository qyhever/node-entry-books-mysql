# node-entry-books-sql
nodejs+mysql入门学习

express + mysql + art-template（后端渲染）

## 相关依赖包

- express
- mysql
- art-template
- express-art-template
- body-parser

## 初始化数据

1. data.json，数组里面多条数据

```json
[
    {
        "id": 1,
        "name": "三国演义",
        "author": "罗贯中",
        "category": "文学",
        "desc": "一个杀伐纷争的年代",
        "_locals": {}
    }
]
```

2. 读取data.json生成sql语句

```javascript
/**
 * 把data.json文件中的数据拼接成insert语句
 */
const path = require('path');
const fs = require('fs');

fs.readFile(path.join(__dirname, '../', 'data.json'), 'utf8', (err, content) => {
    if (err) return;
    let list =  JSON.parse(content);
    let arr = [];
    list.forEach(item => {
        let sql = `insert into books_sys (name, author,category,description) values ('${item.name}','${item.author}','${item.category}','${item.desc}');`;
        arr.push(sql);
    });
    fs.writeFile(path.join(__dirname, 'data.sql'), arr.join(''), 'utf8', (err) => {
        console.log('init sql finished!');
    });
});
```

> 上面的books_sys是数据库表名称

3. 生成数据，新建数据库，表名为books_sys，把生成的sql语句运行，即生成数据



## 封装操作mysql的公共方法

operate-mysql.js

```javascript
/**
 * 封装操作mysql的方法
 */
const mysql = require('mysql');

exports.base = (sql, data, callback) => {
    // 创建数据库连接
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'books' // 数据库名称
    });
    // 执行连接操作
    connection.connect();

    // 操作数据库（数据库操作是异步的）
    connection.query(sql, data, (error, results, fields) => {
        if (error) throw error;
        callback(results);
    });
}
```



## 查询操作

```javascript
// 渲染主页面
exports.showIndex = (req, res) => {
    let sql = 'select * from books_sys';
    db.base(sql, null, result => {
        res.render('index', { list: result });
    });
}
```

