<DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
	@include('includes.admhead')
    <body>
        <div class="wrap" id="ctrTabWrapaa">
                @include('includes.topbar')
                @include('includes.leftmenu')
                @yield('content')
                @include('includes.footer')
        </div>
    </body>

    <script>
        var __GLOBALINFO = '{!! $GlobalInfo ?? "" !!}';
        var __ROUTE_HOST = '{{ Request::getHost() }}';
        var __ROUTE_PATH = '{{ Request::path() }}';
        var __CSRF_TOKEN = '{{ csrf_token() }}';
        var __SEND_PARAMS = '{!! $SendParam ? urldecode( $SendParam ):"" !!}';
        var __FILE_DOMIN = 'https://kprintfactory.s3.ap-northeast-2.amazonaws.com';

        function checkPop() {
            let gsWin = window.open('about:blank','popWindow','width=1128,height=876');
            return true;
        }
    </script>

    @yield('scripts')
</html>