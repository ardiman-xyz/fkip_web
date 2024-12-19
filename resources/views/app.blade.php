<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" type="image/x-icon" href="/fkip_ic.ico">
    @if(isset($page['props']['meta']))
        <title>{{ $page['props']['meta']['title'] }}</title>
        <meta name="title" content="{{ $page['props']['meta']['title'] }}">
        <meta name="description" content="{{ $page['props']['meta']['description'] }}">

        <meta property="og:type" content="{{ $page['props']['meta']['type'] }}">
        <meta property="og:url" content="{{ $page['props']['meta']['url'] }}">
        <meta property="og:title" content="{{ $page['props']['meta']['title'] }}">
        <meta property="og:description" content="{{ $page['props']['meta']['description'] }}">
        <meta property="og:image" content="{{ $page['props']['meta']['image'] }}">
        <meta property="og:site_name" content="FKIP UMKendari">

        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $page['props']['meta']['title'] }}">
        <meta name="twitter:description" content="{{ $page['props']['meta']['description'] }}">
        <meta name="twitter:image" content="{{ $page['props']['meta']['image'] }}">
    @endif

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
</head>
<body>
@inertia
</body>
</html>
