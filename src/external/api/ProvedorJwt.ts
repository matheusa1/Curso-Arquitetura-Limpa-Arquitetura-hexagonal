import jwt from "jsonwebtoken";

export class ProvedorJWT {
	constructor(private readonly segredo: string) {}

	gerar(dados: string | object): string {
		return jwt.sign(dados, this.segredo, {
			expiresIn: "1d",
		});
	}

	obter(token: string): string | object {
		return jwt.verify(token, this.segredo);
	}
}
