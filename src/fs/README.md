# fs 模块

查看当前目录使用 `process.cwd()`，返回绝对路径：

```js
process.cwd();
// => "/Users/example/path/to/cwd"
```

读取目录列表 `readdir`

```js
fs.readdir(path[, options], callback);
fs.readdirSync(path[, options]);
```

读取文件 `readFile`。

如果指定 `encoding` 选项，则返回字符串；否则，返回 buffer。

```js
fs.readFile(path[, options], callback);
fs.readFileSync(path[, options]);
```

`fs.readFile` 会把整个文件内容读入内存，为了降低内存占用率，可以使用 `fs.createReadStream` 读取流。

写入文件 `writeFile`。

```js
fs.writeFile(file, data[, options], callback);
fs.writeFileSync(file, data[, options]);
```

[fs]: https://nodejs.org/api/fs.html