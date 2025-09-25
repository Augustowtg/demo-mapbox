import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Foco {
  municipio: string;
  // adicione outras propriedades se precisar
}

const fetchFocos = async (): Promise<Foco[]> => {
  const response = await axios.get("https://queimadas.dgi.inpe.br/api/focos", {
    params: {
      uf: "SP",        // Estado
      ano: 2024,       // Ano
      formato: "json", // Formato JSON
    },
  });
  return response.data;
};

export const ListMenu: React.FC = () => {
  const { data = [], isLoading, error } = useQuery<Foco[], Error>({
    queryKey: ["focos"],
    queryFn: fetchFocos,
  });

  if (isLoading) return <p>Carregando dados...</p>;
  if (error) return <p>Erro ao buscar dados: {error.message}</p>;

  // Agrupa os focos por município
  const municipiosCount: Record<string, number> = data.reduce((acc, item) => {
    acc[item.municipio] = (acc[item.municipio] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Top 10 municípios
  const topCidades = Object.entries(municipiosCount)
    .map(([municipio, count]) => ({ municipio, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <div>
      <h2>Top 10 Municípios com Mais Focos de Incêndio</h2>
      <ul>
        {topCidades.map(({ municipio, count }) => (
          <li key={municipio}>
            {municipio}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
};
