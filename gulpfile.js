var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', async function(){
  return gulp.src('app/scss/styles.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('app/css'))
});

gulp.task('watch', function(){
  gulp.watch('app/scss/*.scss', gulp.series('sass'));
  // gulp.watch('app/js/*.js', gulp.series('scripts'));
  // gulp.watch('app/img/*', gulp.series('images'));
});