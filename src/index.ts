import dotenv from "dotenv";

dotenv.config();

import express from "express";
import { ObterProdutoPorId } from "./core/produto/service/ObterProdutoPorId";
import { environment } from "./core/shared/env";
import { LoginUsuario } from "./core/usuario/service/LoginUsuario";
import RegistrarUsuário from "./core/usuario/service/RegistrarUsuario";
import { LoginUsuarioController } from "./external/api/LoginUsuarioController";
import { ObterProdutoPorIdController } from "./external/api/ObterProdutoPorIdController";
import { ProvedorJWT } from "./external/api/ProvedorJwt";
import { RegistrarUsuarioController } from "./external/api/RegistrarUsuarioController";
import { UsuarioMiddleware } from "./external/api/UsuarioMiddleware";
import SenhaCripto from "./external/auth/SenhaCripto";
import RepositorioUsuarioPg from "./external/db/RepositorioUsuarioPg";
import { Logger } from "./util/logger";

const app = express();
const port = environment.API_PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const repositorioUsuario = new RepositorioUsuarioPg();
const provedorCripto = new SenhaCripto();
const provedorJWT = new ProvedorJWT(environment.JWT_SECRET);
const registrarUsuario = new RegistrarUsuário(
	repositorioUsuario,
	provedorCripto,
);
const loginUsuario = new LoginUsuario(repositorioUsuario, provedorCripto);
const obterProdutoPorId = new ObterProdutoPorId();

// Rotas abertas
new RegistrarUsuarioController(app, registrarUsuario);
new LoginUsuarioController(app, loginUsuario, provedorJWT);

// Rotas protegidas
const usuarioMiddleware = UsuarioMiddleware(repositorioUsuario, provedorJWT);
new ObterProdutoPorIdController(app, obterProdutoPorId, [usuarioMiddleware]);

app.listen(port, () => {
	Logger.info(`Servidor executando na porta: ${port}`);
});
