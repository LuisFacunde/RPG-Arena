import { Item } from "../interfaces/interfaces";
import { Raridade } from "../enums/enums";
import { PersonagemMortoError } from "../errors/errors";
import { Personagem } from "./Personagem";

export class PocaoVida implements Item {
    public nome: string = "Poção de Cura";
    public descricao: string = "Recupera 50 pontos de vida.";
    public raridade: Raridade = Raridade.COMUM;

    public usar(alvo: Personagem): void {
        if (alvo.estaVivo() === false) {
            throw new PersonagemMortoError(`${alvo.nome} está morto! Não é possível utilizar a POÇÃO DE CURA.`);
        }
        const cura = 50
        console.log(`${alvo.nome} está bebendo uma POÇÃO DE CURA!`);
        alvo.curar(cura);
    }
}
