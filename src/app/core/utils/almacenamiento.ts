/**
 * Utilidades mínimas para guardar datos en localStorage.
 * Si no hay navegador (SSR) o los datos están dañados, se usa el valor inicial.
 */
export function cargar<T>(clave: string, inicial: T): T {
  if (typeof localStorage === 'undefined') {
    return inicial;
  }

  try {
    const guardado = localStorage.getItem(clave);
    return guardado ? (JSON.parse(guardado) as T) : inicial;
  } catch {
    return inicial;
  }
}

export function guardar<T>(clave: string, valor: T): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(clave, JSON.stringify(valor));
}
