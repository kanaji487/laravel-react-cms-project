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
        $query = Category::select('id', 'title', 'slug', 'description', 'created_at', 'updated_at', 'created_by', 'updated_by', 'obj_lang', 'obj_status');

        if ($request->filled('title')) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }

        if ($request->filled('slug')) {
            $query->where('slug', 'like', '%' . $request->slug . '%');
        }

        if ($request->filled('description')) {
            $query->where('description', 'like', '%' . $request->description . '%');
        }

        if ($request->filled('language')) {
            $query->where('obj_lang', $request->language);
        }

        if ($request->filled('status')) {
            $query->where('obj_status', $request->status);
        }

        $categories = $query
            ->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('content/category/list', [
            'categories' => $categories,
            'filters' => $request->only(['title', 'slug', 'description', 'language', 'status']),
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
    
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return back()->with('message', 'Category deleted successfully.');
    }

    public function edit($id)
    {
        $category = Category::findOrFail($id);

        return Inertia::render('content/category/edit', [
            'category' => $category
        ]);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:category,slug,' . $id,
            'description' => 'nullable|string',
            'obj_lang' => 'required|in:tha,eng',
            'obj_status' => 'required|in:publish,unpublish',
        ]);

        $validated['updated_by'] = Auth::id();
        $category->update($validated);

        return Redirect::to('/content/category/list')->with('success', 'Category updated successfully.');
    }
}