// Interfaces para criação dos itens na arena
import { Raridade } from "../enums/enums";

export interface Item {
    nome: string;
    descricao: string;
    raridade: Raridade;
    usar(): void;
}