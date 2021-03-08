<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

        <title>{{ config('app.name', 'Horizon') }}</title>
        
        <link rel="stylesheet" href="{{ asset('css/style.css') }}">
        <script src="{{ asset('js/app.js') }}" defer></script>
        <script src="{{ asset('js/bootstrap.bundle.min.js') }}" defer></script>
        <script src="{{ asset('js/fonts/brands.min.js') }}" defer></script>
        <script src="{{ asset('js/fonts/regular.min.js') }}" defer></script>
        <script src="{{ asset('js/fonts/fontawesome.min.js') }}" defer></script>
    </head>
    <body>
        @inertia
    </body>
</html>