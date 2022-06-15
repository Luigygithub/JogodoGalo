import { adicionarJogada } from "./jogo-do-galo";
import { obterJogadasPossiveis } from "./jogo-do-galo";
import { verificarVencedor } from "./jogo-do-galo"
import { obterLinhas } from "./jogo-do-galo"
import { verificarFimDoJogo } from "./jogo-do-galo"
import { useState } from "react";
import styles from "./styles/styles.module.css";

const JOGO_INICIAL = {
    //O tabuleiro é uma matriz 3*3
    tabuleiro: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ],
    jogador: "X"
}
//new Array(3).fill([""], [""], [""]) string [][]
export function JogoDoGalo() {
    const [jogo, setJogo] = useState(JOGO_INICIAL)


    // const [jogadorB, setJogadorB] = useState("O")

    const handleClick = (i, j) => {

        setJogo(jogoAtual => {
            const jogoTerminou = verificarFimDoJogo(jogoAtual)
            if (jogoTerminou) return jogoAtual
            return adicionarJogada(jogoAtual, jogoAtual.jogador, i, j)
        })
        //VERFIRIRCARA QUEUM GANHou
    }
    const vencedor = verificarVencedor(jogo)
    const jogoTerminou = verificarFimDoJogo(jogo)
    return (
        <div className={styles.container}>
            <div className={styles.tabuleiro}>
                {
                    jogo.tabuleiro.map((linha, i) => {
                        return (
                            <div key={`${i}`} className={styles.inLine}>
                                {linha.map((casa, j) => <div
                                    onClick={() => handleClick(i, j)
                                    }
                                    key={`l${i}c${j}`} data-testid={`l${i}c${j}`}
                                    className={styles.box}
                                >
                                    {
                                        casa === "" ? "" :
                                            <img className="imagens"
                                                src={
                                                    casa == "X" ? "https://cdn.discordapp.com/attachments/965655232048693310/972144076243738715/NARUTO_SHURICAN1.png"
                                                        : "https://cdn.discordapp.com/attachments/965655232048693310/972160179690930246/DBZ_BALL3.png"
                                                } />
                                    }

                                </div>)
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.vitoria} >
                <img className={styles.img1} src={
                    vencedor == undefined ? "https://cdn.discordapp.com/attachments/965655232048693310/972149105025482812/FIGTH1.png"
                        : vencedor == "X" ? "https://cdn.discordapp.com/attachments/965655232048693310/972151270561448046/NAruto_Victory2.png" : "https://cdn.discordapp.com/attachments/965655232048693310/972151828311605289/goku_victory2.png"
                } />
                {!jogoTerminou && <p data-testid="turn">your turn: <br />
                    <img className={styles.img2} src={
                        jogo.jogador === "X" ?
                            "https://cdn.discordapp.com/attachments/965655232048693310/972144076243738715/NARUTO_SHURICAN1.png"
                            : "https://cdn.discordapp.com/attachments/965655232048693310/972144076499615765/DBZ_BALL1.png"
                    } />
                </p>}
                {jogoTerminou && <p data-testid="gameover"></p>}
                {vencedor && <p data-testid="winner" ></p>}
                <button className="botao" data-testid="restart" onClick={() => setJogo(JOGO_INICIAL)}>
                    Rematch
                </button>
            </div>

        </div >
    )
}