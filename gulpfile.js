var gulp = require("gulp");
var del = require("del");
var ts = require("gulp-typescript");
var babel = require("gulp-babel");
var exec = require("gulp-shell");

var BUILT_FOLDER = './built';
var BACKEND_SOURCE_FOLDER = "./src/main/backend/";
var BACKEND_BUILT_FOLDER = "./built/main/backend/";

gulp.task("clean", clean);

gulp.task("build", build);

gulp.task("clean,build", function () {
    return clean().then(build);
});

gulp.task('run', exec.task('node ' + BACKEND_BUILT_FOLDER + 'index.js'));

function clean() {
    return del(BUILT_FOLDER);
}

function build() {
    return gulp.src([BACKEND_SOURCE_FOLDER + "**/*.ts", "./typings/index.d.ts"])
        .pipe(typeScriptToEcmaScript2015())
        .pipe(ecmaScript2015ToNodeEcmaScript2015())
        .pipe(gulp.dest(BACKEND_BUILT_FOLDER));
}

function typeScriptToEcmaScript2015() {
    return ts({
        jsx: "react",
        target: "ES6"
    });
}

function ecmaScript2015ToNodeEcmaScript2015(){
    return babel({
        presets: ["es2015-node"]
    });
}
