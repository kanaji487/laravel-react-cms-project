<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Role extends Authenticatable
{
    protected $table = 'roles';
    
    protected $fillable = [
        'name',
        'description',
        'permission',
        'created_by',
        'updated_by'
    ];

    protected $casts = [
        'permission' => 'array',
    ];
}