import {
  Box,
  Center,
  Text,
  Stack,
  Avatar,
  Button,
  useColorModeValue,
  Badge,
  Heading
} from "@chakra-ui/react";

import { useState } from "react";

import axios from "./../api";

export default function BlogPostWithImage({
  userImage,
  date,
  userName,
  text,
  
  score,
  id,
}) {
  const [sentiment, setSentiment] = useState(null);

  const [entity, setEntity] = useState(null);
  const [geolocation , setGeolocation] = useState(null);


  const fetchData = async () => {
     await axios.all([
      axios.post("/analyze/standard/en/sentiment", {
        document: { text },
      }),
      axios.post("/categorize/geotax/en", {
        document: {text},
      }), 
      axios.post("/analyze/standard/en/entities", {
        document: {text}
      })
    ])
    .then(axios.spread((data1, data2, data3) => {
      setSentiment(data1.data)
      setGeolocation(data2.data)
      setEntity(data3.data)
      console.log(data3.data)
    }))
  };
  return (
    <Center py={6} style={{ display: "flex", flexDirection: "column", border: "1px solid #e2e2e2  " }}>
      <Box
        maxW={"750px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"1xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Stack>
          <Text color={"gray.500"}>{text}</Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar src={userImage} alt={userName} />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{userName}</Text>
            <Text color={"gray.500"}>{date}</Text>
          </Stack>
        </Stack>
        <Button onClick={fetchData}>Analyse</Button>
      </Box>

      {sentiment !== null ? (
        <div style={{width: "400px"}}>
          <Text as="h6" size="md">
            Related Organisation, Person or Place
          </Text>
          <div style={{ display: "flex", flexDirection: "row", paddingBottom: "25px", borderBottom: '1px solid black',justifyContent: "space-around"  }}>
            {entity?.data?.entities?.map((en) =>{
              return (
                <div key={en.lemma}>
                  <Badge style={{marginRight: '8px'}} colorScheme="gray">
                    {en.lemma}
                  </Badge>
                </div>
              )
            } )
            }
          </div>
          <div className="flex">
            <Text fontWeight={400}>
            Related Geolocation 
            </Text>
            <Badge colorScheme="grey">
                {geolocation?.data !== null ? "NONE": 
                <Text></Text>}
              </Badge>
          </div>
          
          
          <Heading as="h4" size="md">Sentiment Analysis</Heading>
            
          <div style={{ display: "flex", flexDirection: "row", margin: "4px" }}>
            {sentiment?.data?.sentiment?.items?.map((lemma) => {
              return (
                <div key={lemma.lemma}>
                  <Badge style={{marginRight: '9  px'}} colorScheme={lemma.sentiment > 0 ? "green" : "red"}>
                    {lemma.lemma}
                  </Badge>
                </div>
              );
            })}
          </div>
          <div>
            <div className="flex">
            <Text fontWeight={600}>
              overall: 
            </Text>
            <Text>
            {sentiment.data.sentiment.overall}
            </Text>
            </div>
            <div className="flex">
            <Text fontWeight={600}>
            Positivity rating 
            </Text>
            <Badge colorScheme={sentiment.data.sentiment.positivity >= 0 ? "green" : "red"}>
                    {sentiment.data.sentiment.positivity}
              </Badge>
            </div>
            <div className="flex">
            <Text fontWeight={600}>
            Negativity rating 
            </Text>
            <Badge colorScheme={sentiment.data.sentiment.negativity > 0 ? "green" : "red"}>
                    {sentiment.data.sentiment.negativity}
              </Badge>
            </div>
          </div>
        </div>
      ) : null}
    </Center>
  );
}
