import { v7 as uuid } from "uuid";

export default class Id {
	gerarHash(): string {
		return uuid();
	}
}
