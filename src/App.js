import React, { useEffect, useState } from "react";
import "./App.css";
import PulseChart from "./components/PulseChart";
import { SettingsIcon } from '@chakra-ui/icons'

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

import { converteNrzi, convertePseudo, converte4B3T } from "./Algoritmos";

const quantidadeBits = 16;
const banner = require("./assets/img/banner.png");
const logo = require("./assets/img/logo.png");

const App = () => {
  const [sequenciaEntrada, setSequenciaEntrada] = useState("");

  const [buttonNrzi, setButtonNrzi] = useState(false);
  const [buttonPseudo, setButtonPseudo] = useState(false);
  const [button4B3T, setButton4B3T] = useState(false);

  const [showNrzi, setShowNrzi] = useState(false);
  const [showPseudo, setShowPseudo] = useState(false);
  const [show4B3T, setShow4B3T] = useState(false);

  const [inputValue, setInputValue] = useState('')
  
  const isInputInvalid = inputValue.length != quantidadeBits;
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const handleInputChange = (e) => {
    const valor = e.target.value;
    if(valor === "" && inputValue.length == 1){
      setInputValue(valor)
    } else if(valor[(valor).length-1] !== "0" && valor[(valor).length-1] !== "1") {
      e.preventDefault();
    } else {
      setInputValue(valor)
    }
  }

  const clickNrzi = () => {
    setButtonNrzi(!buttonNrzi);
  }

  const clickPseudo = () => {
    setButtonPseudo(!buttonPseudo);
  }

  const click4B3T = () => {
    setButton4B3T(!button4B3T);
  }

  const clickGerar = () => {
    if(!isInputInvalid){
      setShowErrorMessage(false);
      setSequenciaEntrada(inputValue);
      setShowNrzi(buttonNrzi);
      setShowPseudo(buttonPseudo);
      setShow4B3T(button4B3T);
    } else {
      setShowErrorMessage(true);
    }
  }
  

  const [categoryNrzi, setCategoryNrzi] = useState([]);
  const [dataNrzi, setDataNrzi] = useState([]);
  const [categoryPseudo, setCategoryPseudo] = useState([]);
  const [dataPseudo, setDataPseudo] = useState([]);
  const [category4B3T, setCategory4B3T] = useState([]);
  const [data4B3T, setData4B3T] = useState([]);
  
  
  useEffect(() => {
    if(sequenciaEntrada !== ""){
      const estadoNrzi = [];
      const numBitsNrzi = [];
      const estadoPseudo = [];
      const numBitsPseudo = [];
      const estado4B3T = [];
      const numBits4B3T = [];

      var sequencia = sequenciaEntrada;

      var seqNrzi = []
      seqNrzi = converteNrzi(sequenciaEntrada);
      seqNrzi.push(seqNrzi[seqNrzi.length - 1]);
      
      var seqPseudo = []
      seqPseudo = convertePseudo(sequenciaEntrada);
      seqPseudo.push(seqPseudo[seqPseudo.length - 1]);

      var seq4B3T = []
      seq4B3T = converte4B3T(sequenciaEntrada);
      seq4B3T.push(seq4B3T[seq4B3T.length - 1]);
      
      sequencia += " ";

      for (var i = 0; i < seqNrzi.length; i++) {
        estadoNrzi.push(seqNrzi[i]);
        numBitsNrzi.push(sequencia[i]);
      }

      for (var j = 0; j < seqPseudo.length; j++) {
        estadoPseudo.push(seqPseudo[j]);
        numBitsPseudo.push(sequencia[j]);
      }

      for (var h = 0; h < seq4B3T.length; h++) {
        estado4B3T.push(seq4B3T[h]);
        if (h === seq4B3T.length - 1) {
          numBits4B3T.push(" ");
        } else if (seq4B3T[h] === -1) {
          numBits4B3T.push("-");
        } else if (seq4B3T[h] === 1) {
          numBits4B3T.push("+");
        } else {
          numBits4B3T.push(seq4B3T[h]);
        }
      }
      
      
      setCategoryNrzi(numBitsNrzi);
      setDataNrzi(estadoNrzi);
      setCategoryPseudo(numBitsPseudo);
      setDataPseudo(estadoPseudo);
      setCategory4B3T(numBits4B3T);
      setData4B3T(estado4B3T);
    }
    
  });
  return (
    <Flex flex="1" bg="#FBD561" h="100vh" direction="row" justify="center" pt="3" pb="3" pl="10" pr="10">
      <Center align="stretch" alignSelf="center" bg="#FFFFFF" direction="row" borderRadius="18" shadow="xl" w="1180px" h="620px">
      
        <Center
          flexDiretction="column"
          h="100%"
          w="300px"
          p="3"
        >
          <Center flex="1" flexDirection="column" alignSelf="flex-start">

            <Center flexDirection="row" align="flex-start" alignSelf="flex-start" p="1" pl="3" ml="-3" mt="3" mb="3" pr="3" bg="#FB6D37" borderBottomRightRadius="20" borderTopRightRadius="20" shadow="md">
              <Image src={logo} boxSize="20px"/>
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

            <Center flex="1" bg="#FFF7EE" flexDirection="column" m="3" mb="1" borderRadius="20" p="3" pb="5">
              
              <SettingsIcon alignSelf="flex-start" m="2" color="#4E3B9D"/>

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
                borderColor={(!showErrorMessage)?"#56CFE1":"red"}
                focusBorderColor={(!showErrorMessage)?"#56CFE1":"red"}
                placeholder="Código"
                _placeholder={{
                  opacity: 1,
                  color: "gray.500",
                  fontFamily: "Rubik",
                  fontWeight: 300,
                }}
                borderRadius="15"
                color={(!showErrorMessage)?"#4E3B9D":"red"}
                fontFamily="Rubik"
                fontWeight="300"
                size="md"
                width="auto"
                value={inputValue}
                inputMode="numeric"
                onChange={handleInputChange}
              />

              {!showErrorMessage ?
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
                :
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
              }
            

            </Center>
            

            <VStack w="100%" m="5" mb="2" p="3">
              <Button bg={(buttonNrzi)?"#C83C04":"#FFAC64"} color="white" variant="solid" h="50px" w="100%" borderRadius="20" shadow="md"
                _hover={{bg: "#FB6D37"}}
                _active={{bg:"#FB6D37"}}
                _focus={{
                  boxShadow:
                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                }}
                onClick={() => clickNrzi()}>
                NRZI
              </Button>
              <Button bg={(buttonPseudo)?"#C83C04":"#FFAC64"} color="white" variant="solid" h="50px" w="100%" borderRadius="20" shadow="md"
                _hover={{bg: "#FB6D37"}}
                _active={{bg:"#FB6D37"}}
                _focus={{
                  boxShadow:
                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                }}
                onClick={() => clickPseudo()}>
                Pseudoternary
              </Button>
              <Button bg={(button4B3T)?"#C83C04":"#FFAC64"} color="white" variant="solid" h="50px" w="100%" borderRadius="20" shadow="md"
                _hover={{bg: "#FB6D37"}}
                _active={{bg:"#FB6D37"}}
                _focus={{
                  boxShadow:
                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                }}
                onClick={() => click4B3T()}>
                4B3T
              </Button>
            </VStack>
            
            <Center w="100%" m="3" borderRadius="20" p="3" pb="5">
              <Button w="100%" color="white" variant="solid" h="60px" borderRadius="25" shadow="md"
                bg="#6454C3"
                _hover={{bg: "#4E3B9D"}}
                _active={{bg:"#4E3B9D"}}
                _focus={{
                  boxShadow:
                    '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                }}
                onClick={() => clickGerar()}>
                Gerar
              </Button>
            </Center>

          </Center>
        </Center>
        
        <Center w="920px" h="100%" bg="#F8F8F7" borderTopRightRadius="18" borderBottomRightRadius="18">
            
          {(!show4B3T && !showPseudo && !showNrzi)
            ?
              <Center 
                flex="1"
                align="stretch"
                justify="center"
                direction="column"
                m="2"
                ml="8"
                mr="8">

                <Fade in={(!show4B3T && !showPseudo && !showNrzi)}>
                  <Center pt="3" pr="3" pl="3">
                    <Image src={banner}/>
                  </Center>
                </Fade>
              </Center>
            :
              <VStack
                flex="1"
                align="stretch"
                justify="center"
                direction="column"
                m="2"
                ml="8"
                mr="8"
              > 

                

                

                {showNrzi
                  ? 
                    <Fade in={showNrzi}>
                      <Center bg="white" pt="3" pr="3" pl="3" borderRadius="10" shadow="xl">
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
                  : <></>
                }

                {showPseudo
                  ? 
                    <Fade in={showPseudo}>
                      <Center bg="white" pt="3" pr="3" pl="3" borderRadius="10" shadow="xl">
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
                  : <></>
                }

                {show4B3T
                  ? 
                    <Fade in={show4B3T}>
                      <Center bg="white" pt="3" pr="3" pl="3" borderRadius="10" shadow="xl">
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
                  : <></>
                }
                
              </VStack>
              }
        </Center>

      </Center>
    </Flex>
  );
};
export default App;
