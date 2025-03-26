<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

/** 미로그인 상태 **/
// 거래처/회원사 LOGIN
Route::get('/', [MainController::class, 'main'])->name('main');
Route::get('/login', [MainController::class, 'main'])->name('main');
Route::get('/join', [MainController::class, 'join'])->name('join');
Route::get('/find', [MainController::class, 'find'])->name('find');
Route::get('/empty', [MainController::class, 'empty'])->name('empty');
Route::post('/auth/check',[MainController::class, 'check'])->name('auth.check');


if (env('APP_ENV') == 'production') {
    \Illuminate\Support\Facades\URL::forceScheme('https');
}

// 존재하지 않는 페이지를 처리하는 라우트
Route::fallback(function () {
	return redirect('/'); // 존재하지 않는 페이지로 접근 시 로그인 페이지로 자동이동
});


/** 로그인 상태 **/
// 회원사 Member
Route::group(['middleware'=>['AuthAdmCheck']], function(){
	Route::get('/adm/logout',[MainController::class, 'logout'])->name('adm.logout');
	Route::get('/adm/dashboard', [MainController::class, 'dashboard'])->name('adm.dashboard');

	// 템플릿
	Route::get('/temp/{SendParam}', [MainController::class, 'pages'])->name('temp.pages');
	// 팝업레이어
	Route::get('/layer/{SendParam}', [MainController::class, 'layerpopup'])->name('telayerp.layerpopup');
});

