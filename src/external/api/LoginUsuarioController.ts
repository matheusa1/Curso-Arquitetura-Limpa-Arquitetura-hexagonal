import type { Express } from "express";
import type { LoginUsuario } from "@/core/usuario/service/LoginUsuario";
import { Logger } from "@/util/logger";
import type { ProvedorJWT } from "./ProvedorJwt";

export class LoginUsuarioController {
	constructor(
		readonly servidor: Express,
		readonly casoDeUso: LoginUsuario,
		readonly provedorJWT: ProvedorJWT,
	) {
		servidor.post("/api/usuarios/login", async (req, res) => {
			try {
				const usuario = await casoDeUso.executar({
					email: req.body.email,
					senha: req.body.senha,
				});

				const token = this.provedorJWT.gerar(usuario);

				res.status(200).send({
					usuario,
					token,
				});
			} catch (erro: unknown) {
				const error = erro as Error;
				Logger.error(`Erro ao registrar usuário: ${error.message}`);
				res.status(400).send(error.message);
			}
		});
		Logger.info("Rota [POST] /api/usuarios/login criada com sucesso");
	}
}
