<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Nullix\CryptoJsAes\CryptoJsAes;
use Symfony\Component\HttpFoundation\Response;

class AuthWorkReportCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $req, Closure $next): Response
    {

//dd($req);

        if($req->session()->has('KPFWORKREPORT_APP')) {
            
            /**
             * ! 세션정보를 encrypt하여 controller로 넘겨준다.
             * 세션정보를 js controller에서 읽기 위해 암호화 함
             * .env VITE_TOKEN_KEY 암호화 하여 전달
             */
            $sessionInfo = $req->session()->get('KPFWORKREPORT_APP');
            $GlobalInfo = (object) array('islogin' =>true,'sessionInfo'=>$sessionInfo);
        } else {
            $GlobalInfo = (object) array('islogin' =>false,'sessionInfo'=>'');
        }
        
        $req->GlobalInfo = CryptoJsAes::encrypt($GlobalInfo, env('VITE_TOKEN_KEY'));
        $req->SendParam = $req->route('SendParam')?$req->route('SendParam'):'';

        if(!$req->session()->has('KPFWORKREPORT_APP') 
                    && ($req->path() !='workreport/index' 
                            && $req->path() !='workreport/main'
                    )){
                        return redirect('/workreport')->with([
                            'fail' => '로그인 후 이용가능합니다.',
                            'refurl' => $req->path() ?? '',
                        ]);
        }        
        return $next($req)->header('Cache-Control','no-cache, no-store, max-age=0, must-revalidate')
                              ->header('Pragma','no-cache')
                              ->header('Expires','Sat 01 Jan 1990 00:00:00 GMT');
    }
}
