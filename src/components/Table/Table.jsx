import React, { useState, useEffect } from "react";
import useDebounce from "../utilities/hooks/useDebounce";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Container,
  Input,
  Box,
} from "@chakra-ui/react";

function CommonTable() {
  const [text, setText] = useState("");
  const [currency,setCurrency] = useState([])

  const fetchFn = async() => {     
    try {        
      const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=false")
      const data = await response.json()
      setCurrency(data)
    } catch (error) {
        alert(error)
    }
  };


  const searchFn = () => {
   if(text){
    const filteredData = currency.filter((c)=> c.name.includes(text))
    setCurrency(filteredData)
   }else{
    fetchFn()    
   }   
  }

  useEffect(() => {
     fetchFn()
  }, [])
  
  useDebounce(searchFn, 1000, text);

  return (
    <div style={{ margin: "1rem", padding: "1rem" }}>
      <Container maxW="container.xl">
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",             
            }}
          >
            <div>
              {" "}
              <Input
                type="text"
                onChange={(e) => {
                  setText(e.target.value);
                }}
                value={text}
                placeholder="Search..."
              />{" "}
            </div>
          </div>
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
               <Th>Name</Th>
                <Th>Symbol</Th>
                <Th isNumeric>Price</Th>
              </Tr>
            </Thead>
            <Tbody>    

              {currency.length > 0 && currency.map(({id,name,symbol,current_price})=>(
                <Tr key={id}>
                <Td>{name}</Td>
                <Td> {symbol}</Td>
                <Td isNumeric>Rs. {current_price}</Td>
              </Tr>))}

            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Name</Th>
                <Th>Symbol</Th>
                <Th isNumeric>Price</Th>
              </Tr>
            </Tfoot>
          </Table>
        </Box>
      </Container>
    </div>
  );
}

export default CommonTable;
