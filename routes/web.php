<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\InOutController;
use App\Http\Controllers\WorkReportController;
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

Route::get('/work', [WorkController::class, 'main'])->name('work');
Route::get('/work/login', [WorkController::class, 'main'])->name('work.login');
Route::get('/work/dashboard', [WorkController::class, 'main'])->name('work.login');
Route::post('/work/auth/check',[MainController::class, 'workLoginCheck'])->name('work.auth.check');

Route::get('/inout', [InOutController::class, 'main'])->name('inout');
Route::get('/inout/login', [InOutController::class, 'main'])->name('inout.login');
Route::get('/inout/dashboard', [InOutController::class, 'main'])->name('inout.login');
Route::post('/inout/auth/check',[MainController::class, 'inoutLoginCheck'])->name('inout.auth.check');

Route::get('/workreport',[WorkReportController::class, 'main'])->name('workreport');
Route::get('/workreport/login', [WorkReportController::class, 'main'])->name('workreport.login');
Route::get('/workreport/dashboard', [WorkReportController::class, 'main'])->name('workreport.login');
Route::post('/workreport/auth/check',[MainController::class, 'workReportLoginCheck'])->name('workreport.auth.check');

if (env('APP_ENV') == 'production') {
    \Illuminate\Support\Facades\URL::forceScheme('https');
}

// 존재하지 않는 페이지를 처리하는 라우트
Route::fallback(function () {
	return redirect('/'); // 존재하지 않는 페이지로 접근 시 로그인 페이지로 자동이동
});


/** 로그인 상태 **/
// 회원사 Member
Route::group(['middleware'=>['AuthMemCheck']], function(){
	Route::get('/mem/logout',[MemberController::class, 'logout'])->name('mem.logout');
	Route::get('/mem/dashboard', [MemberController::class, 'dashboard'])->name('mem.dashboard');

	// 템플릿
	Route::get('/temp/{SendParam}', [MemberController::class, 'pages'])->name('temp.pages');
	// 팝업레이어
	Route::get('/layer/{SendParam}', [MemberController::class, 'layerpopup'])->name('telayerp.layerpopup');
});

// 회원사 생산모듈
Route::group(['middleware'=>['AuthWorkCheck']], function(){
	Route::get('/work/logout',[WorkController::class, 'logout'])->name('work.logout');
	Route::get('/work/dashboard', [WorkController::class, 'dashboard'])->name('work.workDashboard');

	// 템플릿
	Route::get('/tempWork/{SendParam}', [WorkController::class, 'pages'])->name('work.pages');
	// 팝업레이어
	Route::get('/layer/{SendParam}', [WorkController::class, 'layerpopup'])->name('work.layerpopup');
});

// 회원사 물류모듈
Route::group(['middleware'=>['AuthInoutCheck']], function(){
	Route::get('/inout/logout',[InOutController::class, 'logout'])->name('inout.logout');
	Route::get('/inout/dashboard', [InOutController::class, 'dashboard'])->name('inout.workDashboard');

	// 템플릿
	Route::get('/tempInout/{SendParam}', [InOutController::class, 'pages'])->name('inout.pages');
	// 팝업레이어
	Route::get('/layer/{SendParam}', [InOutController::class, 'layerpopup'])->name('inout.layerpopup');
});

// 거래처 Account
Route::group(['middleware'=>['AuthActCheck']], function(){
	Route::get('/act/logout',[AccountController::class, 'logout'])->name('act.logout');
	Route::get('/act/dashboard', [AccountController::class, 'dashboard'])->name('oact.dashboard');
	Route::get('/tempAct/{SendParam}', [AccountController::class, 'pages'])->name('temp.pages');
	// 팝업레이어
	Route::get('/layer/{SendParam}', [AccountController::class, 'layerpopup'])->name('telayerp.layerpopup');

});

// 외주 거래처 작업지시서
Route::group(['middleware'=>['AuthWorkReportCheck']], function(){
	Route::get('/workreport/logout',[WorkReportController::class, 'logout'])->name('workreport.logout');
	Route::get('/workreport/dashboard', [WorkReportController::class, 'dashboard'])->name('workreport.workDashboard');
	// 템플릿
	Route::get('/tempWorkreport/{SendParam}', [WorkReportController::class, 'pages'])->name('workreport.pages');
	// 팝업레이어
	Route::get('/layer/{SendParam}', [WorkReportController::class, 'layerpopup'])->name('workreport.layerpopup');
});
