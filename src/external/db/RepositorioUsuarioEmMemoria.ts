import type RepositorioUsuario from "@/core/usuario/service/RepositorioUsuario";
import type Usuario from "../../core/usuario/model/Usuario";

export default class RepositorioUsuarioEmMemoria implements RepositorioUsuario {
	private static readonly items: Usuario[] = [];

	async inserir(params: Usuario) {
		const items = RepositorioUsuarioEmMemoria.items;
		const user = await this.buscarPorEmail(params.email);
		if (user) return;
		items.push(params);
	}

	buscarPorEmail(email: string): Promise<Usuario | null> {
		const items = RepositorioUsuarioEmMemoria.items;
		const usuario = items.find((i) => i.email === email);
		return Promise.resolve(usuario ?? null);
	}
}
