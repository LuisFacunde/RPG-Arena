// Interfaces para criação dos itens na arena
import { Raridade } from "../enums/enums";
import { Personagem } from "../models/Personagem";

export interface Item {
    nome: string;
    descricao: string;
    raridade: Raridade;
    usar(alvo: Personagem): void;
}