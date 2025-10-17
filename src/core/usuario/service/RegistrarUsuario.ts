import type CasoDeUso from "@/core/shared/CasoDeUse";
import Erros from "@/core/shared/Erros";
import Id from "@/core/shared/id";
import type Usuario from "../model/Usuario";
import type ProvedorCriptografia from "./ProvedorCriptografia";
import type RepositorioUsuario from "./RepositorioUsuario";

export default class RegistrarUsuário implements CasoDeUso<Usuario, void> {
	constructor(
		private readonly repositorio: RepositorioUsuario,
		private readonly provedorCripto: ProvedorCriptografia,
	) {}

	async executar(usuario: Usuario): Promise<void> {
		const usuarioExistente = await this.repositorio.buscarPorEmail(
			usuario.email,
		);
		if (usuarioExistente) throw new Error(Erros.USUARIO_JA_EXISTE);

		if (!usuario.senha) {
			throw new Error(Erros.SENHA_OBRIGATORIA);
		}

		const senhaCripto = this.provedorCripto.criptografar(
			usuario.senha ?? "",
		);

		const id = new Id();

		const newUser: Usuario = {
			id: id.gerarHash(),
			nome: usuario.nome,
			email: usuario.email,
			senha: senhaCripto,
		};

		this.repositorio.inserir(newUser);
	}
}
