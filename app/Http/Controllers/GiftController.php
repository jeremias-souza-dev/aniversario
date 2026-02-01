<?php

namespace App\Http\Controllers;

use App\Models\Gift;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GiftController extends Controller
{
    public function index()
    {
        $gifts = Gift::all();

        // Se for requisição AJAX/Fetch, retorne JSON no formato esperado pelo frontend
        if (request()->ajax() || request()->wantsJson()) {
            $presentes = $gifts->map(function ($g) {
                return [
                    'id' => $g->id,
                    'nome' => $g->nome,
                    'descricao' => $g->descricao ?? '', // Field not in DB yet, but in old code
                    'categoria' => $g->categoria,
                    'preco' => $g->preco ?? null, // Field not in DB yet
                    'link' => $g->link,
                    'reservado' => (bool) $g->reservado,
                    'reservadoPor' => $g->reservado_por ?? '',
                    'imagem' => $g->imagem, // Adding this as it might be needed
                ];
            });

            return response()->json(['presentes' => $presentes]);
        }

        return Inertia::render('GiftList', [
            'gifts' => $gifts
        ]);
    }

    public function reserve(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'nome' => 'required|string|max:255',
        ]);

        $gift = Gift::find($request->id);

        if ($gift && !$gift->reservado) {
            $gift->update([
                'reservado' => true,
                'reservado_por' => $request->nome,
            ]);
        }

        if ($request->ajax() || $request->wantsJson()) {
            // Return updated list or just success? Old code returned full list.
            $gifts = Gift::all();
            $presentes = $gifts->map(function ($g) {
                return [
                    'id' => $g->id,
                    'nome' => $g->nome,
                    'descricao' => $g->descricao ?? '',
                    'categoria' => $g->categoria,
                    'preco' => $g->preco ?? null,
                    'link' => $g->link,
                    'reservado' => (bool) $g->reservado,
                    'reservadoPor' => $g->reservado_por ?? '',
                    'imagem' => $g->imagem,
                ];
            });

            return response()->json(['presentes' => $presentes]);
        }

        return redirect()->back();
    }
}
