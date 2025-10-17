import type { NextFunction, Request, Response } from "express";
import Erros from "@/core/shared/Erros";
import type Usuario from "@/core/usuario/model/Usuario";
import type RepositorioUsuario from "@/core/usuario/service/RepositorioUsuario";
import type { ProvedorJWT } from "./ProvedorJwt";

export type TUserRequest = {
	usuario: Usuario;
} & Request;

export const UsuarioMiddleware = (
	repositorio: RepositorioUsuario,
	provedorJWT: ProvedorJWT,
) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const acessoNegado = () => res.status(403).send(Erros.ACESSO_NEGADO);

		const token = req.headers.authorization?.replace("Bearer ", "") ?? null;

		if (!token) {
			return acessoNegado();
		}

		const usuarioToken: Usuario = provedorJWT.obter(token) as Usuario;

		const usuario = await repositorio.buscarPorEmail(usuarioToken.email);

		if (!usuario) {
			return acessoNegado();
		}

		(req as TUserRequest).usuario = usuario;

		next();
	};
};
