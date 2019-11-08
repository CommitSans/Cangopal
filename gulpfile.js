var gulp = require('gulp');
var livereload = require('gulp-livereload'); 
var exec = require('child_process').exec;

const dist_folder = 'docs';
const source_folder = 'www';
 
gulp.task('i18n', function (cb) {
  exec('static-i18n -l es -i en -i es -o '+ dist_folder +' '+ source_folder, function (err, stdout, stderr) {
    if (stderr) {
      console.error(stderr);
    }
    
    if (cb) cb(err);
  });
});

gulp.task('styles', function () {
  return gulp.src(source_folder + "/**/*.css")
    .pipe(gulp.dest(dist_folder));
});

gulp.task('scripts', function () {
  return gulp.src(source_folder + "/**/*.js")
    .pipe(gulp.dest(dist_folder));
});

gulp.task('build', gulp.series('i18n', 'styles', 'scripts'));
 
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(source_folder + '/**/*.html', gulp.series('i18n'));
  gulp.watch(source_folder + '/**/*.css', gulp.series('styles'));
  gulp.watch(source_folder + '/**/*.js', gulp.series('scripts'));
});
