import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

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
        <GuestLayout>
            <Head title="Completar Cadastro" />

            <div className="mb-4 text-sm text-gray-600">
                Olá! Antes de ver a lista de presentes, precisamos saber quem é você e seu parentesco com a aniversariante (Sarah Lorraine).
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="real_name" value="Seu Nome (como é conhecido)" />

                    <TextInput
                        id="real_name"
                        name="real_name"
                        value={data.real_name}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('real_name', e.target.value)}
                        required
                    />

                    <InputError message={errors.real_name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="relationship" value="Parentesco / Vínculo (ex: Tio, Prima, Amigo)" />

                    <TextInput
                        id="relationship"
                        name="relationship"
                        value={data.relationship}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('relationship', e.target.value)}
                        required
                    />

                    <InputError message={errors.relationship} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Salvar e Continuar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
