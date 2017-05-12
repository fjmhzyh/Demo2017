var gulp = require('gulp');
 	livereload = require('gulp-livereload'),
 	webserver = require('gulp-webserver');
 	babel = require('gulp-babel'),
 	autoprefixer = require('gulp-autoprefixer');
    concat = require('gulp-concat'),         // 文件合并
    minifycss = require('gulp-minify-css'),  // CSS压缩
    uglify = require('gulp-uglify'),         // js压缩
    imagemin = require('gulp-imagemin'),     // 图片压缩
    pngquant = require('imagemin-pngquant'), // 深度压缩
    rename = require('gulp-rename');         // 重命名

gulp.task('minifycss', function() {
    return gulp.src('src/css/*.css')         // 压缩的文件
    	.pipe(concat('all.css'))
    	.pipe(autoprefixer({
	        browsers: ['last 2 versions'],   // 主流浏览器的最新两个版本
	        cascade: false                   // 是否美化属性值
	    }))
        .pipe(minifycss())                   // 执行压缩
        .pipe(gulp.dest('dist/css'));        // 输出文件夹
});

gulp.task('minifyjs', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('main.js'))              //合并所有js到main.js
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify()) 
        .pipe(rename({suffix: '.min'}))      //rename压缩后的文件名
        .pipe(gulp.dest('dist/js'));          //输出
});

gulp.task('minifyimage', function(){
  return gulp.src('src/images/**/*.{png,jpg,gif,svg}') // 指明源文件路径、并进行文件匹配
    .pipe(imagemin({
      progressive: true, // 无损压缩JPG图片
      svgoPlugins: [{removeViewBox: false}], // 不移除svg的viewbox属性
      use: [pngquant()] // 使用pngquant插件进行深度压缩
    }))
    .pipe(gulp.dest('dist/images')); // 输出路径
});

gulp.task('build', ['minifycss', 'minifyjs','minifyimage']);

// 监视文件的变化，当文件有更新时执行build任务
gulp.task('watch', function () {
    gulp.watch(['src/js/*.js', 'src/css/*.css','src/images/*.{png,jpg,gif,svg}'], ['build']);
});


gulp.task('webserver', function() {
	gulp.src( './' ) // 服务器目录（./代表根目录）
	.pipe(webserver({ 
		livereload: true, // 启用LiveReload
		open: true // 服务器启动时自动打开网页
	}));
});

// 默认任务
gulp.task('default', ['webserver','build', 'watch']);