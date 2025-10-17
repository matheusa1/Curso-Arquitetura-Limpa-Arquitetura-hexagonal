import type { Express } from "express";
import type { ObterProdutoPorId } from "@/core/produto/service/ObterProdutoPorId";
import { Logger } from "@/util/logger";
import type { TUserRequest } from "./UsuarioMiddleware";

export class ObterProdutoPorIdController {
	constructor(
		readonly servidor: Express,
		readonly casoDeUso: ObterProdutoPorId,
		// biome-ignore lint/suspicious/noExplicitAny: Tipo genérico para middlewares
		readonly middlewares: any[] = [],
	) {
		servidor.get("/api/produtos/:id", ...middlewares, async (req, res) => {
			try {
				const usuario = (req as unknown as TUserRequest).usuario;

				const produto = await casoDeUso.executar({
					produtoId: req.params.id,
					usuario,
				});

				res.status(200).send(produto);
			} catch (erro: unknown) {
				const error = erro as Error;
				Logger.error(`Erro ao encontrar o produto: ${error.message}`);
				res.status(400).send(error.message);
			}
		});
		Logger.info("Rota [GET] /api/produtos/:id criada com sucesso");
	}
}
