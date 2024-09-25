import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Heading, Box } from '@chakra-ui/react'


axios.defaults.baseURL = process.env.REACT_APP_API_URL

function App() {
    const [home, setHome] = useState([]);

    useEffect(() => {
        axios.get("/api/v2/pages/?type=home.HomePage&fields=header,body&id=3").then((response) => {
            setHome(response.data);
            console.log(response.data)
        });
    }, []);
    
    return (
        <Container>
          <Heading as="h2">Hi {home.title}</Heading>
          <Box dangerouslySetInnerHTML={{ __html: home.header }}></Box>
        </Container>
    );
}
export default App;