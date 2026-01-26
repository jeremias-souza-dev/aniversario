// Função utilitária 'cn' para juntar classes CSS
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
