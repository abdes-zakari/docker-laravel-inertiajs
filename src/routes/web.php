<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestController;

// Route::get('/', function () {
//     return view('app');
// });

 Route::get('/', [TestController::class, 'show']);
