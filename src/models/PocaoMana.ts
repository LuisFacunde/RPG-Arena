import { Item } from "../interfaces/interfaces";
import { Raridade } from "../enums/enums";
import { Personagem } from "./Personagem";
import { Mago } from "./Mago";
import { Arqueiro } from "./Arqueiro";

export class PocaoMana implements Item {
    public nome: string = "Poção de Mana";
    public descricao: string = "Recupera 25 pontos de mana.";
    public raridade: Raridade = Raridade.INCOMUM;

    public usar(alvo: Personagem): void {
        if (alvo instanceof Mago || alvo instanceof Arqueiro) {
            console.log(`${alvo.nome} está bebendo uma POÇÃO DE MANA`);

            const valorRecuperadoMana = 25;

            alvo.mana = alvo.mana + valorRecuperadoMana;
            console.log(`${alvo.nome} recuperou ${valorRecuperadoMana}.`);
        } else {
            console.log(`${alvo.nome} bebeu a poção, mas não sente efeito pois não usa mana.`);
        }
    }
}
