<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('media', function () {
    // return (int) $user->id === (int) $id;
});


Broadcast::channel('ods-notifications', function () {
    // return (int) $user->id === (int) $id;
});


Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

