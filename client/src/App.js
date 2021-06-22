import {useState} from 'react'

import axios from 'axios';
import { Input, Stack, Button } from "@chakra-ui/react"
import "./App.css"
import { ChakraProvider } from "@chakra-ui/react"
import { Container } from "@chakra-ui/react"

import Card from './components/Card'

function App() {
  const [input, setInput] = useState("com.whitehatjr")

  const [data, setData] = useState(null);

  const apiURL = "http://localhost:4000/api/apps/" + input + "/reviews/"
  
  const fetchData = async () => {
    const response = await axios.get(apiURL)
    setData(response.data) 
}

  return (
    <ChakraProvider>
      <Container>
      <div className="App">
      <Stack spacing={3}>
        <div>
        <Input value={input} onChange={(e) => {setInput(e.target.value)}} placeholder="Type your APP ID:" size="lg"/>
       <Button colorScheme="teal" size="xs" onClick={fetchData}>
    Search
  </Button>
        </div>
        {data !== null ? 
          data.results.data.map((post) => {
            return (
              <Card 
                key={post.id} 
                userImage={post.userImage} 
                userName={post.userName} 
                text={post.text}
                score={post.score}
              />
            // <div key={post.id}>
            //   <div>
            //     {post.text}
            //   </div>
            //   <div>
            //     {post.score}
            //   </div>
            //   <div>
            //     <img height="100px" width="100px" style={{borderRadius: '50%'}} src={post.userImage} alt={post.username} />;
            //   </div>
            // </div>
            )
          })
        : <h1>See how the people are reviewing your app</h1>}
        {/* <Card/> */}
      </Stack>
    </div>
    </Container>
    </ChakraProvider>
    
  );
}

export default App;
