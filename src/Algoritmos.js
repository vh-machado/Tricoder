export function converteNrzi(seq) {
  const nrziSeq = [];
  var estado = "0";
  var i = 0;
  while (i < seq.length) {
    if (i === 0) {
      if (seq[i] === "0") {
        nrziSeq.push(-1);
        estado = "-1";
        i++;
      }
      if (seq[i] === "1") {
        nrziSeq.push(1);
        estado = "1";
        i++;
      }
    } else if (i > 0) {
      if (seq[i] === "0") {
        if (estado === "1") {
          nrziSeq.push(1);
          estado = "1";
          i++;
        } else if (estado === "-1") {
          nrziSeq.push(-1);
          estado = "-1";
          i++;
        }
      } else if (seq[i] === "1") {
        if (estado === "1") {
          nrziSeq.push(-1);
          estado = "-1";
          i++;
        } else if (estado === "-1") {
          nrziSeq.push(1);
          estado = "1";
          i++;
        }
      }
    }
  }
  return nrziSeq;
}

export function convertePseudo(seq) {
  const pseudoSeq = [];
  var estado = "0";
  var i = 0;
  while (i < seq.length) {
    if (i === 0) {
      if (seq[i] === "0") {
        pseudoSeq.push(1);
        estado = "1";
        i++;
      }
      if (seq[i] === "1") {
        pseudoSeq.push(0);
        i++;
      }
    } else if (i > 0) {
      if (seq[i] === "0") {
        if (estado === "1") {
          pseudoSeq.push(-1);
          estado = "-1";
          i++;
        } else if (estado === "-1") {
          pseudoSeq.push(1);
          estado = "1";
          i++;
        }
      } else if (seq[i] === "1") {
        pseudoSeq.push(0);
        i++;
      }
    }
  }

  return pseudoSeq;
}

export function converte4B3T(seq) {
  
  const codificaTernario = (grupo) => {
    switch (grupo) {
      case "0000":
        return [1, 0, 1]; // + 0 +, (+2)
      case "0001":
        return [0, -1, 1]; // 0 - +, (+0)
      case "0010":
        return [1, -1, 0]; // + - 0, (+0)
      case "0011":
        return [0, 0, 1]; // 0 0 +, (+1)
      case "0100":
        return [-1, 1, 0]; // - + 0, (+0)
      case "0101":
        return [0, 1, 1]; // 0 + +, (+2)
      case "0110":
        return [-1, 1, 1]; // - + +, (+1)
      case "0111":
        return [-1, 0, 1]; // - 0 +, (+0)
      case "1000":
        return [1, 0, 0]; // + 0 0, (+1)
      case "1001":
        return [1, -1, 1]; // + - +, (+1)
      case "1010":
        return [1, 1, -1]; // + + -, (+1)
      case "1011":
        return [1, 0, -1]; // + 0 -, (+0)
      case "1100":
        return [1, 1, 1]; // + + +, (+3)
      case "1101":
        return [0, 1, 0]; // 0 + 0, (+1)
      case "1110":
        return [0, 1, -1]; // 0 + -, (+0)
      case "1111":
        return [1, 1, 0]; // + + 0, (+2)
      default:
    }
  }

  var qbttSeq = [];
  const agrupamentos = seq.split(/(.{4})/).filter((O) => O);

  for (var i = 0; i < agrupamentos.length; i++) {
    qbttSeq.push.apply(qbttSeq, codificaTernario(agrupamentos[i]));
  }

  return qbttSeq;
}
