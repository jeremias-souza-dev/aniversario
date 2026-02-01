<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #fce7f3;
            padding: 20px;
        }

        .container {
            background-color: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #db2777;
            text-align: center;
        }

        .gift-list {
            list-style: none;
            padding: 0;
        }

        .gift-item {
            border-bottom: 1px solid #f3f4f6;
            padding: 10px 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .gift-item:last-child {
            border-bottom: none;
        }

        .gift-name {
            font-weight: bold;
            color: #374151;
        }

        .gift-price {
            color: #0d9488;
            font-size: 0.9em;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.8em;
            color: #6b7280;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>🎁 Nova Reserva!</h1>
        <p>Olá,</p>
        <p><strong>{{ $guestName }}</strong> acabou de reservar os seguintes presentes para o aniversário da Sarah:</p>

        <ul class="gift-list">
            @foreach($gifts as $gift)
            <li class="gift-item">
                <div>
                    <div class="gift-name">{{ $gift->nome }}</div>
                    @if($gift->preco)
                    <div class="gift-price">{{ $gift->preco }}</div>
                    @endif
                </div>
            </li>
            @endforeach
        </ul>

        <div class="footer">
            <p>Lista de Presentes - Aniversário da Sarah Lorraine</p>
        </div>
    </div>
</body>

</html>