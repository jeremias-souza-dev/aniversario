<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GiftController extends Controller
{
    private string $path = 'gifts.json';

    public function index()
    {
        // $gifts = json_decode(
        //     Storage::disk('local')->get($this->path),
        //     true
        // );


        $gifts = null;

        if (!$gifts) {
            $presentesIniciais = [
                // --- ITENS ESPECÍFICOS SOLICITADOS (IDs 1 a 12) ---
                ["id" => 1, "nome" => "Carrinho De Bonecas Brinquedo Coleção Ninos 2215 Cotiplás", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => "", "link" => "https://s.shopee.com.br/9pYLkg4nh7?share_channel_code=1", "preco" => "R$97,80"],
                ["id" => 2, "nome" => "Par laço docinho laço de cabelo menina infantil", "categoria" => "Acessórios", "reservado" => false, "reservadoPor" => "", "link" => "https://s.shopee.com.br/10wxETgE5S?share_channel_code=1", "preco" => "R$18,00"],
                ["id" => 3, "nome" => "Barraca Infantil Rosa Flor Grande 1.3M Menina Princesa", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => "", "link" => "https://s.shopee.com.br/6Af3OAmN1E?share_channel_code=1", "preco" => "R$47,97"],
                ["id" => 4, "nome" => "Maleta Kit Médica Infantil Educativo Divertido Brinquedo Menina Mini Doutora Rosa 14 Peças", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => "", "link" => "https://s.shopee.com.br/qdX2mIVNp?share_channel_code=1", "preco" => "R$21,90"],
                ["id" => 5, "nome" => "Kit 3 blusa manga curta com aplique camiseta menina roupa infantil menina cores (Tamanho 4)", "categoria" => "Roupas", "reservado" => false, "reservadoPor" => "", "link" => "https://s.shopee.com.br/7Kr0moik8X?share_channel_code=1", "preco" => "R$41,90"],
                ["id" => 6, "nome" => "Garrafa Infantil Portátil 600ml Com Canudo Desenho Fantasia Garrafa copo De Alce Água", "categoria" => "Utilidades", "reservado" => false, "reservadoPor" => "", "link" => "https://s.shopee.com.br/8fMONYRva5?share_channel_code=1", "preco" => "R$15,88"],
                ["id" => 7, "nome" => "Aprendendo Valores - Como é Bom Dizer A Verdade", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => "", "link" => "https://s.shopee.com.br/40aYpBa6x6?share_channel_code=1", "preco" => "R$14,00"],
                ["id" => 8, "nome" => "Kit 12 Pares de Meias Infantil Feminina Estampada Coloridas Algodão Macio e Confortável", "categoria" => "Roupas", "reservado" => false, "reservadoPor" => "", "link" => "https://s.shopee.com.br/9fEvaCqJvS?share_channel_code=1", "preco" => "R$24,90"],
                ["id" => 9, "nome" => "Kit 4 Calças de Moletom Infantil Feminina com Elástico Flanelada Outono Inverno", "categoria" => "Roupas", "reservado" => false, "reservadoPor" => "", "link" => "https://s.shopee.com.br/5AmWE5uc2y?share_channel_code=1", "preco" => "R$69,90"],
                ["id" => 10, "nome" => "Vestido Infantil Verão Menina Ciganinha verão fresquinho confortável não amassa", "categoria" => "Roupas", "reservado" => false, "reservadoPor" => "", "link" => "https://s.shopee.com.br/20pUSQXlJZ?share_channel_code=1", "preco" => "R$32,50"],
                ["id" => 11, "nome" => "Kit 3 Pares Sandália Papete Menina Infantil Confortável Promoção (Calçados 25/26)", "categoria" => "Calçados", "reservado" => false, "reservadoPor" => "", "link" => "https://s.shopee.com.br/70EAPsqOla?share_channel_code=1", "preco" => "R$63,35"],
                ["id" => 12, "nome" => "Laços De Cabelo Elásticos Estilo Coreano Para Crianças, Faixas Não Danificadas", "categoria" => "Acessórios", "reservado" => false, "reservadoPor" => "", "link" => "https://s.shopee.com.br/4fqFdpB1Dk?share_channel_code=1", "preco" => "R$19,00"],

                // --- CATEGORIA: FAZ-DE-CONTA E CASINHA ---
                ["id" => 13, "nome" => "Cozinha Infantil Completa com Fogão e Pia", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 14, "nome" => "Kit de Frutas e Legumes que Cortam (Velcro)", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 15, "nome" => "Boneca que fala frases e canta", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 16, "nome" => "Kit Batedeira e Liquidificador Rosa", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 17, "nome" => "Geladeira Infantil Duplex com Acessórios", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 18, "nome" => "Máquina de Lavar Roupas Infantil que Gira", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 19, "nome" => "Kit Chá da Tarde com Bule e Xícaras", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 20, "nome" => "Carrinho de Supermercado Infantil", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 21, "nome" => "Vassoura e Pá (Kit Limpeza Mágica)", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 22, "nome" => "Ferro de Passar Infantil com Som de Vapor", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],

                // --- CATEGORIA: BELEZA E FANTASIA ---
                ["id" => 23, "nome" => "Kit Maquiagem Infantil Lavável Formato Flor", "categoria" => "Acessórios", "reservado" => false, "reservadoPor" => ""],
                ["id" => 24, "nome" => "Varinha de Condão com Luz e Som", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 25, "nome" => "Coroa e Cetro de Princesa Prateado", "categoria" => "Acessórios", "reservado" => false, "reservadoPor" => ""],
                ["id" => 26, "nome" => "Saia de Tutu com Glitter e Estrelas", "categoria" => "Acessórios", "reservado" => false, "reservadoPor" => ""],
                ["id" => 27, "nome" => "Bolsinha Transversal de Unicórnio", "categoria" => "Acessórios", "reservado" => false, "reservadoPor" => ""],
                ["id" => 28, "nome" => "Kit Esmalte e Adesivos de Unha Infantil", "categoria" => "Acessórios", "reservado" => false, "reservadoPor" => ""],
                ["id" => 29, "nome" => "Fantasia de Fada com Asas e Tiara", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 30, "nome" => "Penteadeira Infantil com Espelho", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],

                // --- CATEGORIA: EDUCATIVOS E ARTE ---
                ["id" => 31, "nome" => "Lousa Mágica LCD 10 polegadas Colorida", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 32, "nome" => "Blocos de Montar Castelo Encantado", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 33, "nome" => "Tapete de Desenho com Água (Water Doodle)", "categoria" => "Arte", "reservado" => false, "reservadoPor" => ""],
                ["id" => 34, "nome" => "Quebra-cabeça de Madeira de Animais", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 35, "nome" => "Massinha de Modelar com Moldes de Doces", "categoria" => "Arte", "reservado" => false, "reservadoPor" => ""],
                ["id" => 36, "nome" => "Areia Mágica com Formas de Castelo", "categoria" => "Arte", "reservado" => false, "reservadoPor" => ""],
                ["id" => 37, "nome" => "Caderno de Colorir que Apaga", "categoria" => "Arte", "reservado" => false, "reservadoPor" => ""],
                ["id" => 38, "nome" => "Maleta de Pintura com 86 peças", "categoria" => "Arte", "reservado" => false, "reservadoPor" => ""],
                ["id" => 39, "nome" => "Jogo de Memória das Princesas", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 40, "nome" => "Abaco de Madeira Colorido", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => ""],

                // --- CATEGORIA: MOVIMENTO E EXTERIOR ---
                ["id" => 41, "nome" => "Patinete 3 Rodas com LED e Cestinha", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 42, "nome" => "Piscina de Bolinhas Inflável Rosa", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 43, "nome" => "Bicicleta de Equilíbrio (Balance Bike)", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 44, "nome" => "Cavalinho Upa-Upa Rosa", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 45, "nome" => "Máquina de Bolhas de Sabão Elétrica", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 46, "nome" => "Balanço Infantil de Plástico", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 47, "nome" => "Túnel Infantil Dobrável Colorido", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 48, "nome" => "Kit Basquete Infantil de Parede", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 49, "nome" => "Velotrol / Triciclo com Empurrador", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 50, "nome" => "Escorregador Pequeno Infantil", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],

                // --- CATEGORIA: MUSICAIS E ELETRÔNICOS ---
                ["id" => 51, "nome" => "Teclado Musical Animal com Sons", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 52, "nome" => "Microfone que Grava e Muda a Voz", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 53, "nome" => "Cacto Dançante e Falante", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 54, "nome" => "Tablet Educativo Bilíngue Rosa", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 55, "nome" => "Violão Infantil com Personagens", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 56, "nome" => "Tapete Musical de Dança", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 57, "nome" => "Xilofone Colorido de Encaixe", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 58, "nome" => "Telefone Celular de Brinquedo Musical", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 59, "nome" => "Ursinho Projetor de Estrelas", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 60, "nome" => "Câmera Fotográfica Digital Infantil", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],

                // --- CATEGORIA: BONECOS E PELÚCIAS ---
                ["id" => 61, "nome" => "Unicórnio de Pelúcia Grande", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 62, "nome" => "Polvo do Humor Reversível Pelúcia", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 63, "nome" => "Boneca Metoo Angela (Original)", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 64, "nome" => "Pequeno Pônei com Crina para Pentear", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 65, "nome" => "Casa de Boneca em Madeira (MDF)", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 66, "nome" => "Dedoches Família de Animais", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 67, "nome" => "Boneca Reborn de Silicone", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 68, "nome" => "Animais da Fazenda de Borracha Macia", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 69, "nome" => "Sereia com Cauda de Glitter que Brilha", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 70, "nome" => "Cachorrinho de Pelúcia que Anda e Late", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],

                // --- CATEGORIA: JOGOS E DESAFIOS ---
                ["id" => 71, "nome" => "Pop-it Eletrônico (Quick Push)", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 72, "nome" => "Jogo Pula Pirata Versão Menina", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 73, "nome" => "Pescaria Musical com Varinhas", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 74, "nome" => "Torre de Equilíbrio Colorida", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 75, "nome" => "Jogo Cara a Cara Versão Princesas", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 76, "nome" => "Amarelinha Portátil de Tapete", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 77, "nome" => "Boliche de Espuma Colorido", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 78, "nome" => "Bingo de Imagens e Animais", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 79, "nome" => "Labirinto Magnético de Madeira", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 80, "nome" => "Lança Discos de Fada Borboleta", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],

                // --- CATEGORIA: LIVROS E ESTÍMULO ---
                ["id" => 81, "nome" => "Livro de Banho Almofadado com Apito", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 82, "nome" => "Lanterna Projetora de Histórias Infantis", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 83, "nome" => "Livro de Histórias Pop-up 3D", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 84, "nome" => "Coleção 'Minhas Primeiras Cores'", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 85, "nome" => "Livro com Sons de Animais da Selva", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 86, "nome" => "Livro 'Toque e Sinta' Texturas", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 87, "nome" => "Giz de Cera Retrátil para Pequenas Mãos", "categoria" => "Arte", "reservado" => false, "reservadoPor" => ""],
                ["id" => 88, "nome" => "Quadro Negro Portátil de Giz", "categoria" => "Arte", "reservado" => false, "reservadoPor" => ""],
                ["id" => 89, "nome" => "Kit de Carimbos Alfabeto Ilustrado", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 90, "nome" => "Tapete Educativo Alfabético em EVA", "categoria" => "Educativos", "reservado" => false, "reservadoPor" => ""],

                // --- CATEGORIA: UTILIDADES E ROUPAS ---
                ["id" => 91, "nome" => "Mochila de Pelúcia de Gatinho", "categoria" => "Acessórios", "reservado" => false, "reservadoPor" => ""],
                ["id" => 92, "nome" => "Relógio Digital Rosa de Personagem", "categoria" => "Acessórios", "reservado" => false, "reservadoPor" => ""],
                ["id" => 93, "nome" => "Guarda-Chuva de Princesas com Orelhinhas", "categoria" => "Acessórios", "reservado" => false, "reservadoPor" => ""],
                ["id" => 94, "nome" => "Luminária de Estrela Giratória para Quarto", "categoria" => "Utilidades", "reservado" => false, "reservadoPor" => ""],
                ["id" => 95, "nome" => "Conjunto de Pijama de Verão Menina", "categoria" => "Roupas", "reservado" => false, "reservadoPor" => ""],
                ["id" => 96, "nome" => "Tiara de Cabelo com Laço de Luxo", "categoria" => "Acessórios", "reservado" => false, "reservadoPor" => ""],
                ["id" => 97, "nome" => "Cesta de Piquenique com Acessórios", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 98, "nome" => "Kit Meias Antiderrapantes Coloridas", "categoria" => "Roupas", "reservado" => false, "reservadoPor" => ""],
                ["id" => 99, "nome" => "Bolsa de Praia com Baldinho", "categoria" => "Brinquedos", "reservado" => false, "reservadoPor" => ""],
                ["id" => 100, "nome" => "Fone de Ouvido Gatinho com Bluetooth", "categoria" => "Acessórios", "reservado" => false, "reservadoPor" => ""],
            ];

            Storage::disk('local')->put($this->path, json_encode($presentesIniciais, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
            $gifts = $presentesIniciais;
        }
        // Se for requisição AJAX/Fetch, retorne JSON no formato esperado pelo frontend
        if (request()->ajax() || request()->wantsJson()) {
            $presentes = array_map(function ($g) {
                return [
                    'id' => $g['id'] ?? null,
                    'nome' => $g['name'] ?? ($g['nome'] ?? ''),
                    'descricao' => $g['description'] ?? ($g['descricao'] ?? ''),
                    'categoria' => $g['category'] ?? ($g['categoria'] ?? ''),
                    'preco' => $g['price'] ?? ($g['preco'] ?? null),
                    'link' => $g['link'] ?? null,
                    'reservado' => isset($g['reserved']) ? $g['reserved'] : (isset($g['reservado']) ? $g['reservado'] : false),
                    'reservadoPor' => $g['reservedBy'] ?? ($g['reservadoPor'] ?? ''),
                ];
            }, $gifts ?: []);

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

        $gifts = json_decode(
            Storage::disk('local')->get($this->path),
            true
        );

        $updated = false;
        foreach ($gifts as &$gift) {
            $giftId = $gift['id'] ?? null;
            $giftReserved = isset($gift['reserved']) ? $gift['reserved'] : (isset($gift['reservado']) ? $gift['reservado'] : false);

            if ($giftId === $request->id && $giftReserved === false) {
                $gift['reserved'] = true;
                $gift['reservedBy'] = $request->nome;
                $gift['reservado'] = true;
                $gift['reservadoPor'] = $request->nome;
                $updated = true;
                break;
            }
        }

        if ($updated) {
            Storage::disk('local')->put(
                $this->path,
                json_encode($gifts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
            );
        }

        if ($request->ajax() || $request->wantsJson()) {
            $presentes = array_map(function ($g) {
                return [
                    'id' => $g['id'] ?? null,
                    'nome' => $g['name'] ?? ($g['nome'] ?? ''),
                    'descricao' => $g['description'] ?? ($g['descricao'] ?? ''),
                    'categoria' => $g['category'] ?? ($g['categoria'] ?? ''),
                    'preco' => $g['price'] ?? ($g['preco'] ?? null),
                    'link' => $g['link'] ?? null,
                    'reservado' => isset($g['reserved']) ? $g['reserved'] : (isset($g['reservado']) ? $g['reservado'] : false),
                    'reservadoPor' => $g['reservedBy'] ?? ($g['reservadoPor'] ?? ''),
                ];
            }, $gifts ?: []);

            return response()->json(['presentes' => $presentes]);
        }

        return redirect()->back();
    }
}
