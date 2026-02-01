<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserRelationship extends Model
{
    protected $fillable = ['user_id', 'real_name', 'relationship'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
