<?php

namespace CodeShopping\Http\Controllers\Api;

use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Resources\UserResource;
use CodeShopping\Models\User;
use CodeShopping\Traits\OnlyTrashedIfRequestedTrait;
use CodeShopping\Http\Requests\{UserStoreRequest, UserUpdateRequest};
use CodeShopping\Events\UserCreatedEvent;

class UserController extends Controller
{
    use OnlyTrashedIfRequestedTrait;
    
    public function index(Request $request)
    {
        $query = User::query();
        $query = $this->onlyTrashedIfRequested($query);
        $users = $request->has('all') ? $query->get() : $query->paginate(10);
        return UserResource::collection($users);
    }

    public function store(UserStoreRequest $request)
    {
        $user = User::create($request->all());
        $user->refresh();
        event(new UserCreatedEvent($user));
        return new UserResource($user);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        // Não permite atualização de e-mails
        $user->fill($request->except('email'));
        $user->save();
        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([], 204);
    }
    
    public function restore(User $user) 
    {
        $user->restore();
        return response()->json([], 204);
    }
}
