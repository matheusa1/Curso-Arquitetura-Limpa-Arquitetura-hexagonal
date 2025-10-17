import type ProvedorCriptografia from "../../core/usuario/service/ProvedorCriptografia";

// Na arquitetura hexagonal, essa classe seria um adaptador que implementa a interface ProvedorCriptografia
// O adaptador não faz parte do core da aplicação, mas sim da camada externa, que pode ser trocada facilmente
export default class InverterSenhaCripto implements ProvedorCriptografia {
	criptografar(senha: string): string {
		return senha.split("").reverse().join("");
	}

	comparar(senha: string, hash: string): boolean {
		return this.criptografar(senha) === hash;
	}
}
