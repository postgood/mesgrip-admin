<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Storage;

class workReportController extends Controller
{
    public function main(Request $req)
    {
        $p = $req->query('p');
        error_log($p);
        $req->session()->forget('KPFWORKREPORT_APP');

        error_log($p);
        // 회원사 작업자 로그인
        if(strlen($p) > 0 && $req->session()->get('KPFWORKREPORT_APP')) {    
            error_log($req->GlobalInfo);
            $data = ['GlobalInfo'=>$req->GlobalInfo, 'SendParam'=> $req->SendParam,'p'=>$req->p];
            return redirect('/workreport/dashboard')->with(['p'=>$req->p]);
        // 미 로그인 (로그인 페이지로 이동)
        } else {
            $data = ['GlobalInfo'=>$req->GlobalInfo, 'SendParam'=> $req->SendParam,'p'=>$req->p];
            return view('pages/mobile/workReport/workReportMain',$data);
        }

    }

    public function dashboard(Request $req)
    {
        //dd($req);
        error_log('dashboard');
        error_log($req->p);
        $data = ['GlobalInfo'=>$req->GlobalInfo, 'SendParam'=> $req->SendParam,'p'=> $req->p];
        return view('pages/mobile/workReport/workReportDashboard',$data)->with("message", "Comment posted");;
    }

    function logout(Request $req)
    {
        $req->session()->forget('KPFWORKREPORT_APP');
        return redirect('/workreport');
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
            $sessionInfo = $req->session()->get('KPFWORKREPORT_APP');
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
            $sessionInfo = $req->session()->get('KPFWORKREPORT_APP');
            $data = ['GlobalInfo'=>$req->GlobalInfo,'sessionInfo'=>$sessionInfo, 'SendParam'=> $req->SendParam];

            return view('pages/layerpopup/'.$sendParam, $data);
        } catch (Exception $e) {
            abort(404); // 404 에러 페이지로 리다이렉트
        }
	}
    public function workReport(Request $req)
    {
        $data = ['GlobalInfo'=>$req->GlobalInfo, 'SendParam'=> $req->SendParam];
        return view('pages/mobile/workReport/workReport',$data);
    }
}
?>