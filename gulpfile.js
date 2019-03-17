// dependências
const gulp = require('gulp'); // a declaração require diz para o Node procurar dentro da pasta node_modules por um pacote chamado gulp e atribuir o conteúdo dele para a variável gulp
const sass = require('gulp-sass'); // procura o pacote gulp-sass e atribui o conteúdo para a variável
const rename = require('gulp-rename'); // procura o pacote gulp-rename e atribui o conteúdo para a variável
const changed = require('gulp-changed'); // procura o pacote gulp-changed e atribui o conteúdo para a variável
const browserSync = require('browser-sync').create(); // procura o pacote browser-sync e atribui o conteúdo para a variável

// Pastas sass
var scssFiles = './scss/**/*.scss'; // armazena na variável o caminho das pastas scss e os arquivos scss dentro dela
var cssFiles = './css'; // armazena na variável o caminho das pastas css e os arquivos css dentro dela

gulp.task('styles', done => { // cria uma function styles que será definido as propriedades do sass
    gulp.src(scssFiles)
        .pipe(sass().on('error', sass.logError)) // o .pipe() está utilizando para chamar a tarefa do sass(), caso tenha erro nele aparecerá qual foi o mesmo
        .pipe(rename({ suffix: '.min' })) // o .pipe() chama a tarefa de rename() e adiciona o sulfixo .min nos arquivos css gerados 
        .pipe(changed(cssFiles)) // o .pipe() chama a tarefa chenged() que modifica o arquivo css toda vez que complilado o arquivo .scss
        .pipe(gulp.dest(cssFiles)) // o .pipe(gulp.dest()) diz qual será o destino do arquivo compilado
        .pipe(browserSync.reload({stream: true})); // o .pipe() chama a tarefa browser-sync, e deixa ativo a opção stream para que leia sempre o arquivo

        done();
});

gulp.task('server', done => { // cria uma function server que será definido as propriedas do browser sync
    browserSync.init({
        server: {
            baseDir: "./" // cria o servidor a partir da pasta raiz, o index.html
        }
    });

    gulp.watch(scssFiles, gulp.series('styles')); // cria a tarefa watch que obversa os arquivos da function "styles", e quando alterados é disparado a compilação dos arquivos
    gulp.watch("./**/*.html").on('change', browserSync.reload); // cria a tarefa watch que observa os arquivos .html, e quando salvos a página é recarregada

    done();
});

gulp.task('gabi-linda', gulp.series(['server', 'styles']), done =>{
    done();
}); // cria uma function que quando ativada no terminal "gulp gabi-linda", roda as functions "server" e "styles"