// import gulp from 'gulp';
// import zip from 'gulp-zip';
// import del from 'del';
const gulp = require('gulp');
const zip = require('gulp-zip');
const del = require('del');


gulp.task('clean', () => {
	return del([
		'languages',
		'bundled'
	]);
});

exports.bundle = () => (
	gulp.src([
		'**/*',
		'!bundled/**',
		'!node_modules/**',
		'!src/**',
		'!.eslintrc.js',
		'!.gitignore',
		'!gulpfile.js',
		'!package.json',
		'!package-lock.json',
		'!readme.md',
		'!todo.txt',
		'!webpack.config.cjs',
	])
		.pipe(zip('tab-content-block.zip'))
		.pipe(gulp.dest('bundled'))
);