<?php

namespace App\Http\Controllers;

use App\Models\Gift;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GiftController extends Controller
{
    public function index()
    {
        $gifts = Gift::with('user')->get(); // Eager load user

        // Se for requisição AJAX/Fetch, retorne JSON no formato esperado pelo frontend
        if ((request()->ajax() || request()->wantsJson()) && !request()->inertia()) {
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
                    'user_id' => $g->user_id,
                    'avatar' => $g->user ? $g->user->avatar : null, // Avatar from relationship
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
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:gifts,id',
            'nome' => 'required|string|max:255',
        ]);

        $conflictIds = [];
        $reservedGifts = [];

        \Illuminate\Support\Facades\DB::transaction(function () use ($request, &$conflictIds, &$reservedGifts) {
            // Lock records for update to prevent race conditions within the transaction check
            // However, simple check then update is often enough for this scale if we check state

            $giftsToCheck = Gift::whereIn('id', $request->ids)->lockForUpdate()->get();

            foreach ($giftsToCheck as $gift) {
                if ($gift->reservado) {
                    $conflictIds[] = $gift->id;
                }
            }

            if (empty($conflictIds)) {
                foreach ($giftsToCheck as $gift) {
                    $gift->update([
                        'reservado' => true,
                        'reservado_por' => $request->nome,
                        'user_id' => \Illuminate\Support\Facades\Auth::id(),
                    ]);
                    $reservedGifts[] = $gift;
                }
            }
        });

        if (!empty($conflictIds)) {
            return response()->json([
                'message' => 'Alguns presentes já foram reservados por outra pessoa.',
                'conflicts' => $conflictIds
            ], 409);
        }

        // Send email if there are reserved gifts
        if (!empty($reservedGifts)) {
            try {
                \Illuminate\Support\Facades\Mail::to('talitasantoos11031999@gmail.com')
                    ->send(new \App\Mail\ReservationConfirmed($reservedGifts, $request->nome));
            } catch (\Exception $e) {

                \Illuminate\Support\Facades\Log::error('Erro ao enviar email de reserva: ' . $e->getMessage());
            }
        }

        if ((request()->ajax() || request()->wantsJson()) && !request()->inertia()) {
            return response()->json([
                'message' => 'Reserva realizada com sucesso!',
                'presentes' => Gift::all()->map(function ($g) {
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
                })
            ]);
        }

        return redirect()->back();
    }
}
