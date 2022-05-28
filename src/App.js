import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./App.css";
import PulseChart from "./components/PulseChart";
import { SettingsIcon } from '@chakra-ui/icons'

import {
  Flex,
  Text,
  Center,
  Input,
  Button,
  Box,
  WrapItem,
  Stack,
  VStack,
} from "@chakra-ui/react";

import { converteNrzi, convertePseudo, converte4B3T } from "./Algoritmos";

var seqEntrada = "0100001011101001";

var seqNrzi = converteNrzi(seqEntrada);
seqNrzi.push(seqNrzi[seqNrzi.length - 1]);
var seqPseudo = convertePseudo(seqEntrada);
seqPseudo.push(seqPseudo[seqPseudo.length - 1]);
var seq4B3T = converte4B3T(seqEntrada);
seq4B3T.push(seq4B3T[seq4B3T.length - 1]);

seqEntrada += " ";

const App = () => {
  const [count, setCount] = useState(0);

  const [categoryNrzi, setCategoryNrzi] = useState([]);
  const [dataNrzi, setDataNrzi] = useState([]);
  const [categoryPseudo, setCategoryPseudo] = useState([]);
  const [dataPseudo, setDataPseudo] = useState([]);
  const [category4B3T, setCategory4B3T] = useState([]);
  const [data4B3T, setData4B3T] = useState([]);

  useEffect(() => {
    const estadoNrzi = [];
    const numBitsNrzi = [];
    const estadoPseudo = [];
    const numBitsPseudo = [];
    const estado4B3T = [];
    const numBits4B3T = [];

    for (var i = 0; i < seqNrzi.length; i++) {
      estadoNrzi.push(seqNrzi[i]);
      numBitsNrzi.push(seqEntrada[i]);
    }

    for (var j = 0; j < seqPseudo.length; j++) {
      estadoPseudo.push(seqPseudo[j]);
      numBitsPseudo.push(seqEntrada[j]);
    }

    for (var h = 0; h < seq4B3T.length; h++) {
      estado4B3T.push(seq4B3T[h]);
      if (h == seq4B3T.length - 1) {
        numBits4B3T.push(" ");
      } else if (seq4B3T[h] == -1) {
        numBits4B3T.push("-");
      } else if (seq4B3T[h] == 1) {
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
  });
  return (
    <Flex flex="1" bg="#FBD561" h="100vh" direction="row" justify="center" pt="3" pb="3" pl="10" pr="10">
      <Center bg="#FFFFFF" direction="row" borderRadius="18" shadow="xl">
        <Center
          flexDiretction="column"
          h="100%"
          w="280px"
          p="3"
        >
          <Center flex="1" flexDirection="column" alignSelf="flex-start">
            <Center flex="1" bg="#FFF7EE" flexDirection="column" m="3" borderRadius="20" p="3" pb="5">
              
              <SettingsIcon/>

              <Text
                w="100%"
                mb="8px"
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
                borderColor="#56CFE1"
                focusBorderColor="#56CFE1"
                errorBorderColor="red"
                placeholder="Código"
                _placeholder={{
                  opacity: 1,
                  color: "gray.500",
                  fontFamily: "Rubik",
                  fontWeight: 300,
                }}
                borderRadius="15"
                color="#4E3B9D"
                fontFamily="Rubik"
                fontWeight="300"
                size="md"
                width="auto"
              />
            </Center>
            

            <VStack w="100%" mt="10" m="5" p="3">
              <Button bg="#FB6D37" color="white" variant="solid" h="50px" w="100%" borderRadius="20">
                NRZI
              </Button>
              <Button bg="#FB6D37" color="white" variant="solid" h="50px" w="100%" borderRadius="20">
                Pseudoternary
              </Button>
              <Button bg="#FB6D37" color="white" variant="solid" h="50px" w="100%" borderRadius="20">
                4B3T
              </Button>
            </VStack>
          </Center>
        </Center>
        
        <Flex h="100%" bg="#F8F8F7" borderTopRightRadius="18" borderBottomRightRadius="18">
          <VStack
            flex="1"
            align="stretch"
            justify="center"
            direction="column"
            m="2"
            ml="8"
            mr="8"
          >
            <Center bg="white" p="2" pt="5" borderRadius="10" shadow="xl">
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

            <Center bg="white" pt="3" borderRadius="10" shadow="xl">
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

            <Center bg="white" pt="3" borderRadius="10" shadow="xl">
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
          </VStack>
        </Flex>
        
      </Center>
    </Flex>
  );
};
export default App;
