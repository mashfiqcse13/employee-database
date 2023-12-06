<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class AuthController extends Controller
{
    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 406);
        }
        $authAttemptSuccess = Auth::attempt(['email' => $request->email, 'password' => $request->password]);
        if ($authAttemptSuccess) {
            $user = User::find(Auth::id());
            $success = [];
            $success['message'] = "Login Successful";
            $success['currentUser'] = $user->toArray();
            $success['currentUser']['token'] = $user->createToken('MyApp')->accessToken;
            return response()->json($success, 200);
        }
        return response()->json(['message' => 'Credentials Invalid'], 401);
    }
}
