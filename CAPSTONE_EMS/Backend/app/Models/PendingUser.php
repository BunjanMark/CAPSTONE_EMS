<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class PendingUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 
        'lastname', 
        'username', 
        'email', 
        'password', 
        'phone_number', 
        'date_of_birth', 
        'gender', 
        'terms_accepted', 
        'role',
    ];

    // Automatically hash password when setting it
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    // Define relationship with Role (assuming a Role model exists)
    public function role()
    {
        return $this->belongsTo(Role::class, 'role');
    }
}
