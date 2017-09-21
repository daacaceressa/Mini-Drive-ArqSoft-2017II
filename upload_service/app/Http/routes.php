<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::post('uploadFile/{id}', ['as' => 'uploadFile', 'uses' => 'FileController@uploadFile']);
Route::get('listOfFiles/{id}', ['as' => 'listOfFiles', 'uses' => 'FileController@listOfFiles']);
Route::post('deleteFile', ['as' => 'deleteFile', 'uses' => 'FileController@deleteFile']);
Route::get('downloadFile/{one?}/{two?}/{three?}/{four?}/{five?}', ['as' => 'downloadFile', 'uses' => 'FileController@downloadFile']);

