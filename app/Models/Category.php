<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Category extends Authenticatable
{
    protected $table = 'category';
    
    protected $fillable = [
        'title',
        'slug',
        'description',
        'created_by',
        'updated_by',
        'obj_lang',
        'obj_status'
    ];
}