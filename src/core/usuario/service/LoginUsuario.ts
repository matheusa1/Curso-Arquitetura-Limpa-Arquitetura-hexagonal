import type CasoDeUso from "@/core/shared/CasoDeUse";
import Erros from "@/core/shared/Erros";
import type Usuario from "../model/Usuario";
import type ProvedorCriptografia from "./ProvedorCriptografia";
import type RepositorioUsuario from "./RepositorioUsuario";

export type TLoginUsuarioInput = {
	email: string;
	senha: string;
};

export type TLoginUsuarioOutput = Usuario;

export class LoginUsuario
	implements CasoDeUso<TLoginUsuarioInput, TLoginUsuarioOutput>
{
	constructor(
		private readonly repositorioUsuario: RepositorioUsuario,
		private readonly ProvedorCripto: ProvedorCriptografia,
	) {}

	async executar(entrada: TLoginUsuarioInput): Promise<TLoginUsuarioOutput> {
		const usuario = await this.repositorioUsuario.buscarPorEmail(
			entrada.email,
		);

		if (!usuario || !usuario.senha) {
			throw new Error(Erros.CREDENCIAIS_INCORRETAS);
		}

		const mesmaSenha = this.ProvedorCripto.comparar(
			entrada.senha,
			usuario.senha,
		);

		if (!mesmaSenha) {
			throw new Error(Erros.CREDENCIAIS_INCORRETAS);
		}

		return { ...usuario, senha: undefined };
	}
}
