import { Head, useForm } from '@inertiajs/react';
import { PartyPopper, Heart, Star, Sparkles, User, Users } from 'lucide-react';
import { useEffect } from 'react';

export default function CompleteProfile({ googleName }) {
    const { data, setData, post, processing, errors } = useForm({
        real_name: googleName || '',
        relationship: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('guest.info.store'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-amber-100 flex items-center justify-center p-4 relative overflow-hidden">
            <Head title="Completar Cadastro - Aniversário da Sarah" />

            {/* Background Decorations */}
            <div className="absolute top-10 right-10 animate-bounce delay-1000">
                <Star className="w-10 h-10 text-amber-300 fill-amber-300 opacity-60" />
            </div>
            <div className="absolute bottom-20 left-10 animate-pulse">
                <Heart className="w-14 h-14 text-pink-300 fill-pink-300 opacity-60" />
            </div>
            <div className="absolute top-1/4 left-20 animate-bounce">
                <Sparkles className="w-8 h-8 text-rose-300 opacity-60" />
            </div>


            <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border-2 border-pink-100 relative z-10 transition-all hover:shadow-2xl hover:scale-[1.005] duration-300">
                {/* Header Decoration */}
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="bg-white/20 p-2 rounded-full mb-2 backdrop-blur-sm shadow-inner">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-0 drop-shadow-md">Quem é você?</h1>
                        <p className="text-pink-100 text-xs">Precisamos te conhecer melhor!</p>
                    </div>
                </div>

                <div className="p-8">
                    <div className="text-center mb-6">
                        <p className="text-gray-600 text-sm">
                            Olá! Antes de ver a lista de presentes, conte para nós como você gostaria de ser chamado(a) e qual seu parentesco com a <strong>Sarah</strong>.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-1">
                            <label htmlFor="real_name" className="block text-sm font-medium text-gray-700">
                                Seu Nome <span className="text-xs text-gray-400 font-normal">(como é conhecido)</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="real_name"
                                    type="text"
                                    value={data.real_name}
                                    onChange={(e) => setData('real_name', e.target.value)}
                                    className="pl-10 block w-full rounded-xl border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm py-2.5 transition-colors bg-white/50"
                                    placeholder="Ex: Tio João, Aninha..."
                                    required
                                    autoFocus
                                />
                            </div>
                            {errors.real_name && <p className="text-xs text-red-500 mt-1">{errors.real_name}</p>}
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
                                Parentesco / Vínculo
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Users className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="relationship"
                                    type="text"
                                    value={data.relationship}
                                    onChange={(e) => setData('relationship', e.target.value)}
                                    className="pl-10 block w-full rounded-xl border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm py-2.5 transition-colors bg-white/50"
                                    placeholder="Ex: Tio, Prima, Amigo da família..."
                                    required
                                />
                            </div>
                            {errors.relationship && <p className="text-xs text-red-500 mt-1">{errors.relationship}</p>}
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="group w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 animate-spin" /> Salvando...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Salvar e Ver Lista <Heart className="w-4 h-4 fill-pink-200 text-pink-200 group-hover:animate-ping" />
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
