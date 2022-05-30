// Algoritmos de implementação das codificações em banda base

/*

Configuração do gráfico:

Nível                          Valor no gráfico         
Nível Alto (+)           =>     1
Ausência de Sinal (0)    =>     0
Nível Baixo (-)          =>    -1

*/

// Codificação NRZI
// Característica: Não ocorre transição entre nível alto e baixo com bit 0, apenas com bit 1

export function converteNrzi(sequencia) { // Sequência de entrada do input como parâmetro

  const nrziSeq = []; // Array para receber a sequência codificada em NRZI
  var estado = "0"; // Inicialização da variável que guarda o estado para comparação
  var i = 0; // Inicialização do contador do laço

  while (i < sequencia.length) { // Laço que percorre toda a sequência de entrada

    if (i === 0) { // Se for o primeiro bit da sequência
      
      if (sequencia[i] === "0") { // Se o primeiro bit for 0, inicia no nível baixo
        nrziSeq.push(-1); // Nível Baixo (-) => -1
        estado = "-1"; // Guarda o estado para comparação
        i++;
      }

      if (sequencia[i] === "1") { // Se o primeiro bit for 1, inicia no nível alto
        nrziSeq.push(1); // Nível Alto (+) => 1
        estado = "1"; // Guarda o estado para comparação
        i++;
      }

    } else if (i > 0) { // Para os bits seguintes

      if (sequencia[i] === "0") { // Se o bit for 0, não ocorre transição

        if (estado === "1") { // Se estava no nível alto, mantém
          nrziSeq.push(1); // Nível Alto (+) => 1
          i++;
        } else if (estado === "-1") { // Se estava no nível baixo, mantém
          nrziSeq.push(-1); // Nível Baixo (-) => -1
          i++;
        }

      } else if (sequencia[i] === "1") { // Se o bit for 1, ocorre transição

        if (estado === "1") { // Se estava no nível alto, vai para o nível baixo
          nrziSeq.push(-1); // Nível Baixo (-) => -1
          estado = "-1"; // Guarda o estado atual para comparação
          i++;
        } else if (estado === "-1") { // Se estava no nível baixo, vai para o nível alto
          nrziSeq.push(1); // Nível Alto (+) => 1
          estado = "1"; // Guarda o estado atual para comparação
          i++;
        }

      }
    }
  }

  return nrziSeq; // Retorna a sequência codificada em NRZI para o gráfico
}

// Codificação Pseudoternary
/*
Característica: Bit 1 representa ausência de sinal e bit 0 representa 
a alterância entre pulsos positivos e negativos
*/

export function convertePseudo(sequencia) { // Sequência de entrada do input como parâmetro
  
  const pseudoSeq = []; // Array para receber a sequência codificada em Pseudoternary
  var estado = "-1"; // Inicialização da variável que guarda o estado para comparação
  var i = 0; // Inicialização do contador do laço

  while (i < sequencia.length) { // Laço que percorre toda a sequência de entrada

    if (i === 0) { // Se for o primeiro bit da sequência

      if (sequencia[i] === "0") { // Se o primeiro bit for 0, inicia no nível alto
        pseudoSeq.push(1); // Nível Alto (+) => 1
        estado = "1"; // O pulso positivo é guardado
        i++;
      }

      if (sequencia[i] === "1") { // Se o primeiro bit for 0, há ausência de sinal
        pseudoSeq.push(0); // Ausência de Sinal (0) => 0
        i++;
      }

    } else if (i > 0) { // Para os bits seguintes

      if (sequencia[i] === "0") { // Se o bit for 0, ocorre a alternância de pulsos

        if (estado === "1") { // Se estava no nível alto, vai para o nível baixo
          pseudoSeq.push(-1); // Nível Baixo (-) => -1
          estado = "-1"; // O pulso negativo é guardado
          i++;
        } else if (estado === "-1") { // Se estava no nível baixo, vai para o nível alto
          pseudoSeq.push(1); // Nível Alto (+) => 1
          estado = "1"; // O pulso positivo é guardado
          i++;
        }

      } else if (sequencia[i] === "1") { // Se o bit for 1, há ausência de sinal
        pseudoSeq.push(0); // Ausência de Sinal (0) => 0
        i++;
      }

    }
  }

  return pseudoSeq; // Retorna a sequência codificada em Pseudoternary para o gráfico
}


// Codificação 4B3T
/* Característica: Conversão de agrupamentos de 4 bits para 3 bits, leva em
consideração o acúmulo de disparidade DC */

