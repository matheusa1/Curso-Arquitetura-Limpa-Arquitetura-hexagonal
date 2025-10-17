import type { Express } from "express";
import type RegistrarUsuário from "@/core/usuario/service/RegistrarUsuario";
import { Logger } from "@/util/logger";

export class RegistrarUsuarioController {
	constructor(
		readonly servidor: Express,
		readonly casoDeUso: RegistrarUsuário,
	) {
		servidor.post("/api/usuarios/registrar", async (req, res) => {
			try {
				await casoDeUso.executar({
					email: req.body.email,
					nome: req.body.nome,
					senha: req.body.senha,
				});
				res.status(201).send();
			} catch (erro: unknown) {
				const error = erro as Error;
				Logger.error(`Erro ao registrar usuário: ${error.message}`);
				res.status(400).send(error.message);
			}
		});
		Logger.info("Rota [POST] /api/usuarios/registrar criada com sucesso");
	}
}
