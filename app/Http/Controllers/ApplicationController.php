<?php

namespace App\Http\Controllers;

use App\Models\User;
use Faker\Provider\Miscellaneous;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ApplicationController extends Controller
{
  public function generateUser() {
    if(Auth::guest()) {
      $name = 'Anonymous ' . Miscellaneous::emoji();

      $u = User::create([
          'name' => $name,
          'type' => 'player'
      ]);

      Auth::loginUsingId($u->id, true);
      return $u;
    } else {
      return Auth::user();
    }
  }

  public function generateKey() {
    return strtoupper(Str::random(6));
  }
}
