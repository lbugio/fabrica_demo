// Importando los hooks useEffect y useState de React
import { useEffect, useState } from "react";

// Definiendo un componente funcional llamado PageLoader
export const PageLoader = () => {
  
  // Configurando un estado de carga usando el hook useState con un valor inicial de true
  const [loading, setLoading] = useState(true);

  // Definiendo un efecto usando el hook useEffect
  useEffect(() => {
    // Configurando un temporizador para cambiar el estado de carga a false después de 2.5 segundos (2500 milisegundos)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    // Limpiando el temporizador cuando el componente se desmonta para evitar fugas de memoria
    return () => clearTimeout(timer);
  }, []);

  // Devolviendo un elemento div con las clases y estilos CSS apropiados, mostrando u ocultando condicionalmente el elemento según el estado de carga
  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center ${
        loading ? "block" : "hidden"
      }`}
    >
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-500"></div>
    </div>
  );
};

