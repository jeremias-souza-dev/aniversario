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
                [
                    "id" => 1,
                    "nome" => "Carrinho De Bonecas Brinquedo Coleção Ninos 2215 Cotiplás",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",

                    "imagem" => asset('images/gifts/carrinho_de_bonecas.webp'),
                    "link" => "https://s.shopee.com.br/6KyeGb3UYu",
                ],
                [
                    "id" => 2,
                    "nome" => "Kit 24 Laços Infantis Luxo Parzinho ",
                    "categoria" => "Acessórios",
                    "reservado" => false,
                    "reservadoPor" => "",

                    "imagem" => asset('images/gifts/laco_docinho.webp'),
                    "link" => "https://s.shopee.com.br/1VtOWEdh9B",
                ],
                [
                    "id" => 3,
                    "nome" => "Barraca Infantil Rosa Flor Grande 1.3M Menina Princesa",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",

                    "imagem" => asset('images/gifts/barraca.webp'),
                    "link" => "https://s.shopee.com.br/9KcFqzrvBA",
                ],
                [
                    "id" => 4,
                    "nome" => "Maleta Kit Médica Infantil- Mini Doutora",
                    "categoria" => "Educativos",
                    "reservado" => false,
                    "reservadoPor" => "",

                    "imagem" => asset('images/gifts/kit_maleta_doutora.webp'),
                    "link" => "https://s.shopee.com.br/60LntBA8Rd",
                ],
                [
                    "id" => 5,
                    "nome" => "Kit 3 blusa manga curta (Tamanho 4)",
                    "categoria" => "Roupas",
                    "reservado" => false,
                    "reservadoPor" => "",

                    "imagem" => asset('images/gifts/camiseta_menina.webp'),
                    "link" => "https://s.shopee.com.br/6fbUgqIU27",
                ],
                [
                    "id" => 6,
                    "nome" => "Bicicleta Infantil ",
                    "categoria" => "Utilidades",
                    "reservado" => false,
                    "reservadoPor" => "",

                    "imagem" => asset('images/gifts/bicicleta.webp'),
                    "link" => "https://s.shopee.com.br/1BGYEHNehW",
                ],
                [
                    "id" => 7,
                    "nome" => "Livro Aprendendo Valores",
                    "categoria" => "Educativos",
                    "reservado" => false,
                    "reservadoPor" => "",

                    "imagem" => asset('images/gifts/livro.webp'),
                    "link" => "https://s.shopee.com.br/60LnuCk4nC",
                ],
                [
                    "id" => 8,
                    "nome" => "Kit 12 Pares de Meias Infantil Feminina",
                    "categoria" => "Roupas",
                    "reservado" => false,
                    "reservadoPor" => "",

                    "imagem" => asset('images/gifts/meias_infantis.webp'),
                    "link" => "https://s.shopee.com.br/gKHYn3YNA",
                ],
                [
                    "id" => 9,
                    "nome" => "Kit 3 Calças de Moletom Infantil(Tamanho 4)",
                    "categoria" => "Roupas",
                    "reservado" => false,
                    "reservadoPor" => "",

                    "imagem" => asset('images/gifts/calça.webp'),
                    "link" => "https://s.shopee.com.br/6KyeJp1tgm",
                ],
                [
                    "id" =>  10,
                    "nome" => " Kit 3 Vestido Infantil (Tamanho 4)",
                    "categoria" => "Roupas",
                    "reservado" => false,
                    "reservadoPor" => "",

                    "imagem" => asset('images/gifts/vestido.webp'),
                    "link" => "https://s.shopee.com.br/6fbUixREMT",
                ],
                [
                    "id" =>  11,
                    "nome" => "Kit 3 Pares Sandália Papete(Calçados 25/26)",
                    "categoria" => "Calçados",
                    "reservado" => false,
                    "reservadoPor" => "",

                    "imagem" => asset('images/gifts/papete.webp'),
                    "link" => "https://s.shopee.com.br/8fMZ7AfccC",
                ],
                [
                    "id" =>  12,
                    "nome" => "50 Peças Laços De Cabelo Elásticos",
                    "categoria" => "Acessórios",
                    "reservado" => false,
                    "reservadoPor" => "",

                    "imagem" => asset('images/gifts/elastico_cabelo.webp'),
                    "link" => "https://s.shopee.com.br/2Vlvme4h0z",
                ],

                // --- CATEGORIA: FAZ-DE-CONTA E CASINHA ---
                [
                    "id" =>  13,
                    "nome" => "Cozinha Infantil Completa com Fogão e Pia",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/cozinha_completa.webp'),
                    "link" => "https://s.shopee.com.br/9pYWaPNrBu",

                ],
                [
                    "id" =>  14,
                    "nome" => "Kit de Frutas e Legumes que Cortam (Velcro)",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/frutas_legumes.webp'),
                    "link" => "https://s.shopee.com.br/7pnS7VYpJQ",

                ],
                [
                    "id" =>  15,
                    "nome" => "Boneca Bebê",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/boneca.webp'),
                    "link" => "https://s.shopee.com.br/5AmgxEFxN4",

                ],
                [
                    "id" =>  16,
                    "nome" => "Brinquedo Infantil Maquina de lavar Roupa + Lava Louça + Aspirador de pó - Cozinha e Casinha",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/kit_maquina_lavar.webp'),
                    "link" => "https://s.shopee.com.br/W0rbNaBew",

                ],
                [
                    "id" =>  17,
                    "nome" => "Kit Chá da Tarde com Bule e Xícaras",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/kit_cha_da_tarde_brinquedo.webp'),
                    "link" => "https://s.shopee.com.br/5L67NMYB8V",

                ],
                [
                    "id" =>  18,
                    "nome" => "Carrinho de Supermercado com Cestinha",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/carrinho_de_supermercado.webp'),
                    "link" => "https://s.shopee.com.br/6fbUyFVOYB",

                ],
                [
                    "id" =>  19,
                    "nome" => "Vassoura e Pá (KIT LIMPEZA INFANTIL)",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/kit_limpeza_infantil.webp'),
                    "link" => "https://s.shopee.com.br/2B95bov6Qw",

                ],
                [
                    "id" =>  20,
                    "nome" => "Piscina Inflável Infantil",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/piscina.webp'),
                    "link" => "https://s.shopee.com.br/9AIpkga4Zn",

                ],

                // --- CATEGORIA: BELEZA E FANTASIA ---
                [
                    "id" =>  21,
                    "nome" => "Kit Mochila Infantil Menina Feminina",
                    "categoria" => "Acessórios",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/kit_mochila_infantil.webp'),
                    "link" => "https://s.shopee.com.br/5q2NzOdbHT",

                ],
                [
                    "id" =>  22,
                    "nome" => "Penteadeira Infantil com Espelho",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/penteadeira_infantil.webp'),
                    "link" => "https://s.shopee.com.br/806sYxXGG1",

                ],
                [
                    "id" =>  23,
                    "nome" => "Jogo Da Memoria Arca De Noe 56 Cartas",
                    "categoria" => "Educativos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/jogo_da_memoria.webp'),
                    "link" => "https://s.shopee.com.br/AABMwD9DAO",

                ],
                [
                    "id" =>  24,
                    "nome" => "Tapete de Desenho com Água (Water Doodle)",
                    "categoria" => "Arte",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/tapete.webp'),
                    "link" => "https://s.shopee.com.br/70EL9c5SVL",

                ],
                [
                    "id" =>  25,
                    "nome" => "Kit 4 Jogos Quebra Cabeça Animais",
                    "categoria" => "Educativos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/quebra_cabeça.webp'),
                    "link" => "https://s.shopee.com.br/6AfEAFV7we",

                ],
                [
                    "id" =>  26,
                    "nome" => "Kit Lembrancinha Massinha + Bolha + Cortador + Maleta",
                    "categoria" => "Arte",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/kit_lembrancinha.webp'),
                    "link" => "https://s.shopee.com.br/3VeTDILdYJ",

                ],
                [
                    "id" =>  27,
                    "nome" => "Kit Massinha de Areia Colorida + Moldes Dino/Animais",
                    "categoria" => "Arte",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/kit_massinha_areia.webp'),
                    "link" => "https://s.shopee.com.br/1VtOpokTFc",
                ],
                [
                    "id" =>  28,
                    "nome" => "Maleta Escolar de Pintura com 86 Peças",
                    "categoria" => "Arte",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/maleta_pintura.webp'),
                    "link" => "https://s.shopee.com.br/2Vlw1oTtUF",
                ],
               

                // --- CATEGORIA: MOVIMENTO E EXTERIOR ---
                [
                    "id" =>  30,
                    "nome" => "Patinete 3 Rodas com LED e Cestinha",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/patinete.webp'),
                    "link" => "https://s.shopee.com.br/8pfzOsOSPZ",

                ],
                [
                    "id" =>  31,
                    "nome" => "Pistola de Bolhas de Sabão Elétrica",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/pistola_bolhas.webp'),
                    "link" => "https://s.shopee.com.br/LhRSJdDsT",

                ],

                // --- CATEGORIA: MUSICAIS E ELETRÔNICOS ---
                [
                    "id" =>  32,
                    "nome" => "Teclado Piano Infantil",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/teclado.webp'),
                    "link" => "https://s.shopee.com.br/AUoDLqZDnj",

                ],

                [
                    "id" =>  33,
                    "nome" => "Manta Infantil Solteiro",
                    "categoria" => "Roupas",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/manta_infantil.webp'),
                    "link" => "https://s.shopee.com.br/1LZyW408l7   ",

                ],
                [
                    "id" =>  34,
                    "nome" => "Notebook Infantil Bilíngue",
                    "categoria" => "Educativos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/notebook_infantil.webp'),
                    "link" => "https://s.shopee.com.br/70ELOo7qwW",

                ],
                [
                    "id" =>  36,
                    "nome" => "Tapete de Dança Duplo Infantil",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/tapete_danca.webp'),
                    "link" => "https://s.shopee.com.br/5AmhDYBnYd",

                ],
                [
                    "id" =>  37,
                    "nome" => "Xilofone Colorido de Encaixe",
                    "categoria" => "Educativos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/xilofone.webp'),
                    "link" => "https://s.shopee.com.br/9AIplZ5C3m",

                ],

                // --- CATEGORIA: BONECOS E PELÚCIAS ---
                [
                    "id" =>  38,
                    "nome" => "Polvo do Humor Reversível Pelúcia",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/polvo.webp'),
                    "link" => "https://s.shopee.com.br/6fbUn6xjrd",

                ],
                [
                    "id" =>  39,
                    "nome" => "Dedoche - Fantoche de dedo",
                    "categoria" => "Educativos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/dedoche.webp'),
                    "link" => "https://s.shopee.com.br/AKUnNaVjVx",

                ],
                [
                    "id" =>  40,
                    "nome" => "Boneca Bebê Reborn",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/boneca_bebe.webp'),
                    "link" => "https://s.shopee.com.br/8V39CN8CqH",

                ],
                [
                    "id" =>  41,
                    "nome" => "Kit Animais Fazenda - 22 Peças",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/animais_fazenda.webp'),
                    "link" => "https://s.shopee.com.br/qdi4QGE78",

                ],
                [
                    "id" =>  42,
                    "nome" => "Cachorrinho de Pelúcia (anda, pula e late) + Pintinho",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/cachorrinho_pelucia.webp'),
                    "link" => "https://s.shopee.com.br/70ELPuAyan",

                ],

                // --- CATEGORIA: JOGOS E DESAFIOS ---
                [
                    "id" =>  43,
                    "nome" => "Tapete Kids Amarelinha Pink e Azul 1,00x1,50 Antiderrapante Estilo Belga Flannel",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/tapete_amarelinha.webp'),
                    "link" => "https://s.shopee.com.br/20pfT1iP4L",

                ],

                // --- CATEGORIA: LIVROS E ESTÍMULO ---
                [
                    "id" =>  44,
                    "nome" => "Livro Infantil poup-up 3D",
                    "categoria" => "Educativos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/livro3D.webp'),
                    "link" => "https://s.shopee.com.br/4fqQPmIwA4",

                ],
                [
                    "id" =>  45,
                    "nome" => "Lanterna Projetora de Histórias Infantis",
                    "categoria" => "Educativos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/lanterna_projetora.webp'),
                    "link" => "https://s.shopee.com.br/2Vlw4GPgqU",

                ],
                [
                    "id" =>  46,
                    "nome" => "Livro de Histórias Pop-up 3D",
                    "categoria" => "Educativos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/historia_biblica.webp'),
                    "link" => "https://s.shopee.com.br/5Amh0xfRB0",

                ],
                [
                    "id" =>  47,
                    "nome" => "Livro Sonoro Animais da Selva - Sons E Texturas",
                    "categoria" => "Educativos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/livro_sonoro_selva.webp'),
                    "link" => "https://s.shopee.com.br/3B1crcSeRB",

                ],

                // --- CATEGORIA: UTILIDADES E ROUPAS ---
                [
                    "id" =>  48,
                    "nome" => "Bolsa Pop It Mochila Infantil De Silicone",
                    "categoria" => "Acessórios",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/bolsa_pop.webp'),
                    "link" => "https://s.shopee.com.br/7VAbqQepjk",

                ],
                [
                    "id" =>  49,
                    "nome" => "Kit Infantil Óculos Relógio",
                    "categoria" => "Acessórios",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/relogio_oculos.webp'),
                    "link" => "https://s.shopee.com.br/3LL2qIuyM6",

                ],
                [
                    "id" =>  50,
                    "nome" => "Guarda-Chuva infantil bichos com orelhinhas  ",
                    "categoria" => "Acessórios",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/guarda_chuva.webp'),
                    "link" => "https://s.shopee.com.br/4LDa4Huhoi",

                ],
                [
                    "id" =>  51,
                    "nome" => "Conjunto de Pijama de Verão (Tamanho 4)",
                    "categoria" => "Roupas",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/pijama.webp'),
                    "link" => "https://s.shopee.com.br/806sPsRQjg",

                ],
                [
                    "id" =>  52,
                    "nome" => "kit 3 Lindas Tiaras Coloridas",
                    "categoria" => "Acessórios",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/tiara.webp'),
                    "link" => "https://s.shopee.com.br/6KyeQWaiPJ",

                ],
                [
                    "id" =>  53,
                    "nome" => "Kit pijama infantil estampado(Tamanho 4)",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/pijama_conjunto.webp'),
                    "link" => "https://s.shopee.com.br/5fixdymcI1",

                ],

                // --- NOVOS ITENS SUGERIDOS ---
                [
                    "id" => 54,
                    "nome" => "Casinha de Boneca Princesa - 24 Móveis 12 Cômodos 3 Princesas",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/casinha_boneca_princesa.webp'),
                    "link" => "https://s.shopee.com.br/5fixrcjaQU",
                ],
                [
                    "id" => 55,
                    "nome" => "Casinha de montar blocos (160 peças)",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/casinha_montar_blocos.webp'),
                    "link" => 'https://s.shopee.com.br/BO1Jh055c',
                ],
                [
                    "id" => 56,
                    "nome" => "Celular Infantil com Câmera e Jogos",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/celular_infantil.webp'),
                    "link" => 'https://s.shopee.com.br/8AQIr5jBw9',
                ],
                [
                    "id" => 57,
                    "nome" => "Caixa Registradora Infantil",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/caixa_registradora.webp'),
                    "link" => 'https://s.shopee.com.br/7AXlfp83g2',
                ],
                [
                    "id" => 58,
                    "nome" => "Kit salão de beleza (secador, escova, espelho)",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/kit_salao_beleza.webp'),
                    "link" => 'https://s.shopee.com.br/2qOmVvrfVV',
                ],
                [
                    "id" => 59,
                    "nome" => "Play-Doh Sorveteria Hasbro",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/play_doh_sorveteria_hasbro.webp'),
                    "link" => 'https://s.shopee.com.br/2qOmW70M58',
                ],
                [
                    "id" => 60,
                    "nome" => "Kit piquenique com cesta",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/kit_piquenique_cesta.webp'),
                    "link" => 'https://s.shopee.com.br/8fMZTNHgQe',
                ],
                [
                    "id" => 61,
                    "nome" => "Carrinho de Sorvete",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/carrinho_de_soverte.webp'),
                    "link" => 'https://s.shopee.com.br/5AmhJaAWDk',
                ],
               

                // --- EDUCATIVOS / DESENVOLVIMENTO ---
                [
                    "id" => 64,
                    "nome" => "Jogo Quebra Cabeça Minnie Mickey Mouse Disne",
                    "categoria" => "Educativos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/quebra_cabeca_madeira.webp'),
                    "link" => 'https://s.shopee.com.br/8fMZUYRiw3',
                ],
               
                [
                    "id" => 66,
                    "nome" => "Livro sensorial Montessori",
                    "categoria" => "Educativos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/livro_sensorial.webp'),
                    "link" => 'https://s.shopee.com.br/3LL3C3vkYj',
                ],
               
                [
                    "id" => 68,
                    "nome" => "Lousa mágica dupla face (quadro branco + giz)",
                    "categoria" => "Educativos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/lousa_magica_dupla.webp'),
                    "link" => 'https://s.shopee.com.br/1gCpDIygKX',
                ],
             
                [
                    "id" => 70,
                    "nome" => "Jogo de pescar peixinhos magnético",
                    "categoria" => "Educativos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/jogo_pescar_peixinhos.webp'),
                    "link" => 'https://s.shopee.com.br/9KcGINEmEY',
                ],
              
                

                // --- ARTE / MÚSICA / CRIATIVIDADE ---
                
               
                [
                    "id" => 77,
                    "nome" => "Violão infantil colorido",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/violao_infantil.webp'),
                    "link" => 'https://s.shopee.com.br/5AmhO5cXWw',
                ],
                
               
               

                // --- ROUPAS E ACESSÓRIOS ESTILOSOS ---
               
                [
                    "id" => 86,
                    "nome" => "Conjunto moletom estiloso (inverno)",
                    "categoria" => "Roupas",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/conjunto_moletom_inverno.webp'),
                    "link" => 'https://s.shopee.com.br/AUoDhPaJEB',
                ],
                [
                    "id" => 87,
                    "nome" => "Kit 2 Pares Tênis Infantil (Calçado 25)",
                    "categoria" => "Calçados",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/tenis_casual_feminino.webp'),
                    "link" => 'https://s.shopee.com.br/AABNJLfa2f',
                ],
              
                
                [
                    "id" => 90,
                    "nome" => "Kit 5 calcinhas algodão premium",
                    "categoria" => "Roupas",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/kit_5_calcinhas.webp'),
                    "link" => 'https://s.shopee.com.br/gKI2gyBed',
                ],
                [
                    "id" => 91,
                    "nome" => "Conjunto saia + blusinha",
                    "categoria" => "Roupas",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/conjunto_saia_blusinha.webp'),
                    "link" => 'https://s.shopee.com.br/7KrByfk0PQ',
                ],
                [
                    "id" => 92,
                    "nome" => "Bota infantil cano curto(Calçado 26)",
                    "categoria" => "Calçados",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/bota_infantil_cano_curto.webp'),
                    "link" => 'https://s.shopee.com.br/gKI31lNC5',
                ],
                

                [
                    "id" => 95,
                    "nome" => "Kit 10 Laços de Cabelo Infantil",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/mini_cama_elastica.webp'),
                    "link" => null,
                ],
                
               
                [
                    "id" => 101,
                    "nome" => "Cavalo de Pelúcia ",
                    "categoria" => "Pelúcias",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/cavalo.webp'),
                    "link" => 'https://s.shopee.com.br/7AXloHBq3L',
                ],
                [
                    "id" => 102,
                    "nome" => "Kit 4 Shorts (Tamanho 4)",
                    "categoria" => "Brinquedos",
                    "reservado" => false,
                    "reservadoPor" => "",
                    "imagem" => asset('images/gifts/shorts.webp'),
                    "link" => "https://s.shopee.com.br/7fU2QeZAxo",
                ],

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
