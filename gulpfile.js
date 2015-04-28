/*
 Modules
 */
var gulp = require('gulp'),
	mainBower = require('main-bower-files'),
	gulpIf = require('gulp-if'),
	jshint = require('gulp-jshint'),
	csslint = require('gulp-csslint'),
	minifyCss = require('gulp-minify-css'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	minifyHtml = require('gulp-minify-html'),
	watch = require('gulp-watch'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	eventStream = require('event-stream'),
	runSequence = require('run-sequence'),
	html2js = require('gulp-ng-html2js');

/*
 Helpful Variables
 */
var dev = 'client/development',
	prod = 'client/production',
	bower = 'bower_components',
	isProd = false;

/*
 Globs
 */
var htmlFiles = [
		dev + '/**/*.html',
		'!' + dev + '/**/*.tpl.html'
	],
	templateFiles = dev + '/**/*.tpl.html',
	sassFiles = dev + '/**/*.scss',
	jsFiles = [
		dev + '/**/*.module.js',
		dev + '/**/*.js',
		'!' + dev + '/vendor/*.js'
	],
	images = dev + '/images/**/*.*',
	copyFiles = [dev + '/favicon.ico'];

var vendorFonts = [
		bower + '/bootstrap/dist/fonts/*'
	],
	vendorMaps = [
		bower + '/bootstrap/dist/css/bootstrap.css.map',
		bower + '/angular/angular.min.js.map',
		bower + '/angular-animate/angular-animate.min.js.map',
		bower + '/ng-tags-input/build/ng-tags-input.boostrap.min.css'
	];

/*
 Tasks
 */
gulp.task('default', ['watch']);

gulp.task('watch', ['dev'], function() {
	gulp.watch(sassFiles, ['sass']);
	gulp.watch(jsFiles, ['js']);
	gulp.watch(htmlFiles, ['html']);
	gulp.watch(templateFiles, ['templates']);
});

gulp.task('dev', ['sass', 'js', 'html', 'vendor', 'templates', 'images'], function() {
	gulp.src(copyFiles)
		.pipe(gulp.dest(prod));
});

gulp.task('prod', function() {
	isProd = true;
	return runSequence(['dev']);
});

gulp.task('sass', function() {
	gulp.src(sassFiles)
		.pipe(sass())
		.pipe(csslint({
			'adjoining-classes': false,
			'box-model': false
		}))
		.pipe(csslint.reporter())
		.pipe(concat("app.css"))
		.pipe(gulpIf(isProd, minifyCss()))
		.pipe(gulp.dest(prod));
});

gulp.task('js', function() {
	gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(concat('app.js'))
		.pipe(gulpIf(isProd, uglify()))
		.pipe(gulp.dest(prod));
});

gulp.task('html', function() {
	gulp.src(htmlFiles)
		.pipe(gulpIf(isProd, minifyHtml({
			empty: true,
			quote: true
		})))
		.pipe(gulp.dest(prod));
});

gulp.task('templates', function() {
	gulp.src(templateFiles)
		.pipe(minifyHtml({
			empty: true,
			spare: true,
			quotes: true
		}))
		.pipe(html2js({
			moduleName: "templates"
		}))
		.pipe(concat("templates.js"))
		.pipe(uglify())
		.pipe(gulp.dest(prod));
});

gulp.task('images', function() {
	gulp.src(images)
		.pipe(gulp.dest(prod + '/images'));
});

gulp.task('vendor', function() {
	eventStream.merge(
		gulp.src(mainBower('**/*.js').concat(bower + '/ace-builds/src-min-noconflict/ace.js'))
			.pipe(concat('vendor.js'))
			.pipe(uglify())
			.pipe(gulp.dest(prod + '/vendor')),
		gulp.src(mainBower('**/*.css'))
			.pipe(concat('vendor.css'))
			.pipe(minifyCss())
			.pipe(gulp.dest(prod + '/vendor')),
		gulp.src(vendorFonts)
			.pipe(gulp.dest(prod + '/fonts')),
		gulp.src(vendorMaps)
			.pipe(gulp.dest(prod + '/vendor'))
	);
});

gulp.task('clean', function() {
	gulp.src(prod, {read: false})
		.pipe(clean());
});
