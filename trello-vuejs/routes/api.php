<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//Route::get('/desk', [\App\Http\Controllers\api\DeskController::class, 'index']);
//Route::get('/desk/{desk}', [\App\Http\Controllers\api\DeskController::class, 'show']);
//Route::put('/desk/{desk}', [\App\Http\Controllers\api\DeskController::class, 'update']);
Route::apiResources([
    'desk' => \App\Http\Controllers\api\DeskController::class,
    'desk-lists' => \App\Http\Controllers\api\DeskListController::class,
    'card' => \App\Http\Controllers\api\CardController::class
]);
