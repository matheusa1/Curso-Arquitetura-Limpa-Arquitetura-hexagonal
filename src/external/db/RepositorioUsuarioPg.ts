import type RepositorioUsuario from "@/core/usuario/service/RepositorioUsuario";
import type Usuario from "../../core/usuario/model/Usuario";
import { db } from "./db";

export default class RepositorioUsuarioPg implements RepositorioUsuario {
	async inserir(params: Usuario) {
		await db.query(
			`
                insert into usuarios (id, nome, email, senha)
                values ($1, $2, $3, $4)
            `,
			[params.id, params.nome, params.email, params.senha],
		);
	}

	async buscarPorEmail(email: string): Promise<Usuario | null> {
		const usuario = await db.oneOrNone(
			"select * from usuarios where email = $1",
			[email],
		);
		if (!usuario) return null;
		return usuario;
	}
}
