<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Models\User;
use CodeShopping\Http\Resources\UserResource;
use CodeShopping\Traits\OnlyTrashedIfRequestedTrait;

class UserController extends Controller
{
    use OnlyTrashedIfRequestedTrait;
    
    public function index()
    {
        $query = User::query();
        $query = $this->onlyTrashedIfRequested($query);
        $users = $query->paginate(10);
        return UserResource::collection($users);
    }

//    public function store(Request $request)
//    {
//        //
//    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

//    public function update(Request $request, $id)
//    {
//        //
//    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([], 204);
    }
}
