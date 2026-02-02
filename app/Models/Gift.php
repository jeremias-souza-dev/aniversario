<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gift extends Model
{
    protected $fillable = [
        'nome',
        'categoria',
        'reservado',
        'reservado_por',
        'imagem',
        'link',
        'user_id',
    ];

    protected $casts = [
        'reservado' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
