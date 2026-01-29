import { Personagem } from "./Personagem";
import { ClassePersonagem } from "../enums/enums";
import { PersonagemMortoError } from "../errors/errors";

export class Guerreiro extends Personagem {
    constructor(nome: string) {
        super(nome, ClassePersonagem.GUERREIRO, 150, 18, 10);
    }

    public golpeBrutal(alvo: Personagem): void {
        if (this.estaVivo() === false) {
            throw new PersonagemMortoError(`${this.nome} está morto e não pode usar está habilidade.`)
        }

        if (alvo.estaVivo() === false) {
            throw new PersonagemMortoError(`${alvo.nome} está morto e não pode ser atingido por esta habilidade.`)
        }

        console.log(`${this.nome} usou GOLPE BRUTAL!`)

        const dano = (this.ataque * 2) - alvo.defesa
        const danoReal = Math.max(0, dano)

        alvo.vida = alvo.vida - danoReal
        console.log(`${alvo.nome} sofrou ${danoReal} de dano de GOLPE BRUTAL! Conjurado por ${this.nome}`)
    }
}
