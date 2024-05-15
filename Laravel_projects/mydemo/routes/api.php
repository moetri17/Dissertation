<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PrayerTimesController;
use App\Http\Controllers\QuranController;
use App\Http\Controllers\AzkarController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventsController;

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

Route::get('/prayer-times', [PrayerTimesController::class, 'index']);

Route::get('/next-prayer-time', [PrayerTimesController::class, 'nextPrayerTime']);

Route::get('/azkar/morning', [AzkarController::class, 'morningAzkar']);

Route::get('/azkar/evening', [AzkarController::class, 'eveningAzkar']);

Route::get('/azkar/night', [AzkarController::class, 'nightAzkar']);

Route::get('/quran/surahsList', [QuranController::class, 'listSurahs']);

Route::get('/quran/pagesList', [QuranController::class, 'listPages']);

Route::get('/quran/juzList', [QuranController::class, 'listJuz']);

Route::get('/quran/pages', [QuranController::class, 'getPage']);

Route::post('/users', [UserController::class, 'store']);

Route::get('/users', [UserController::class, 'getAllUsers']);

Route::get('/users/{uid}', [UserController::class, 'getUsers']);

Route::put('/users/{uid}/admin-status', [UserController::class, 'toggleAdminStatus']);

Route::apiResource('events', EventsController::class);

