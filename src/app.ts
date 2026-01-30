import { Arena } from "./models/Arena";
import { Guerreiro } from "./models/Guerreiro";
import { Mago } from "./models/Mago";
import { Arqueiro } from "./models/Arqueiro";
import { PocaoVida } from "./models/PocaoVida";
import { PocaoMana } from "./models/PocaoMana";

const pocaoVida = new PocaoVida();
const pocaoMana = new PocaoMana();

const conan = new Guerreiro("Conan");
const harryPotter = new Mago("Harry Potter");

console.log("--- Os participantes estão se Equipando ---");
conan.adicionarItem(pocaoVida);
harryPotter.adicionarItem(pocaoVida);
harryPotter.adicionarItem(pocaoMana);

const arena = new Arena();
arena.adicionarLutador(conan);
arena.adicionarLutador(harryPotter);

console.log("\n--- INICIO DA BATALHA 1: Conan vs Harry Potter ---");

let turno = 1;

while (conan.estaVivo() && harryPotter.estaVivo()) {
    console.log(`\n--- TURNO ${turno} ---`);
    console.log(`Status: ${conan.nome} (${conan.vida} HP) vs ${harryPotter.nome} (${harryPotter.vida} HP | ${harryPotter.mana} MP)`);

    try {
        if (harryPotter.estaVivo()) {
            const indexPocaoVida = harryPotter.inventario.findIndex(pocao => pocao.nome === "Poção de Vida");

            if (harryPotter.vida < 40 && indexPocaoVida !== -1) {
                console.log(`${harryPotter.nome} usa Poção de Cura!`);
                harryPotter.usarItem(indexPocaoVida);
            } else if (harryPotter.mana >= 30) {
                harryPotter.bolaDeFogo(conan);
            } else {
                harryPotter.meditar();
            }
        }
    } catch (e: any) {
        console.log(`Erro Harry: ${e.message}`);
    }

    try {
        if (conan.estaVivo() && harryPotter.estaVivo()) {
            Math.random() < 0.2 ? conan.golpeBrutal(harryPotter) : conan.atacar(harryPotter);
        }
    } catch (error: any) {
        console.log(`Erro Conan: ${error.message}`);
    }

    turno++;
}

const vencedorBatalha1 = conan.estaVivo() ? conan : harryPotter;
const perdedorBatalha1 = conan.estaVivo() ? harryPotter : conan;

console.log(`\nVENCEDOR DA 1ª BATALHA: ${vencedorBatalha1.nome}!`);
console.log(`${perdedorBatalha1.nome} foi eliminado.`);


console.log("\n... O vencedor se prepara para o Desafio Final ... \n");

if (vencedorBatalha1 instanceof Mago) {
    vencedorBatalha1.curar(50);
    vencedorBatalha1.mana = 100;
    vencedorBatalha1.adicionarItem(new PocaoVida());
} else if (vencedorBatalha1 instanceof Guerreiro) {
    vencedorBatalha1.curar(50);
    vencedorBatalha1.adicionarItem(new PocaoVida());
}

const legolas = new Arqueiro("Legolas");
arena.adicionarLutador(legolas);

console.log(`\n--- CONFRONTO FINAL: ${vencedorBatalha1.nome} vs ${legolas.nome} ---`);

turno = 1;

while (vencedorBatalha1.estaVivo() && legolas.estaVivo()) {
    console.log(`\n--- BATALHA 2 / TURNO ${turno} ---`);
    console.log(`${vencedorBatalha1.nome} (${vencedorBatalha1.vida} HP) vs ${legolas.nome} (${legolas.vida} HP | ${legolas.mana} MP)`);

    try {
        if (vencedorBatalha1.estaVivo()) {
            if (vencedorBatalha1 instanceof Mago) {
                if (vencedorBatalha1.vida < 30) {
                    vencedorBatalha1.usarItem(0);
                }
                else if (vencedorBatalha1.mana >= 30) {
                    vencedorBatalha1.bolaDeFogo(legolas);
                }
                else {
                    vencedorBatalha1.meditar();
                }
            }
            else if (vencedorBatalha1 instanceof Guerreiro) {
                if (vencedorBatalha1.vida < 30) {
                    vencedorBatalha1.usarItem(0);
                }
                else {
                    Math.random() > 0.4 ? vencedorBatalha1.golpeBrutal(legolas) : vencedorBatalha1.atacar(legolas);
                }
            }
        }
    } catch (error: any) { console.log(`Erro Vencedor: ${error.message}`); }

    try {
        if (legolas.estaVivo() && vencedorBatalha1.estaVivo()) {
            if (legolas.mana >= 15) {
                legolas.flechaPrecisa(vencedorBatalha1);
            } else {
                legolas.atacar(vencedorBatalha1);
            }
        }
    } catch (error: any) { console.log(`Erro Legolas: ${error.message}`); }

    turno++;
}

console.log("\n--- RESULTADO FINAL DOS CONFRONTOS ---");
if (vencedorBatalha1.estaVivo()) {
    console.log(`INCRÍVEL! ${vencedorBatalha1.nome} venceu dois oponentes e é o CAMPEÃO DA ARENA!`);
} else {
    console.log(`${legolas.nome} SE MANTÉM INVICTO! O Arqueiro venceu!`);
}
