import { Personagem } from "./Personagem";

export class Arena {
    private lutadores: Personagem[];

    constructor() {
        this.lutadores = []
    }

    public adicionarLutador(lutador: Personagem) {
        this.lutadores.push(lutador)
        console.log(`O lutador ${lutador.nome} (${lutador.classe}) entrou na ARENA!`)
    }

    public listarLutadores(): void {
        console.log("\n---- Lutadores na ARENA ----");
        this.lutadores.forEach(lutador => {
            console.log(`${lutador.nome} | Classe: ${lutador.classe} | Vida: ${lutador.vida} | Ataque: ${lutador.ataque} | Defesa: ${lutador.defesa}`);
        })
    }

    public buscarLutador(nomeParticipante: string): Personagem {
        const lutador = this.lutadores.find(lutador => lutador.nome === nomeParticipante);
        if (!lutador) {
            throw new Error(`O lutador ${nomeParticipante} não está na ARENA!`);
        }
        return lutador;
    }

    public batalhar(lutador1: string, lutador2: string): void {
        const participante1 = this.buscarLutador(lutador1);
        const participante2 = this.buscarLutador(lutador2);

        console.log("\n --- INÍCIO DO COMBATE ---");
        console.log(`Lutadores: ${participante1.nome} VS ${participante2.nome}\n`);

        let turno = 1;

        while (participante1.estaVivo() && participante2.estaVivo()) {
            console.log(`\n--- Turno ${turno} ---`);

            try {
                participante1.atacar(participante2);

                if (participante2.estaVivo()) {
                    participante2.atacar(participante1);
                }

            } catch (error: any) {
                console.log(`ERRO NO TURNO: ${error.message}`);
            }

            console.log(`Placar: ${participante1.nome} (${participante1.vida} HP) x ${participante2.nome} (${participante2.vida} HP)`);
            turno++;
        }

        const vencedor = participante1.estaVivo() ? participante1 : participante2;
        const perdedor = participante1.estaVivo() ? participante2 : participante1;

        console.log(`\nVENCEDOR DO CONFRONTO: ${vencedor.nome}!`);
        console.log(`${perdedor.nome} caiu em batalha.\n`);
    }
}
