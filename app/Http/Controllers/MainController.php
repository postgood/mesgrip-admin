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
        // 회원사 로그인
        if($req->session()->get('KPFMEM_APP')) {    
            return redirect('/mem/dashboard');

        // 거래처 로그인
        } elseif($req->session()->get('KPFACT_APP')) {
            return redirect('/act/dashboard');
        
        // 미 로그인 (로그인 페이지로 이동)
        } else {
            $data = ['GlobalInfo'=>$req->GlobalInfo, 'SendParam'=> $req->SendParam];
            return view('pages/main',$data);
        }
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

    public function workReport(Request $req)
    {
        $data = ['GlobalInfo'=>$req->GlobalInfo, 'SendParam'=> $req->SendParam];
        return view('pages/workReport',$data);
    }

    function check(Request $req) {

        $request = Request::capture();
        $host = $request->getHost();
        $port = $request->getPort();
        /**
         * 로그인 API호출
         */
        $result = $this->callApi("/public/ws", [
            'ctl'           => 'company',
            'cmd'           => 'login',
            'privatekey'    => env('PRIVATEKEY'),
            'host'			=> $host, 
            'userId'        => trim($req->input()['userid']),
            'encPwd'        => trim($req->input()['encpwd'])
        ]);
        $resultData = json_decode($result);
        if($resultData->code==0)
        {
            $respData = $resultData->data;

            $userInfo = $respData->userInfo;
            $userInfo->AccessToken = $respData->accessToken;
            $userInfo->AuthKey = $respData->authKey;

            // authLevel 3 : 거래처, 4 : 회원사
            if($userInfo->authLevel == 3) {
                $userInfo->OutPath = '/act/logout';
                $req->session()->put('KPFACT_APP',$userInfo);
                return redirect('/act/dashboard');
            } else if($userInfo->authLevel == 4) {
                $userInfo->OutPath = '/mem/logout';
                $req->session()->put('KPFMEM_APP',$userInfo);
                return redirect('/mem/dashboard');
            }

            return redirect('empty')->with('fail','로그인 정보를 다시 확인해 주세요.');

        } else {
            return back()->with('fail',$resultData->message);
        }
    }
    function workLoginCheck(Request $req) {
        
        $request = Request::capture();
        $host = $request->getHost();
        $port = $request->getPort();
        /**
         * 로그인 API호출
         */
        $result = $this->callApi("/public/ws", [
            'ctl'           => 'company',
            'cmd'           => 'login',
            'privatekey'    => env('PRIVATEKEY'),
            'host'			=> $host, 
            'userId'        => trim($req->input()['userid']),
            'encPwd'        => trim($req->input()['encpwd'])
        ]);

        $resultData = json_decode($result);
        $message = '로그인 정보를 다시 확인해 주세요.';
        if($resultData->code==0)
        {
            $respData = $resultData->data;
            $userInfo = $respData->userInfo;
            $userInfo->AccessToken = $respData->accessToken;
            $userInfo->AuthKey = $respData->authKey;
            
            // authLevel 4 : 회원사 직원
            if($userInfo->authLevel == 4) {
                $userInfo->OutPath = '/work/logout';
                $req->session()->put('KPFWORK_APP',$userInfo);
                return redirect('/work/dashboard');
            }else if($userInfo->authLevel > 0){
                $message = '본사 직원만 접근 가능합니다.';
            }

            return redirect('/work')->with('fail',$message);

        } else {
            return redirect('/work')->with('fail',$message);
            //return back()->with('fail',$resultData->message);
        }
    }
    function inoutLoginCheck(Request $req) {
        
        $request = Request::capture();
        $host = $request->getHost();
        $port = $request->getPort();
        /**
         * 로그인 API호출
         */
        $result = $this->callApi("/public/ws", [
            'ctl'           => 'company',
            'cmd'           => 'login',
            'privatekey'    => env('PRIVATEKEY'),
            'host'			=> $host, 
            'userId'        => trim($req->input()['userid']),
            'encPwd'        => trim($req->input()['encpwd'])
        ]);

        $resultData = json_decode($result);
        $message = '로그인 정보를 다시 확인해 주세요.';
        if($resultData->code==0)
        {
            $respData = $resultData->data;
            $userInfo = $respData->userInfo;
            $userInfo->AccessToken = $respData->accessToken;
            $userInfo->AuthKey = $respData->authKey;
            
            // authLevel 4 : 회원사 직원
            if($userInfo->authLevel == 4) {
                $userInfo->OutPath = '/inout/logout';
                $req->session()->put('KPFINOUT_APP',$userInfo);
                return redirect('/inout/dashboard');
            }else if($userInfo->authLevel > 0){
                $message = '본사 직원만 접근 가능합니다.';
            }

            return redirect('/inout')->with('fail',$message);

        } else {
            return redirect('/inout')->with('fail',$message);
            //return back()->with('fail',$resultData->message);
        }
    }

    function workReportLoginCheck(Request $req) {
        error_log('workReportLoginCheck');
        error_log($req->p);
        $p = $req->p;
        //$p = trim($req->input()['p']);
        if(strlen($p) == 0){
            return redirect('/workreport?p='.$p)->with('fail','작업 지시서 QR코드를 스캔하여 진입하십시요');
        }
        $request = Request::capture();
        $host = $request->getHost();
        $port = $request->getPort();
        /**
         * 로그인 API호출
         */
        $result = $this->callApi("/public/ws", [
            'ctl'           => 'company',
            'cmd'           => 'login',
            'privatekey'    => env('PRIVATEKEY'),
            'host'			=> $host, 
            'userId'        => trim($req->input()['userid']),
            'encPwd'        => trim($req->input()['encpwd'])
        ]);

        $resultData = json_decode($result);
        $message = '로그인 정보를 다시 확인해 주세요.';
        if($resultData->code==0)
        {
            $respData = $resultData->data;
            $userInfo = $respData->userInfo;
            $userInfo->AccessToken = $respData->accessToken;
            $userInfo->AuthKey = $respData->authKey;
            
            // authLevel 3 : 거래처 직원
            if($userInfo->authLevel == 3) {
                $userInfo->OutPath = '/workreport/logout';
                $req->session()->put('KPFWORKREPORT_APP',$userInfo);
                return redirect('/workreport/dashboard?p='.$p); 
            }else if($userInfo->authLevel > 0){
                $message = '등록된 거래처 직원만 접근 가능합니다.';
            }

            return redirect('/workreport?p='. $p)->with('fail',$message);

        } else {
            return redirect('/workreport?p='. $p)->with('fail',$message);
            //return back()->with('fail',$resultData->message);
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