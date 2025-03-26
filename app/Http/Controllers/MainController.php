<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Storage;

class MainController extends Controller
{
    public function main(Request $req)
    {
        // 관리자 로그인
        if($req->session()->get('KPFADM_APP')) {    
            return redirect('/adm/dashboard');
        
        // 미 로그인 (로그인 페이지로 이동)
        } else {
            $data = ['GlobalInfo'=>$req->GlobalInfo, 'SendParam'=> $req->SendParam];
            return view('pages/main',$data);
        }
    }
    function logout(Request $req)
    {
        $req->session()->forget('KPFADM_APP');
        return redirect('/');
    }

    function dashboard(Request $req)
    {
        $sessionInfo = $req->session()->get('KPFADM_APP');
        //dd(property_exists($sessionInfo,'Domain'));
        if(!property_exists($sessionInfo,'Domain') || $sessionInfo->Domain != $req->server('HTTP_HOST')){
            //dd($sessionInfo);
            $req->session()->forget('KPFADM_APP');
            return redirect('/');
        }
        $data = ['GlobalInfo'=>$req->GlobalInfo,'sessionInfo'=>$sessionInfo, 'SendParam'=> $req->SendParam];
        return view('pages/adm/dashboard',$data);
    }

    public function join(Request $req)
    {
        $data = ['GlobalInfo'=>$req->GlobalInfo, 'SendParam'=> $req->SendParam];
        return view('pages/join',$data);
    }

    public function find(Request $req)
    {
        $data = ['GlobalInfo'=>$req->GlobalInfo, 'SendParam'=> $req->SendParam];
        return view('pages/find',$data);
    }

    public function empty(Request $req)
    {
        $data = ['GlobalInfo'=>$req->GlobalInfo, 'SendParam'=> $req->SendParam];
        return view('pages/empty',$data);
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
    function check(Request $req) {

        $request = Request::capture();
        $host = $request->getHost();
        $port = $request->getPort();
        /**
         * 로그인 API호출
         */
        $result = $this->callApi("/public/ws", [
            'ctl'           => 'admin',
            'cmd'           => 'login',
            'privatekey'    => env('PRIVATEKEY'),
            'memberID'        => trim($req->input()['userid']),
            'memberPwd'        => trim($req->input()['encpwd'])
        ]);
        $resultData = json_decode($result);
        if($resultData->code==0)
        {
            $respData = $resultData->data;

            $userInfo = $respData->userInfo;
            $userInfo->AccessToken = $respData->accessToken;
            $userInfo->AuthKey = $respData->authKey;
            $userInfo->Domain = $req->server('HTTP_HOST');


            if($userInfo->authLevel > 4) {
                $userInfo->OutPath = '/adm/logout';
                $req->session()->put('KPFADM_APP',$userInfo);
                return redirect('/adm/dashboard');
            }

            return redirect('empty')->with('fail','로그인 정보를 다시 확인해 주세요.');

        } else {
            return back()->with('fail',$resultData->message);
        }
    }
    
    public function callApi($url,$param,$token=null)
    {
        $reqHeaders = getallheaders();

        $ApiUrl = env('VITE_ENVIRONMENT')=='dev'?env('VITE_TEST_API_URL'):env('VITE_API_URL');
        $ApiUrl .= $url;

        $ch = curl_init();
        $headers = array('Accept: application/json', 'Content-Type: application/json');
        foreach ($reqHeaders as $name => $value) {
            if($name == 'User-Agent') array_push($headers, $name.':'.$value);
            else if($name == 'Sec-Ch-Ua') array_push($headers, $name.':'.$value);
            else if($name == 'Sec-Ch-Ua-Platform') array_push($headers, $name.':'.$value);
            else if($name == 'Referer') array_push($headers, $name.':'.$value);
        }
        if($token)
        {
            $authorization = "Authorization: Bearer ".$token; // Prepare the authorisation token
            array_push($headers,$authorization);
        }
        curl_setopt($ch, CURLOPT_URL, $ApiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        if (empty($param) === false) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($param));
        }
        curl_setopt($ch, CURLOPT_POST, 1);
        
        $result = curl_exec($ch);

        curl_close($ch);

        return $result;
    }
}
?>