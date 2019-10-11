var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var plumber = require('gulp-plumber');
var shell = require('gulp-shell');

var rename = require('gulp-rename');

// Compile Our Sass
gulp.task('sass', function() {
  return gulp.src([
      './app/stylesheets/*.scss',
      './app/stylesheets/modules/*.scss',
      './app/stylesheets/partials/*.scss',
      './app/stylesheets/vendor/*.scss',
    ])
    .pipe(plumber({
      handleError: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./app/dist/styles/'))
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./app/dist/styles/'));
});


gulp.task('vendor-styles', function() {
  return gulp.src([
      './bower_components/font-awesome/css/font-awesome.css',
      './bower_components/bootstrap/dist/css/bootstrap.css',
      './bower_components/leaflet/leaflet.css'
    ])
    .pipe(concat('vendor-styles.css'))
    .pipe(gulp.dest('./app/dist/styles/'))
    .pipe(minifyCSS())
    .pipe(rename('vendor-styles.min.css'))
    .pipe(gulp.dest('./app/dist/styles/'));
});

gulp.task('scripts', function() {
  return gulp.src([
      './app.js',
      './app/*.js',
      './app/controllers/*.js',
      './app/controllers/*/*.js',
      './app/directives/*.js',
      './app/directives/*/*.js',
      './app/services/*.js',
      './app/services/*/*.js'
    ])
    .pipe(plumber({
      handleError: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./app/dist/js/core/'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/dist/js/core/'));
});

gulp.task('vendor-scripts', function() {
  return gulp.src([
      './bower_components/jquery/dist/jquery.min.js',
      './bower_components/underscore/underscore-min.js',
      './bower_components/moment/moment.js',
      './bower_components/angular/angular.js',
      './bower_components/angular-animate/angular-animate.js',
      './bower_components/angular-route/angular-route.js',
      './bower_components/angular-resource/angular-resource.js',
      './bower_components/angular-sanitize/angular-sanitize.js',
      './bower_components/angular-bootstrap/ui-bootstrap.min.js',
      './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      './bower_components/Chart.js/dist/Chart.js',
      './bower_components/leaflet/leaflet.js',
      './node_modules/leaflet-sprite/dist/leaflet.sprite.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./app/dist/js/vendor/'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/dist/js/vendor/'));
});

gulp.task('ie8-scripts', function() {
  return gulp.src([
      './bower_components/html5shiv/dist/html5shiv.min.js',
      './bower_components/respond/dest/respond.min.js'
    ])
    .pipe(concat('ie8.js'))
    .pipe(gulp.dest('./app/dist/js/vendor/'))
    .pipe(rename('ie8.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/dist/js/vendor/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch([
    './app.js',
    './app/*.js',
    './app/controllers/*.js',
    './app/controllers/*/*.js',
    './app/directives/*.js',
    './app/directives/*/*.js',
    './app/services/*.js',
    './app/services/*/*.js'
  ], ['scripts']);
  gulp.watch([
    './app/stylesheets/*.scss',
    './app/stylesheets/modules/*.scss',
    './app/stylesheets/partials/*.scss',
    './app/stylesheets/vendor/*.scss',
  ], ['sass']);
});


gulp.task('icons', function() { 
    return gulp.src('./bower_components/font-awesome/fonts/**.*') 
        .pipe(gulp.dest('./app/dist/fonts/')); 
});


//
// gulp.task('compile-js', ['vendor-scripts', 'scripts', 'ie8-scripts', 'icons']);
//



gulp.task('default', gulp.parallel(['scripts', 'vendor-scripts', 'ie8-scripts', 'vendor-styles', 'sass', 'icons']));


// gulp.task('default', gulp.series(['scripts', 'vendor-scripts', 'ie8-scripts', 'vendor-styles', 'sass', 'watch', 'icons'], function() {
//     // default task code here
// }));
