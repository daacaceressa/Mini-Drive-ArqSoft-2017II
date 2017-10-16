/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',


            // other libraries
            'rxjs': 'npm:rxjs',
            'ngx-dropzone-wrapper': 'npm:ngx-dropzone-wrapper/bundles/ngx-dropzone-wrapper.umd.js',
            'ng2-pdf-viewer': 'node_modules/ng2-pdf-viewer',
            'pdfjs-dist': 'node_modules/pdfjs-dist',
            'file-saver': 'npm:@types/file-saver/index.d.ts',


        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                main: './Rx.js',
                defaultExtension: 'js'
            },
            'ng2-pdf-viewer': { main: 'dist/index.js', defaultExtension: 'js' },
            'pdfjs-dist': { defaultExtension: 'js' },
            'angular2-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
        }
    });
})(this);
