import { Personagem } from "./Personagem";
import { ClassePersonagem } from "../enums/enums";
import { PersonagemMortoError, ManaInsuficienteError } from "../errors/errors";

export class Arqueiro extends Personagem {
    private _mana: number;
    private _manaMaxima: number;

    constructor(nome: string) {
        super(nome, ClassePersonagem.ARQUEIRO, 100, 16, 8);
        this._mana = 50;
        this._manaMaxima = 50;
    }

    public atacar(alvo: Personagem): number {
        if (this.estaVivo() === false) {
            throw new PersonagemMortoError(`${this.nome} está morto e não pode atacar.`);
        }
        if (alvo.estaVivo() === false) {
            throw new PersonagemMortoError(`${alvo.nome} está morto e não pode ser atacado.`);
        }

        const chanceCritico = Math.random();
        let multiplicadorDano = 1;

        if (chanceCritico <= 0.3) {
            multiplicadorDano = 2;
            console.log(`ACERTO CRÍTICO! ${this.nome} acertou um ataque crítico!`);
        }

        const dano = (this.ataque * multiplicadorDano) - alvo.defesa;
        const danoReal = Math.max(0, dano);

        alvo.vida = alvo.vida - danoReal;
        console.log(`${this.nome} disparou em ${alvo.nome} causando ${danoReal} de dano!`);

        return danoReal;
    }


    public flechaPrecisa(alvo: Personagem): void {
        if (this.estaVivo() === false) {
            throw new PersonagemMortoError(`${this.nome} está morto e não pode usar FLECHA PRECISA.`);
        }
        if (this._mana < 15) {
            throw new ManaInsuficienteError(`${this.nome} não tem mana suficiente para FLECHA PRECISA.`);
        }

        this._mana = this._mana - 15;
        console.log(`${this.nome} usou FLECHA PRECISA! (Mana restante: ${this._mana})`);

        const dano = this.ataque + 9;

        alvo.vida = alvo.vida - dano;
        console.log(`${alvo.nome} sofreu ${dano} de dano de FLECHA PRECISA! Lançada por ${this.nome}`);
    }
}