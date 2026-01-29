// Erros Personalizados
export class PersonagemMortoError extends Error {
    constructor(message: string = "O personagem está morto e não pode realizar ações.") {
        super(message)
        this.name = "PersonagemMortoError";
    }
}

export class ManaInsuficienteError extends Error {
    constructor(message: string = "Mana insuficiente utilizar esta habilidade.") {
        super(message)
        this.name = "ManaInsuficienteError";
    }
}

export class InventarioCheioError extends Error {
    constructor(message: string = "Seu inventário está cheio!") {
        super(message)
        this.name = "InventarioCheioError";
    }
}
