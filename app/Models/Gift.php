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
    ];

    protected $casts = [
        'reservado' => 'boolean',
    ];
}
