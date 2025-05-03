<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use App\Models\Role;

class RoleController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('settings/role/list');
    }

    public function create()
    {
        return Inertia::render('settings/role/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'permissions' => 'nullable|array',
        ]);

        Role::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'permission' => $data['permissions'],
            'created_by' => Auth::id()
        ]);

        return Redirect::to('/settings/role')->with('success', 'New role created successfully!');
    }
}