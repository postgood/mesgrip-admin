<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MemberController extends Controller
{
    function logout(Request $req)
    {
        $req->session()->forget('KPFMEM_APP');
        return redirect('/');
    }

    function dashboard(Request $req)
    {
        $sessionInfo = $req->session()->get('KPFMEM_APP');
        $data = ['GlobalInfo'=>$req->GlobalInfo,'sessionInfo'=>$sessionInfo, 'SendParam'=> $req->SendParam];
        return view('pages/mem/dashboard',$data);
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
            $sessionInfo = $req->session()->get('KPFMEM_APP');
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
            $sessionInfo = $req->session()->get('KPFMEM_APP');
            $data = ['GlobalInfo'=>$req->GlobalInfo,'sessionInfo'=>$sessionInfo, 'SendParam'=> $req->SendParam];

            return view('pages/layerpopup/'.$sendParam, $data);
        } catch (Exception $e) {
            abort(404); // 404 에러 페이지로 리다이렉트
        }
	}
}

