import pgPromise from "pg-promise";
import { environment } from "@/core/shared/env";

const pgp = pgPromise();
export const db = pgp({
	host: environment.DB_HOST,
	port: environment.DB_PORT,
	database: environment.DB_DATABASE,
	user: environment.DB_USER,
	password: environment.DB_PASSWORD,
});
