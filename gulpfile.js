const gulp = require('gulp');
const jsonlint = require("gulp-jsonlint");
const livereload = require('gulp-livereload'); 
const exec = require('child_process').exec;

// #### CONFIGS ####
const dist_folder = 'docs';
const source_folder = 'www';
const locales_folder = 'locales';
// ## END CONFIGS ##

/** json
 *  Lint JSON files, and report any lint errors
 */
gulp.task('json', function () {
  return gulp.src(locales_folder + '/**/*.json')
    .pipe(jsonlint())
    .pipe(jsonlint.reporter());
});

/** compileI18N
 *  Run static-i18n service to compile templates into static files
 */
gulp.task('compileI18N', function (cb) {
  exec('static-i18n -l es -i en -i es -o '+ dist_folder +' '+ source_folder, function (err, stdout, stderr) {
    if (stderr) {
      console.error(stderr);
    }
    
    if (cb) cb(err);
  });
});

/** i18n
 *  Check JSON files, and run i18n compilation tasks
 */
gulp.task('i18n', gulp.series('json', 'compileI18N'));

/** styles
 *  Move styles from source_folder to dist_folder
 */
gulp.task('styles', function () {
  return gulp.src(source_folder + "/**/*.css")
    .pipe(gulp.dest(dist_folder));
});

/** scripts
 *  Move scripts from source_folder to dist_folder
 */
gulp.task('scripts', function () {
  return gulp.src(source_folder + "/**/*.js")
    .pipe(gulp.dest(dist_folder));
});


/** build
 *  Compile everything, prepare statics and move result files to dist_folder
 */
gulp.task('build', gulp.series('i18n', 'styles', 'scripts'));

/** watch
 *  Watch changes in files, and re-build related files
 */
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(source_folder + '/**/*.html', gulp.series('i18n'));
  gulp.watch(locales_folder + '/**/*', gulp.series('i18n'));
  gulp.watch(source_folder + '/**/*.css', gulp.series('styles'));
  gulp.watch(source_folder + '/**/*.js', gulp.series('scripts'));
});

/** default
 *  By default, build everything, and start watch task
 */
gulp.task('default', gulp.series('build', 'watch'));

