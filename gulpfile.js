const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const browserify = require('browserify');
const source = require('vinyl-source-stream')
const electron = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const { inspect } = require('browserify-debug-tools');

gulp.task('clean', () => {
	return gulp.src('dist/*', { read: false })
		.pipe(plugins.clean());
});

gulp.task('root', () => {
	return gulp.src('src/*.*')
		.pipe(gulp.dest('dist/'));
});

gulp.task('main', () => {
	return gulp.src(['src/main/**/*'])
		.pipe(gulp.dest('dist/main'));
});

gulp.task('assets', () => {
	return gulp.src('src/assets/**/*')
		.pipe(gulp.dest('dist/assets'));
});

gulp.task('scripts', () => {
	return browserify()
		.require('./src/renderer/js/main.js', { entry: true })
		.transform('babelify')
		.transform('vueify')
		/*.transform('aliasify', {
			aliases: {
				"vue": "vue/dist/vue.common.js"
			}
		})*/
		.external(['mpc-js', 'fs'])
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('dist/renderer/js'));
});

gulp.task('icons', () => {
    return gulp.src('node_modules/fontawesome/fonts/**.*')
        .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('css', () => {
	return gulp.src('src/renderer/css/**/*.css')
		.pipe(gulp.dest('dist/renderer/css'));
});

gulp.task('sass', () => {
	return gulp.src('src/renderer/css/**/*.scss')
		.pipe(plugins.sass({ includePaths: ['node_modules/bulma/', 'node_modules/font-awesome/scss'] }).on('error', plugins.sass.logError))
		.pipe(gulp.dest('dist/renderer/css'));
})

gulp.task('index', () => {
	return gulp.src('src/renderer/*.*')
		.pipe(gulp.dest('dist/renderer'));
});

gulp.task('spawn-electron', () => {
	return spawn(electron, ['.'], {
		stdio: 'inherit',
		env: process.env,
		cwd: path.join(process.cwd(), 'dist')
	});
});

gulp.task('watch', () => {
	gulp.watch('src/main/**/*', 'main');
	gulp.watch('src/renderer/**/*', 'renderer');
});


gulp.task('styles', gulp.parallel('css', 'sass'));
gulp.task('renderer', gulp.parallel('index', 'styles', 'scripts', 'icons', 'assets'));
gulp.task('build', gulp.series('root', gulp.parallel('main', 'renderer')));
gulp.task('run', gulp.series('clean', 'build', 'spawn-electron'));
gulp.task('default', gulp.series('clean', 'build'));
