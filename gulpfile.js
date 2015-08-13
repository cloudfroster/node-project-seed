var gulp = require('gulp');
var gutil = require('gulp-util'); //gulp工具,用来在流中输出
var nodemon = require('gulp-nodemon'); // 开发时监视文件改变后重复服务器
var watch = require('gulp-watch'); //修复原本watch增加文件后不能监视
var browserSync = require('browser-sync'); //浏览器同步
var reload = browserSync.reload; //刷新浏览器

gulp.task('lint', function() {
  // 检测代码质量
  console.log('lint');
});

gulp.task('dev', function() {
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

  // 监听文件变化
  watch('**/*.css', function() {
      return gulp.src('**/*.css')
        .pipe(reload({stream:true}));
  });
  watch(['**/*', '!**/*.css', '!**/*.less', '!**/*.sass', '!**/*.scss'], function() {
    reload();
  });
});

gulp.task('reload', function() {
  reload();
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
