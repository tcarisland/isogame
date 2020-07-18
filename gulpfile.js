const gulp = require('gulp');
const ftp  = require('vinyl-ftp');

var login = require('./login.json');
var globs = ['build/*', 'build/**'];

gulp.task('deploy', function() {
    const conn = ftp({
        host: login.host,
	user: login.user,
	password: login.pass,
	port: login.port,
	parallel: 10,
	reload: true
    });
    return gulp
    	   .src(globs, { base: './build', buffer: false })
	   .pipe(conn.dest('/www/isogame'));
});

gulp.task('default', gulp.series(['deploy']));
