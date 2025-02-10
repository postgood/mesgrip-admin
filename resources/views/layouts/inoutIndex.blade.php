<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
	@include('includes.inouthead')
    <body>
        @yield('content')
    </body>

    <script>
        var __GLOBALINFO = '{!! $GlobalInfo ?? "" !!}';
        var __ROUTE_HOST = '{{ Request::getHost() }}';
        var __ROUTE_PATH = '{{ Request::path() }}';
        var __CSRF_TOKEN = '{{ csrf_token() }}';
        var __SEND_PARAMS = '{!! $SendParam ? urldecode( $SendParam ):"" !!}';

        function checkPop() {
            let gsWin = window.open('about:blank','popWindow','width=1128,height=876');
            return true;
        }
    </script>

    @yield('scripts')
</html>