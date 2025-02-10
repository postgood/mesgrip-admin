<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Storage;

class PublicController extends Controller
{
    /*
    public function main(Request $req)
    {
        $data = ['GlobalInfo'=>$req->GlobalInfo, 'SendParam'=> $req->SendParam];
        return view('pages/public/workReport',$data);
    }
    public function workReport(Request $req)
    {
        $data = ['GlobalInfo'=>$req->GlobalInfo, 'SendParam'=> $req->SendParam];
        return view('pages/public/workReport',$data);
    }
    public function qrtest(Request $req)
    {
        $data = ['GlobalInfo'=>$req->GlobalInfo, 'SendParam'=> $req->SendParam];
        return view('pages/public/qrtest',$data);
    }
        */
}
?>