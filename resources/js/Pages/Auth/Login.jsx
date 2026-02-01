import { Head } from '@inertiajs/react';
import { PartyPopper, Heart, Star, Sparkles, Gift } from 'lucide-react';

export default function Login({ status }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-amber-100 flex items-center justify-center p-4 relative overflow-hidden">
            <Head title="Login - Aniversário da Sarah" />

            {/* Background Decorations */}
            <div className="absolute top-10 left-10 animate-bounce delay-700">
                <Star className="w-12 h-12 text-amber-300 fill-amber-300 opacity-60" />
            </div>
            <div className="absolute bottom-20 right-10 animate-pulse">
                <Heart className="w-16 h-16 text-pink-300 fill-pink-300 opacity-60" />
            </div>
            <div className="absolute top-1/4 right-20 animate-bounce">
                <Sparkles className="w-8 h-8 text-rose-300 opacity-60" />
            </div>

            <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border-2 border-pink-100 relative z-10 transition-all hover:shadow-2xl hover:scale-[1.01] duration-300">
                {/* Header Decoration */}
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="bg-white/20 p-3 rounded-full mb-3 backdrop-blur-sm shadow-inner">
                            <PartyPopper className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-1 drop-shadow-md">Sarah Lorraine</h1>
                        <p className="text-pink-100 text-sm font-medium tracking-wide uppercase bg-white/20 px-3 py-1 rounded-full">3 Aninhos</p>
                    </div>
                </div>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Bem-vindo(a)!</h2>
                        <p className="text-gray-500 text-sm">
                            Entre para acessar a lista de presentes da Lolo.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm text-center font-medium flex items-center justify-center gap-2">
                            <Sparkles className="w-4 h-4" /> {status}
                        </div>
                    )}

                    <a
                        href={route('social.redirect', 'google')}
                        className="group relative flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-4 text-base font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:border-pink-300 hover:shadow-md hover:-translate-y-0.5"
                    >
                        <svg className="h-6 w-6" aria-hidden="true" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        <span>Continuar com Google</span>
                        <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-ping" />
                        </div>
                    </a>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                            Feito com <Heart className="w-3 h-3 text-pink-400 fill-pink-400" /> para a Sarah
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
