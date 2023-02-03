//1 - Performance = O retorno do valor fica salvo, só executa a função se precisar novamente
//2 - Referenciar o objeto para que eu consiga fazer a comparação dele. Como se um objeto JS tivesse um id
import { useMemo } from "react";

import { useLocation } from "react-router-dom";

export function useQuery() {
  const { search } = useLocation(); //Pegando os parâmetros da URL

  return useMemo(() => new URLSearchParams(search), [search]) //Buscando o parâmetro que tiver na busca, URL. Array de dependências

}
