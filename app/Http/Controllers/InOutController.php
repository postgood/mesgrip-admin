<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Storage;

class InOutController extends Controller
{

    public function main(Request $req)
    {
        // 회원사 작업자 로그인
        if($req->session()->get('KPFINOUT_APP')) {    
            return redirect('/inout/dashboard');
        
        // 미 로그인 (로그인 페이지로 이동)
        } else {
            $data = ['GlobalInfo'=>$req->GlobalInfo, 'SendParam'=> $req->SendParam];
            return view('pages/mobile/inout/inoutMain',$data);
        }
    }

    public function dashboard(Request $req)
    {
        $data = ['GlobalInfo'=>$req->GlobalInfo, 'SendParam'=> $req->SendParam];
        return view('pages/mobile/inout/inoutDashboard',$data);
    }

    function logout(Request $req)
    {
        $req->session()->forget('KPFINOUT_APP');
        return redirect('/inout');
    }

    public function pages(Request $req)
    {
		$sendParam = $req->SendParam;

        // $sendParam가 null인지 확인
        if ($sendParam === null) {
            abort(404); // 404 에러 페이지로 리다이렉트
        }

        // 해당하는 view를 로드하고, view가 존재하지 않는 경우 404 에러 페이지로 리다이렉트
        try {
            $sessionInfo = $req->session()->get('KPFINOUT_APP');
            $data = ['GlobalInfo'=>$req->GlobalInfo,'sessionInfo'=>$sessionInfo, 'SendParam'=> $req->SendParam];
            return view('pages/template/'.$sendParam, $data);
        } catch (Exception $e) {
            abort(404); // 404 에러 페이지로 리다이렉트
        }
	}

    public function layerpopup(Request $req)
    {
		$sendParam = $req->SendParam;

        // $sendParam가 null인지 확인
        if ($sendParam === null) {
            abort(404); // 404 에러 페이지로 리다이렉트
        }

        // 해당하는 view를 로드하고, view가 존재하지 않는 경우 404 에러 페이지로 리다이렉트
        try {
            $sessionInfo = $req->session()->get('KPFINOUT_APP');
            $data = ['GlobalInfo'=>$req->GlobalInfo,'sessionInfo'=>$sessionInfo, 'SendParam'=> $req->SendParam];

            return view('pages/layerpopup/'.$sendParam, $data);
        } catch (Exception $e) {
            abort(404); // 404 에러 페이지로 리다이렉트
        }
	}
}
?>