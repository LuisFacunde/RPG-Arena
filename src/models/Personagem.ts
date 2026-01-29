import { ClassePersonagem } from "../enums/enums";
import { Item } from "../interfaces/interfaces";
import { PersonagemMortoError, InventarioCheioError } from "../errors/errors";

export abstract class Personagem {
    private _vida: number;
    private _vidaMaxima: number;
    protected _inventario: Item[];
    public readonly nome: string;
    public classe: ClassePersonagem
    public ataque: number;
    public defesa: number

    constructor(
        nome: string,
        classe: ClassePersonagem,
        vidaMaxima: number,
        ataque: number,
        defesa: number
    ) {
        this.nome = nome;
        this.classe = classe;
        this._vidaMaxima = vidaMaxima;
        this._vida = vidaMaxima;
        this.ataque = ataque;
        this.defesa = defesa;
        this._inventario = [];
    }

    public get vida(): number {
        return this._vida;
    }

    public set vida(vida: number) {
        if (vida > this._vidaMaxima) {
            this._vida = this._vidaMaxima;
        } else if (vida < 0) {
            this._vida = 0;
        } else {
            this._vida = vida;
        }
    }

    public estaVivo(): boolean {
        if (this._vida > 0) {
            return true;
        } else {
            return false
        }
    }

    public atacar(alvo: Personagem): number {
        if (this.estaVivo() === false) {
            throw new PersonagemMortoError(`${this.nome} está morto e não pode atacar.`)
        }

        if (alvo.estaVivo() === false) {
            throw new PersonagemMortoError(`${alvo.nome} está morto e não pode ser atacado.`)
        }

        const dano = Math.max(0, this.ataque - alvo.defesa)
        alvo.vida = alvo.vida - dano;

        console.log(`${this.nome} atacou ${alvo.nome} causando ${dano} de dano!`)
        return dano
    }

    public curar(quantidade: number): void {
        if (this.estaVivo() === false) {
            throw new PersonagemMortoError(`${this.nome} está morto e não pode ser curado.`)
        }

        this.vida = this.vida + quantidade
        console.log(`${this.nome} recebeu ${quantidade} de cura. Vida atual: ${this.vida}`);
    }

    public adicionarItem(item: Item): void {
        if (this._inventario.length >= 5) {
            throw new InventarioCheioError();
        }
        this._inventario.push(item);
        console.log(`${item.nome} foi adicionado ao inventário de ${this.nome}.`);
    }

    public usarItem(indice: number): void {
        if (indice < 0 || indice >= this._inventario.length) {
            throw new Error("Espaço de inventário inválido.");
        }

        const item = this._inventario[indice]!;
        console.log(`${this.nome} usou ${item.nome}.`);
        item.usar();

        this._inventario.splice(indice, 1);
    }
}
