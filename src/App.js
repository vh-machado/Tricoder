import React, { useEffect, useState } from "react";
import "./App.css";
import { SettingsIcon } from "@chakra-ui/icons";
import {
  Flex,
  Text,
  Center,
  Input,
  Button,
  Fade,
  VStack,
  Image,
} from "@chakra-ui/react";
import PulseChart from "./components/PulseChart";
import { converteNrzi, convertePseudo, converte4B3T, converte4B3T2 } from "./Algoritmos";

const banner = require("./assets/img/banner.png");
const logo = require("./assets/img/logo.png");

// Definição da quantidade de bits de entrada
const quantidadeBits = 16;

// Função principal do app
const App = () => {

  // Declaração de Hooks

  // Controla o estado da sequência digitada
  const [sequenciaEntrada, setSequenciaEntrada] = useState("");

  // Controla os estados dos botões de seleção de codificação
  const [buttonNrzi, setButtonNrzi] = useState(false); // Botão NRZI
  const [buttonPseudo, setButtonPseudo] = useState(false); // Botão Pseudoternary
  const [button4B3T, setButton4B3T] = useState(false); // Botão 4B3T

  // Controla os estados da visibilidade dos gráficos
  const [showNrzi, setShowNrzi] = useState(false); // Visibilidade do gráfico NRZI
  const [showPseudo, setShowPseudo] = useState(false); // Visibilidade do gráfico Pseudoternary
  const [show4B3T, setShow4B3T] = useState(false); // Visibilidade do gráfico 4B3T

  // Controla o estado do valor do campo de digitação
  const [inputValue, setInputValue] = useState("");

  // Condição de campo inválido (se a sequência tiver comprimento diferente do definido acima)
  const isInputInvalid = inputValue.length !== quantidadeBits;

  // Controla o estado da visibilidade da mensagem de erro abaixo do campo de digitação
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Função do evento para a alteração do valor do campo de digitação
  const handleInputChange = (e) => {
    const valor = e.target.value; // Const recebe o valor do campo de digitação
    
    // Condições para digitação no campo
    if (valor === "" && inputValue.length === 1) { // Permite que todos os valores sejam apagados
      setInputValue(valor); // Atualiza o valor no campo
    } else if (valor[valor.length - 1] !== "0" && valor[valor.length - 1] !== "1") {
      e.preventDefault(); // Não permite que o campo digitação receba valores diferentes de 0 e 1
    } else {
      setInputValue(valor); // Atualiza o valor no campo
    }
  };

  // Funções para mudar a cor dos botões de seleção de codificação

  const clickNrzi = () => { // Evento de clique no botão NRZI
    setButtonNrzi(!buttonNrzi);
  };

  const clickPseudo = () => { // Evento de clique no botão Pseudoternary
    setButtonPseudo(!buttonPseudo);
  };

  const click4B3T = () => { // Evento de clique no botão 4B3T
    setButton4B3T(!button4B3T);
  };

  // Função do evento de clique no botão Gerar, mostra a codificação dos métodos selecionados
  const clickGerar = () => {
    // Só mostra os gráficos se a entrada é válida
    if (!isInputInvalid) {
      setShowErrorMessage(false); // A mensagem de erro é escondida, caso estivesse aparecendo antes
      setSequenciaEntrada(inputValue); // A sequência de entrada é recebida e convertida
      setShowNrzi(buttonNrzi); // Caso o botão NRZI esteja ativado, o gráfico do NRZI será mostrado
      setShowPseudo(buttonPseudo); // Caso o botão Pseudoternary esteja ativado, o gráfico do NRZI será mostrado
      setShow4B3T(button4B3T); // Caso o botão 4B3T esteja ativado, o gráfico do NRZI será mostrado
    } else {
      setShowErrorMessage(true); // Se a entrada é inválida, a mensagem de erro aparecerá
    }
  };

  // Declaração de Hooks para controlar o estado dos dados dos gráficos
  const [categoryNrzi, setCategoryNrzi] = useState([]); // Rótulos do eixo x do gráfico NRZI
  const [dataNrzi, setDataNrzi] = useState([]); // Valores (x,y) do gráfico NRZI
  const [categoryPseudo, setCategoryPseudo] = useState([]); // Rótulos do eixo x do gráfico Pseudoternary
  const [dataPseudo, setDataPseudo] = useState([]); // Valores (x,y) do gráfico Pseudoternary
  const [category4B3T, setCategory4B3T] = useState([]); // Rótulos do eixo x do gráfico 4B3T
  const [data4B3T, setData4B3T] = useState([]); // Valores (x,y) do gráfico 4B3T

  // Atualização dos componentes
  useEffect(() => {

    // Somente se a sequencia de entrada não for vazia
    if (sequenciaEntrada !== "") {
      // Constantes para receber sequências
      const estadoNrzi = []; // Receberá a sequência de valores pra reta do gráfico NRZI
      const numBitsNrzi = []; // Receberá a sequência após a conversão pelo NRZI
      const estadoPseudo = []; // Receberá a sequência de valores pra reta do gráfico Pseudoternary
      const numBitsPseudo = []; // Receberá a sequência após a conversão pelo Pseudoternary
      const estado4B3T = []; // Receberá a sequência de valores pra reta do gráfico 4B3T
      const numBits4B3T = []; // Receberá a sequência após a conversão pelo 4B3T

      var sequencia = sequenciaEntrada; // Variávelque recebe a sequência de entrada atual

      // Chamada das funções de codificação

      var seqNrzi = [];
      seqNrzi = converteNrzi(sequenciaEntrada); // Conversão da sequência de entrada para NRZI
      seqNrzi.push(seqNrzi[seqNrzi.length - 1]); // Duplicação do último bit para manter a reta no final do gráfico

      var seqPseudo = [];
      seqPseudo = convertePseudo(sequenciaEntrada); // Conversão da sequência de entrada para Pseudoternary
      seqPseudo.push(seqPseudo[seqPseudo.length - 1]); // Duplicação do último bit para manter a reta no final do gráfico

      var seq4B3T = [];
      seq4B3T = converte4B3T2(sequenciaEntrada); // Conversão da sequência de entrada para 4B3T
      seq4B3T.push(seq4B3T[seq4B3T.length - 1]); // Duplicação do último bit para manter a reta no final do gráfico

      sequencia += " "; // Para formatação dos rótulos do eixo x dos gráficos

      // Passagem de valores do NRZI para atualização do gráfico NRZI
      for (var i = 0; i < seqNrzi.length; i++) {
        estadoNrzi.push(seqNrzi[i]); // Passa os valores pra configuração da reta do gráfico NRZI
        numBitsNrzi.push(sequencia[i]); // Passa os valores da sequência de entrada
      }

      // Passagem de valores do Pseudoternary para atualização do gráfico Pseudoternary
      for (var j = 0; j < seqPseudo.length; j++) {
        estadoPseudo.push(seqPseudo[j]); // Passa os valores pra configuração da reta do gráfico Pseudoternary
        numBitsPseudo.push(sequencia[j]); // Passa os valores da sequência de entrada
      }

      // Passagem de valores do 4B3T para atualização do gráfico 4B3T
      for (var h = 0; h < seq4B3T.length; h++) {
        estado4B3T.push(seq4B3T[h]); // Passa os valores pra configuração da reta do gráfico 4B3T
        if (h === seq4B3T.length - 1) {
          numBits4B3T.push(" "); // Para formatação dos rótulos do eixo x do gráfico 4B3T
        } else if (seq4B3T[h] === -1) {
          numBits4B3T.push("-"); // Para representar pulso negativo como rótulo do eixo x
        } else if (seq4B3T[h] === 1) {
          numBits4B3T.push("+"); // Para representar pulso negativo como rótulo do eixo x
        } else {
          numBits4B3T.push(seq4B3T[h]); // Para representar pulso 0 como rótulo do eixo x
        }
      }

      setCategoryNrzi(numBitsNrzi); // Atualização dos rótulos do eixo x do gráfico NRZI
      setDataNrzi(estadoNrzi); // Atualização dos valores da reta do gráfico NRZI
      setCategoryPseudo(numBitsPseudo); // Atualização dos rótulos do eixo x do gráfico Pseudoternary
      setDataPseudo(estadoPseudo); // Atualização dos valores da reta do gráfico Pseudoternary
      setCategory4B3T(numBits4B3T); // Atualização dos rótulos do eixo x do gráfico 4B3T
      setData4B3T(estado4B3T); // Atualização dos valores da reta do gráfico 4B3T
    }
  });
  return (
    <Flex 
      flex="1"
      bg="#FBD561"
      h="100vh"
      direction="row"
      justify="center"
      pt="3"
      pb="3"
      pl="10"
      pr="10"
    >

      <Center
        align="stretch"
        alignSelf="center"
        bg="#FFFFFF"
        direction="row"
        borderRadius="18"
        shadow="xl"
        w="1180px"
        h="620px"
      >
        
        <Center flexDiretction="column" h="100%" w="300px" p="3">
          
          <Center flex="1" flexDirection="column" alignSelf="flex-start">

            <Center
              flexDirection="row"
              align="flex-start"
              alignSelf="flex-start"
              p="1"
              pl="3"
              ml="-3"
              mt="3"
              mb="3"
              pr="3"
              bg="#FB6D37"
              borderBottomRightRadius="20"
              borderTopRightRadius="20"
              shadow="md"
            >

              <Image src={logo} boxSize="20px" />

              <Text
                w="100%"
                fontSize="xs"
                m="2"
                color="white"
                alignSelf="flex-start"
                fontFamily="Rubik"
                fontWeight="300"
              >
                Tricoder
              </Text>

            </Center>

            <Center
              flex="1"
              bg="#FFF7EE"
              flexDirection="column"
              m="3"
              mb="1"
              borderRadius="20"
              p="3"
              pb="5"
            >

              <SettingsIcon alignSelf="flex-start" m="2" color="#4E3B9D" />

              <Text
                w="100%"
                fontSize="md"
                m="2"
                color="#4E3B9D"
                alignSelf="flex-start"
                fontFamily="Rubik"
                fontWeight="500"
              >
                Conversão
              </Text>

              <Input
                w="100%"
                borderColor={!showErrorMessage ? "#56CFE1" : "red"}
                focusBorderColor={!showErrorMessage ? "#56CFE1" : "red"}
                placeholder="Código"
                _placeholder={{
                  opacity: 1,
                  color: "gray.500",
                  fontFamily: "Rubik",
                  fontWeight: 300,
                }}
                borderRadius="15"
                color={!showErrorMessage ? "#4E3B9D" : "red"}
                fontFamily="Rubik"
                fontWeight="300"
                size="md"
                width="auto"
                value={inputValue}
                inputMode="numeric"
                onChange={handleInputChange}
              />

              {!showErrorMessage ? (
                <Text
                  w="100%"
                  fontSize="xs"
                  m="2"
                  color="#4E3B9D"
                  alignSelf="flex-start"
                  fontFamily="Rubik"
                  fontWeight="300"
                >
                  Digite a sequência a ser codificada.
                </Text>
              ) : (
                <Text
                  w="100%"
                  fontSize="xs"
                  m="2"
                  color="red"
                  alignSelf="flex-start"
                  fontFamily="Rubik"
                  fontWeight="300"
                >
                  A sequência deve conter 16 bits.
                </Text>
              )}
            </Center>

            <VStack w="100%" m="5" mb="2" p="3">

              <Button
                bg={buttonNrzi ? "#C83C04" : "#FFAC64"}
                color="white"
                variant="solid"
                h="50px"
                w="100%"
                borderRadius="20"
                shadow="md"
                _hover={{ bg: "#FB6D37" }}
                _active={{ bg: "#FB6D37" }}
                _focus={{
                  boxShadow:
                    "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                }}
                onClick={() => clickNrzi()}
              >
                NRZI
              </Button>

              <Button
                bg={buttonPseudo ? "#C83C04" : "#FFAC64"}
                color="white"
                variant="solid"
                h="50px"
                w="100%"
                borderRadius="20"
                shadow="md"
                _hover={{ bg: "#FB6D37" }}
                _active={{ bg: "#FB6D37" }}
                _focus={{
                  boxShadow:
                    "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                }}
                onClick={() => clickPseudo()}
              >
                Pseudoternary
              </Button>

              <Button
                bg={button4B3T ? "#C83C04" : "#FFAC64"}
                color="white"
                variant="solid"
                h="50px"
                w="100%"
                borderRadius="20"
                shadow="md"
                _hover={{ bg: "#FB6D37" }}
                _active={{ bg: "#FB6D37" }}
                _focus={{
                  boxShadow:
                    "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                }}
                onClick={() => click4B3T()}
              >
                4B3T
              </Button>

            </VStack>

            <Center w="100%" m="3" borderRadius="20" p="3" pb="5">

              <Button
                w="100%"
                color="white"
                variant="solid"
                h="60px"
                borderRadius="25"
                shadow="md"
                bg="#6454C3"
                _hover={{ bg: "#4E3B9D" }}
                _active={{ bg: "#4E3B9D" }}
                _focus={{
                  boxShadow:
                    "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                }}
                onClick={() => clickGerar()}
              >
                Gerar
              </Button>

            </Center>

          </Center>

        </Center>

        <Center
          w="920px"
          h="100%"
          bg="#F8F8F7"
          borderTopRightRadius="18"
          borderBottomRightRadius="18"
        >
          {!show4B3T && !showPseudo && !showNrzi ? (
            <Center
              flex="1"
              align="stretch"
              justify="center"
              direction="column"
              m="2"
              ml="8"
              mr="8"
            >

              <Fade in={!show4B3T && !showPseudo && !showNrzi}>

                <Center pt="3" pr="3" pl="3">

                  <Image src={banner} />

                </Center>

              </Fade>

            </Center>
          ) : (
            <VStack
              flex="1"
              align="stretch"
              justify="center"
              direction="column"
              m="2"
              ml="8"
              mr="8"
            >

              {showNrzi ? (
                <Fade in={showNrzi}>

                  <Center
                    bg="white"
                    pt="3"
                    pr="3"
                    pl="3"
                    borderRadius="10"
                    shadow="xl"
                  >

                    <PulseChart
                      strokeColor="#00bfff"
                      idChart="Nrzi-example"
                      categoryX={categoryNrzi}
                      offsetXLabels={8}
                      tickAmountY={1}
                      colorsYLabels={["orangered", "limegreen"]}
                      titleChart="NRZI"
                      dataChart={dataNrzi}
                    />

                  </Center>

                </Fade>
              ) : (
                <></>
              )}

              {showPseudo ? (
                <Fade in={showPseudo}>

                  <Center
                    bg="white"
                    pt="3"
                    pr="3"
                    pl="3"
                    borderRadius="10"
                    shadow="xl"
                  >

                    <PulseChart
                      strokeColor="#ff69b4"
                      idChart="pseudo-example"
                      categoryX={categoryPseudo}
                      offsetXLabels={8}
                      tickAmountY={2}
                      colorsYLabels={["orangered", "#4E3B9D", "limegreen"]}
                      titleChart="Pseudoternary"
                      dataChart={dataPseudo}
                    />

                  </Center>

                </Fade>
              ) : (
                <></>
              )}

              {show4B3T ? (
                <Fade in={show4B3T}>

                  <Center
                    bg="white"
                    pt="3"
                    pr="3"
                    pl="3"
                    borderRadius="10"
                    shadow="xl"
                  >

                    <PulseChart
                      strokeColor="#ff8c00"
                      idChart="4B3T-example"
                      categoryX={category4B3T}
                      offsetXLabels={10}
                      tickAmountY={2}
                      colorsYLabels={["orangered", "#4E3B9D", "limegreen"]}
                      titleChart="4B3T"
                      dataChart={data4B3T}
                    />

                  </Center>

                </Fade>
              ) : (
                <></>
              )}

            </VStack>

          )}

        </Center>

      </Center>

    </Flex>

  );
};

export default App;
