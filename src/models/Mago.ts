import { Personagem } from "./Personagem";
import { ClassePersonagem } from "../enums/enums";
import { PersonagemMortoError, ManaInsuficienteError } from "../errors/errors";

export class Mago extends Personagem {
    private _mana: number;
    private _manaMaxima: number;

    constructor(nome: string) {
        super(nome, ClassePersonagem.MAGO, 80, 15, 5);
        this._manaMaxima = 100;
        this._mana = 100;
    }

    public get mana(): number {
        return this._mana;
    }

    public set mana(mana: number) {
        if (mana > this._manaMaxima) {
            this._mana = this._manaMaxima;
        } else if (mana < 0) {
            this._mana = 0;
        } else {
            this._mana = mana;
        }
    }

    public bolaDeFogo(alvo: Personagem): void {
        if (this.estaVivo() === false) {
            throw new PersonagemMortoError(`${this.nome} está morto e não pode lançar magias.`);
        }
        if (alvo.estaVivo() === false) {
            throw new PersonagemMortoError(`${alvo.nome} já está morto.`);
        }
        if (this._mana < 30) {
            throw new ManaInsuficienteError(`${this.nome} não tem mana suficiente para Bola de Fogo.`);
        }

        this._mana = this._mana - 30
        console.log(`${this.nome} lançou BOLA DE FOGO! (Mana restante: ${this._mana})`)

        const dano = (this.ataque * 3) - alvo.defesa
        const danoReal = Math.max(0, dano)

        alvo.vida = alvo.vida - danoReal
        console.log(`${alvo.nome} sofreu ${danoReal} de dano de BOLA DE FOGO! Conjurado por ${this.nome}`)
    }

    public meditar(): void {
        if (this.estaVivo() === false) {
            throw new PersonagemMortoError(`${this.nome} está morto e não pode meditar.`);
        }

        this._mana = this._mana + 25

        if (this._mana > this._manaMaxima) {
            this._mana = this._manaMaxima
        }

        console.log(`${this.nome} usou MEDITAR e recuperou mana. Mana atual: ${this._mana}.`)
    }
}