var gulp = require('gulp');
var plumber = require('gulp-plumber'); //修复node错误
var less = require('gulp-less'); //编译less
var changed = require('gulp-changed'); //只通过改变的文件流
var sourcemaps = require('gulp-sourcemaps'); //生成map文件
var gutil = require('gulp-util'); //gulp工具,用来在流中输出
var nodemon = require('gulp-nodemon'); // 开发时监视文件改变后重复服务器
var watch = require('gulp-watch'); //修复原本watch增加文件后不能监视
var browserSync = require('browser-sync'); //浏览器同步
var reload = browserSync.reload; //刷新浏览器

var cssUrl = 'app/**/*.css';
var lessUrl = 'app/**/*.less';
var lessDest = 'app/';
var jsxUrl = 'app/**/*.jsx';
var jsxDest = 'app/';

gulp.task('lint', function() {
  // 检测代码质量
});

gulp.task('dev', ['watch-compile-reload'], function() {
  // 启动node服务器,监听文件变化
  nodemon({
      script: 'app.js'
    })
    .on('restart', function() {
      // 重启完服务器
    });

  // 打开浏览器同步工具
  browserSync({
    port: 9001,
    proxy: 'localhost:9000'
  });
});

gulp.task('watch-compile-reload', function() {
  // 监视less文件
  watch(lessUrl, function() {
    return gulp.src(lessUrl)
      .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(changed(lessDest, {
        extension: '.css'
      }))
      .pipe(less({
        compress: true
      })).on('error', function(err) {
        gutil.log(gutil.colors.red('less compile error!\n') + err.message);
      })
      .pipe(sourcemaps.write('./sourcemaps'))
      .pipe(gulp.dest(lessDest));
  });
  // 监视其他预编译文件

  // 监视css文件
  watch(cssUrl, function() {
    return gulp.src(cssUrl)
      .pipe(reload({
        stream: true
      }));
  });
  // 监视除流刷新的文件
  watch(['app/**/*', '!**/*.css', '!**/*.less', '!**/*.sass', '!**/*.scss', '!**/*.map'], function() {
    reload();
  });
});


gulp.task('default', function() {
  // 输出gulp 任务帮助
  var banner = [
    'gulp        ------ 显示gulp帮助',
    'gulp dev    ------ 开发模式',
    'gulp deploy ------ 发布网站'
  ].join('\n\t');

  console.log('\n\t' + gutil.colors.cyan(banner) + '\n');
});
