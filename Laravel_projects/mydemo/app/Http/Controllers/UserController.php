<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'uid' => 'required|string|unique:users,uid',
        'email' => 'required|string|email|unique:users,email',
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'phone_number' => 'nullable|string|max:255'
    ]);

    $user = new User([
        'uid' => $request->uid,
        'email' => $request->email,
        'first_name' => $request->first_name,
        'last_name' => $request->last_name,
        'phone_number' => $request->phone_number
    ]);

    $user->save();

    return response()->json(['message' => 'User registered successfully', 'user' => $user]);
}


    public function getUsers($uid)
    {
        // Find the user by uid
        $user = User::where('uid', $uid)->first();

        if (!$user) {
            // Handle case when user is not found
            return response()->json(['message' => 'User not found'], 404);
        }

        // Retrieve the 'is_admin' status of the user
        $isAdmin = $user->is_admin;

        return response()->json(['is_admin' => $isAdmin]);
    }

    public function getAllUsers(Request $request)
    {
        // Start the query
        $query = User::query();
    
        // Check for each parameter and add it to the query if present
        if ($request->has('first_name')) {
            $query->where('first_name', 'like', '%' . $request->first_name . '%');
        }
        if ($request->has('last_name')) {
            $query->where('last_name', 'like', '%' . $request->last_name . '%');
        }
        if ($request->has('phone_number')) {
            $query->where('phone_number', $request->phone_number);
        }
    
        // Execute the query and get the results
        $users = $query->get();
    
        return response()->json($users);
    }
    

    public function toggleAdminStatus(Request $request, $uid)
    {
        $user = User::where('uid', $uid)->first();
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        // Update the is_admin status from request
        $user->is_admin = $request->input('is_admin');
        $user->save();
    
        return response()->json([
            'message' => 'Admin status updated successfully',
            'user' => $user
        ]);
    }    


}

