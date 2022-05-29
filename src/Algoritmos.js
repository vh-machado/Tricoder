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
        } else if (estado === "-1" || estado === "0") {
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
  var disparidade = -2;
  const codificaTernario = (grupo) => {
    switch (grupo) {

      case "0000":
        if(disparidade<=1){
          disparidade = disparidade+2
          return [1, 0, 1]; // + 0 +, (+2)
        }else if (disparidade>1){
          disparidade = disparidade-1
          return [0, -1, 0]; // 0 - 0, (-1)
        }

      case "0001":
        disparidade = disparidade+0
        return [0, -1, 1]; // 0 - +, (+0)

      case "0010":
        disparidade = disparidade+0
        return [1, -1, 0]; // + - 0, (+0)

      case "0011":
        if(disparidade<=3){
          disparidade = disparidade+1
          return [0, 0, 1]; // 0 0 +, (+1)
        }else if(disparidade>3){
          disparidade = disparidade-2
          return [-1, 0]; // - 0, (-2)
        }

      case "0100":
        disparidade = disparidade+0
        return [-1, 1, 0]; // - + 0, (+0)

      case "0101":
        if(disparidade <=1){
          disparidade = disparidade+2
          return [0, 1, 1]; // 0 + +, (+2)
        }else if(disparidade>1){
          disparidade = disparidade-1
          return [-1, 0, 0]; // - 0 0, (-1)
        }
        
      case "0110":
        if(disparidade <=2){
          disparidade = disparidade+1
          return [-1, 1, 1]; // - + +, (+1)
        }else if(disparidade>2){
          disparidade = disparidade-1
          return [-1, -1, 1]; // - - +, (-1)
        }

      case "0111":
        disparidade = disparidade+0
        return [-1, 0, 1]; // - 0 +, (+0)

      case "1000":
        if(disparidade <=3){
          disparidade = disparidade+1
          return [1, 0, 0]; // + 0 0, (+1)
        }else if(disparidade>3){
          disparidade = disparidade-2
          return [0, -1, -1]; // 0 - -, (-2)
        }

      case "1001":
        if(disparidade <=3){
          disparidade = disparidade+1
          return [1, -1, 1]; // + - +, (+1)
          
        }else if(disparidade>3){
          disparidade = disparidade-3
          return [-1, -1, -1]; // - - -, (-3)
        }
  

      case "1010":
        if(disparidade <=2){
          disparidade = disparidade+1
          return [1, 1, -1]; // + + -, (+1)
        }else if(disparidade>2){
          disparidade = disparidade-1
          return [1, -1, -1]; // + - -, (-1)
        }

      case "1011":
        disparidade = disparidade+0
        return [1, 0, -1]; // + 0 -, (+0)

      case "1100":
        if(disparidade <=1){
          disparidade = disparidade+3
          return [1, 1, 1]; // + + +, (+3)
        }else if(disparidade>1){
          disparidade = disparidade-1
          return [-1, 1, -1]; // - + -, (-1)
        }

        
      case "1101":
        if(disparidade <=3){
          disparidade = disparidade+1
          return [0, 1, 0]; // 0 + 0, (+1)
        }else if(disparidade>3){
          disparidade = disparidade-2
          return [-1, 0, -1]; // - 0 -, (-2)
        }

      case "1110":
        disparidade = disparidade+0
        return [0, 1, -1]; // 0 + -, (+0)

      case "1111":
        if(disparidade <=1){
          disparidade = disparidade+2
          return [1, 1, 0]; // + + 0, (+2)
        }else if(disparidade>1){
          disparidade = disparidade-1
          return [0, 0, -1]; // - + -, (-1)
        }
      default:
    }
    console.log(disparidade)
  }

  var qbttSeq = [];
  const agrupamentos = seq.split(/(.{4})/).filter((O) => O);

  for (var i = 0; i < agrupamentos.length; i++) {
    qbttSeq.push.apply(qbttSeq, codificaTernario(agrupamentos[i]));
  }

  return qbttSeq;
}