export function converte4B3T(sequencia) {
  var disparidade = -2; // A disparidade inicial adotada
  const soma = (x, y) => { // Função de soma para pular o zero
    if ((x + y) === 0 ) {
      if (y > 0) {
        return 1;
      } else if (y < 0) {
        return -1;
      }
    }
  }

  // Função para a conversão dos agrupamentos de 4 bits em 3 bits
  const codificaTernario = (grupo) => { // O grupo de 4 bits é passado como parâmetro
    
    switch (grupo) { // Casos para cada possibilidade de agrupamento
      
      case "0000":
        return [0, -1, 1]; // 0 - +, (+0)

      case "0001":
        return [-1, 1, 0]; // - + 0, (+0)

      case "0010":
        return [-1, 0, 1]; // + - 0, (+0)

      case "0011":
        if (disparidade < 0) { // Modo positivo
          disparidade = soma(disparidade,1); // (+1)
          return [1, -1, 1]; // + - +
        } else if (disparidade > 0) { // Modo negativo
          disparidade = soma(disparidade,-1); // (-1)
          return [-1, 1, -1]; // - + -
        }

      case "0100":
        if (disparidade < 0) { // Modo positivo
          disparidade = soma(disparidade,2); // (+2)
          return [0, 1, 1]; // 0 + +
        } else if (disparidade > 0) { // Modo negativo
          disparidade = soma(disparidade,-2); // (-2)
          return [0, -1, -1]; // 0 - -
        }

      case "0101":
        if (disparidade < 0) { // Modo positivo
          disparidade = soma(disparidade,1); // (+1)
          return [0, 1, 0]; // 0 + 0
        } else if (disparidade > 0) { // Modo negativo
          disparidade = soma(disparidade,-1); // (-1)
          return [0, -1, 0]; // 0 - 0
        }

      case "0110":
        if (disparidade < 0) { // Modo positivo
          disparidade = soma(disparidade,1); // (+1)
          return [0, 0, 1]; // 0 0 +
        } else if (disparidade > 0) { // Modo negativo
          disparidade = soma(disparidade,-1); // (-1)
          return [0, 0, -1]; // 0 0 -
        }

      case "0111":
        if (disparidade < 0) { // Modo positivo
          disparidade = soma(disparidade,1); // (+1)
          return [-1, 1, 1]; // - + +
        } else if (disparidade > 0) { // Modo negativo
          disparidade = soma(disparidade,-1); // (-1)
          return [1, -1, -1]; // + - -
        }

      case "1000":
        return [0, 1, -1]; // 0 + -, (+0)

      case "1001":
        return [1, -1, 0]; // + - 0, (+0)

      case "1010":
        return [1, 0, -1]; // + 0 -, (+0)

      case "1011":
        if (disparidade < 0) { // Modo positivo
          disparidade = soma(disparidade,1); // (+1)
          return [1, 0, 0]; // + 0 0
        } else if (disparidade > 0) { // Modo negativo
          disparidade = soma(disparidade,-1); // (-1)
          return [-1, 0, 0]; // - 0 0
        }

      case "1100":
        if (disparidade < 0) { // Modo positivo
          disparidade = soma(disparidade,2); // (+2)
          return [1, 0, 1]; // + 0 +
        } else if (disparidade > 0) { // Modo negativo
          disparidade = soma(disparidade,-2); // (-2)
          return [-1, 0, -1]; // - 0 -
        }

      case "1101":
        if (disparidade < 0) { // Modo positivo
          disparidade = soma(disparidade,2); // (+2)
          return [1, 1, 0]; // + + 0
        } else if (disparidade > 0) { // Modo negativo
          disparidade = soma(disparidade,-2); // (-2)
          return [-1, -1, 0]; // - - 0
        }

      case "1110":
        if (disparidade < 0) { // Modo positivo
          disparidade = soma(disparidade,1); // (+1)
          return [1, 1, -1]; // + + -
        } else if (disparidade > 0) { // Modo negativo
          disparidade = soma(disparidade,-1); // (-1)
          return [-1, -1, 1]; // - - +
        }

      case "1111":
        if (disparidade < 0) { // Modo positivo
          disparidade = soma(disparidade,3); // (+3)
          return [1, 1, 1]; // + + +
        } else if (disparidade > 0) { // Modo negativo
          disparidade = soma(disparidade,-3); // (-3)
          return [-1, -1, -1]; // - - -
        }

      default:
    }
  };

  var qbttSeq = []; // Array para receber a sequência codificada em 4B3T

  // Divisão da sequência de entrada em agrupamentos de 4 bits
  const agrupamentos = sequencia.split(/(.{4})/).filter((O) => O);

  // Laço para percorrer o array de agrupamentos
  for (var i = 0; i < agrupamentos.length; i++) {
    // Cada grupo de 4 é codificado em uma sequência de 3 pulsos, adicionada ao array
    qbttSeq.push.apply(qbttSeq, codificaTernario(agrupamentos[i]));
  }

  return qbttSeq; // Retorna a sequência codificada em 4B3T para o gráfico
}
