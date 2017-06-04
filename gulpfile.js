//required
var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  compass = require('gulp-compass'),
  plumber = require('gulp-plumber'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  autoprefixer = require('gulp-autoprefixer'),
  del = require('del');

//scripts task
gulp.task('scripts',function(){
  gulp.src(['./**/*.js', '!./**/*.min.js'])
  .pipe(plumber())
  .pipe(rename({suffix:'.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('./'))
  .pipe(reload({stream:true}));
});

//compass sass tasks
/*gulp.task('compass',function(){
  gulp.src('app/scss/style.scss')
  .pipe(plumber())//must be the first thing to pipe in, right after the sources
  .pipe(compass({
    config_file:'./config.rb',
    css:'app/css',
    sass:'app/scss',
    require:['susy']
  }))
  .pipe(autoprefixer('last 2 versions'))
  .pipe(gulp.dest('app/css/'))
  .pipe(reload({stream:true}));
});*/

//html tasks
gulp.task('html',function(){
  gulp.src('./*.html')
  .pipe(reload({stream:true}));//reload is always the last to go in the pipe
});

//build tasks

//clear out all files and folders from build folders
gulp.task('build:clearfolder',function(cb){
    del([
      'build/**'
    ], cb);
});

//task to create build dir for all files
gulp.task('build:copy', /*['build:clearfolder'],*/function(){
  return gulp.src('app/**/*')
  .pipe(gulp.dest('build/'));
});

//task to remove unwanted build files
//list all the files and directories that we do not want to include
gulp.task('build:remove', ['build:copy'],function(cb){
  del([
    'build/scss/',
    'build/js/!(*.min.js)'
  ], cb);
});

gulp.task('build', ['build:copy', 'build:remove']);

//browser-sync tasks
gulp.task('browser-sync',function(){
  browserSync({
    server:{
      baseDir: "./"
    }
  });
});

//task to run build server for testing final app
gulp.task('build:serve',function(){
  browserSync({
    server:{
      baseDir: "./build/"
    }
  });
});

//watch tasks
gulp.task('watch',function(){
  gulp.watch('./*.js', ['scripts']); //when there are changes, run the scripts task
  //gulp.watch('app/scss/**/*.scss', ['compass']);
  gulp.watch('./*.html', ['html']);
});

//default task
gulp.task('default',[/*'scripts',*//*'compass',*/ 'html', 'browser-sync', 'watch']);
