import type CasoDeUso from "@/core/shared/CasoDeUse";
import type Usuario from "@/core/usuario/model/Usuario";
import type { Produto } from "../model/Produto";

export type Entrada = {
	produtoId: string;
	usuario: Usuario;
};

export class ObterProdutoPorId implements CasoDeUso<Entrada, Produto> {
	executar(entrada: Entrada): Promise<Produto> {
		const produto: Produto = {
			id: entrada.produtoId,
			nome: "Produto Exemplo",
			preco: 99.99,
		};

		console.log(entrada.usuario);

		return Promise.resolve(produto);
	}
}
