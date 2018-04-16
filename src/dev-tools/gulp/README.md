# gulp

```sh
$ npm install gulp-cli -g
$ npm install gulp -D
$ touch gulpfile.js
$ gulp --help 
```

如果以前全局安装过 `gulp`，需要运行 `npm rm --global gulp` 删除旧版本。

在项目根目录创建一个 `gulpfile.js` 文件：

```js
var gulp = require('gulp')

gulp.task('default', function() {
    // place code for your default task here
})
```

## API

### gulp.src(globs[, options])

返回值是 Vinyl 文件流，可以通过管道输入到插件中。

```js
gulp.src('client/templates/*.jade')
    .pipe(jade())
    .pipe(minify())
    .pipe(gulp.dest('build/minified_templates'))
```

## REF

- [gulp.js][gulp]
- [Getting Started][started]
- [gulp API docs][docs]

[gulp]: https://gulpjs.com/
[started]: https://github.com/gulpjs/gulp/blob/v3.9.1/docs/getting-started.md
[docs]: https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md