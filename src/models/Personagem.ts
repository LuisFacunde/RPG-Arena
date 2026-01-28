import { ClassePersonagem } from "../enums/enums";
import { Item } from "../interfaces/interfaces";

export abstract class Personagem {
    private _vida: number;
    private _vidaMaxima: number;
    private _inventario: Item[];
    public nome: string;
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
}