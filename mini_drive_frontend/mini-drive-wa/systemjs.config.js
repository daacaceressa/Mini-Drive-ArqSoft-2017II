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

            // Angular specific mappings.
            '@angular/core': 'https://unpkg.com/@angular/core/bundles/core.umd.js',
            '@angular/animations': 'https://unpkg.com/@angular/animations/bundles/animations.umd.js',
            '@angular/common': 'https://unpkg.com/@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'https://unpkg.com/@angular/compiler/bundles/compiler.umd.js',
            '@angular/http': 'https://unpkg.com/@angular/http/bundles/http.umd.js',
            '@angular/forms': 'https://unpkg.com/@angular/forms/bundles/forms.umd.js',
            '@angular/router': 'https://unpkg.com/@angular/router/bundles/router.umd.js',
            '@angular/platform-browser': 'https://unpkg.com/@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'https://unpkg.com/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/animations/browser': 'https://unpkg.com/@angular/animations/bundles/animations-browser.umd.js',
            '@angular/platform-browser/animations': 'https://unpkg.com/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
            '@angular/material': 'https://unpkg.com/@angular/material/bundles/material.umd.js',
            '@angular/cdk': 'https://unpkg.com/@angular/cdk/bundles/cdk.umd.js',
            '@angular/cdk/a11y': 'https://unpkg.com/@angular/cdk/bundles/cdk-a11y.umd.js',
            '@angular/cdk/bidi': 'https://unpkg.com/@angular/cdk/bundles/cdk-bidi.umd.js',
            '@angular/cdk/coercion': 'https://unpkg.com/@angular/cdk/bundles/cdk-coercion.umd.js',
            '@angular/cdk/collections': 'https://unpkg.com/@angular/cdk/bundles/cdk-collections.umd.js',
            '@angular/cdk/keycodes': 'https://unpkg.com/@angular/cdk/bundles/cdk-keycodes.umd.js',
            '@angular/cdk/observers': 'https://unpkg.com/@angular/cdk/bundles/cdk-observers.umd.js',
            '@angular/cdk/overlay': 'https://unpkg.com/@angular/cdk/bundles/cdk-overlay.umd.js',
            '@angular/cdk/platform': 'https://unpkg.com/@angular/cdk/bundles/cdk-platform.umd.js',
            '@angular/cdk/portal': 'https://unpkg.com/@angular/cdk/bundles/cdk-portal.umd.js',
            '@angular/cdk/rxjs': 'https://unpkg.com/@angular/cdk/bundles/cdk-rxjs.umd.js',
            '@angular/cdk/scrolling': 'https://unpkg.com/@angular/cdk/bundles/cdk-scrolling.umd.js',
            '@angular/cdk/table': 'https://unpkg.com/@angular/cdk/bundles/cdk-table.umd.js',
            '@angular/cdk/stepper': 'https://unpkg.com/@angular/cdk/bundles/cdk-stepper.umd.js',

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
