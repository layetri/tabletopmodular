<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('room.{room}', function($user, $room) {
  return $user->rooms()->where('key', $room)->count() > 0;
});

Broadcast::channel('presence.{room}', function($user, $room) {
  if($user->rooms()->where('key', $room)->count() > 0) {
    return ['name' => $user->name, 'id' => $user->id];
  } else {
    return response("You are not a member of this room.", 419);
  }
});
