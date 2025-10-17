export default interface CasoDeUso<TInput, TOutput> {
	executar(entrada: TInput): Promise<TOutput>;
}
