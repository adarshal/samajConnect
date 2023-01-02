const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');



gulp.task('css', function(){
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')  //* means any ** any file inside saas folder
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    return gulp.src('./assets/**/*.css')
    .pipe(rev()) //reversioning renaming
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
})


gulp.task('js', function(done){
    console.log('minifying js...');
     gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});


gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)') //* used for regex any .jpg .png... files
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


// empty the public/assets directory
// import {deleteAsync} from 'del';
const del = require('del');
// import {deleteAsync} from 'del';

// const deletedFilePaths = await deleteAsync(['./public/assets/*', '!temp/unicorn.js']);
// console.log('Deleted files:\n', deletedFilePaths.join('\n'));
gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets');
    done();
});