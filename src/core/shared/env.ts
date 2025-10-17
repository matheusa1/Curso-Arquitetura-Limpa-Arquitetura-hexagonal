export const environment = {
	DB_HOST: process.env.DB_HOST ?? "localhost",
	DB_PORT: Number(process.env.DB_PORT) ?? 5432,
	DB_DATABASE: process.env.DB_DATABASE ?? "postgres",
	DB_USER: process.env.DB_USER ?? "postgres",
	DB_PASSWORD: process.env.DB_PASSWORD ?? "postgres",
	API_PORT: Number(process.env.API_PORT) ?? 4000,
	JWT_SECRET: process.env.JWT_SECRET ?? "segredo",
};
