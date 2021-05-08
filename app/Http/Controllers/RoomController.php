<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    public function make(Request $request) {
      $room = new Room([
        'key' => $request->input('code'),
        'max_players' => $request->input('max_players'),
        'synth_type' => $request->input('synth'),
        'host' => Auth::id()
      ]);

      Auth::user()->rooms()->save($room);
    }

    public function getHistory() {
      if(Auth::check()) {
        return Auth::user()->rooms()->get();
      } else {
        return [];
      }
    }

    public function getRoom($key) {
      $room = Room::where('key', $key)->first();
      if($room) {
        if(!Auth::user()->rooms()->find($room->id)) {
          Auth::user()->rooms()->attach($room);
        }
        return $room;
      } else {
        return response("Room does not exist.", 500);
      }
    }
}
