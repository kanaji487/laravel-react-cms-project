<?php

namespace App\Http\Controllers\Content\Category;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;

class CategoryController extends Controller
{
    public function index(Request $request): Response
    {
        $categories = Category::select('title', 'slug', 'description', 'created_at', 'updated_at', 'created_by', 'updated_by', 'obj_lang', 'obj_status')
        ->orderBy('created_at', 'desc')
        ->paginate(15);

        return Inertia::render('content/category/list', [
            'categories' => $categories,
        ]);
    }

    public function form(Request $request): Response
    {
        return Inertia::render('content/category/create');
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:category,slug',
            'description' => 'nullable|string',
            'obj_lang' => 'nullable|string|max:10',
            'obj_status' => 'nullable|string|max:50'
        ]);

        $validated['created_by'] = Auth::id();

        Category::create($validated);

        return Redirect::to('/content/category/list')->with('success', 'Category created successfully!');
    }
}