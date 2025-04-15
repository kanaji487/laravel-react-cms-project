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

class CategoryController extends Controller
{
    public function index(Request $request): Response
    {
        $categories = Category::select('title', 'slug', 'description')->get();

        return Inertia::render('content/category/list', [
            'categories' => $categories,
        ]);
    }
}