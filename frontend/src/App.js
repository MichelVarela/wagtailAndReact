import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DOMPurify from 'dompurify';
import { Container, Flex, Heading, Box, Image, keyframes } from '@chakra-ui/react';
import { SpinnerIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';


axios.defaults.baseURL = process.env.REACT_APP_API_URL

const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0); border-radius: 20%; }
  25% { transform: scale(2) rotate(0); border-radius: 20%; }
  50% { transform: scale(2) rotate(270deg); border-radius: 50%; }
  75% { transform: scale(1) rotate(270deg); border-radius: 50%; }
  100% { transform: scale(1) rotate(0); border-radius: 20%; }
`;

const animation = `${animationKeyframes} 2s ease-in-out infinite`;

function App() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [body, setBody] = useState([]);
    const [image, setImage] = useState([]);
    const [paragraph, setParagraph] = useState([]);
    const { id } = useParams();
    
    const retrieveBody = async () => {
        
        try {
            setLoading(true)
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/api/v2/pages/?type=home.HomePage&fields=header,body&id=` + id);
            
            setData(result.data.items);
            setBody(result.data.items[0].body);
            setLoading(false);
            
            let paragraphs = [];
            for (let i = 0; i < body.length; i++) {          
                
                if (body[i].type === 'image') { 
                    const results = await axios.get(`${process.env.REACT_APP_API_URL}/api/v2/images/` + body[i].value)
                    .then(results => {                    
                        setImage(results.data.meta.download_url)
                    })
                }
                
                else if (body[i].type === 'paragraph') {
                    paragraphs.push(body[i]);
                    setParagraph(paragraphs);
                }
            }          
        }
        
        catch (err) {
            console.log(err);
        }
        
    };
    
    useEffect(() => {
        
        retrieveBody();
        
    }, [body.length]);
    
    if (loading) {
        return (
            <Container h="100vh" display="flex" alignItems="center" justifyContent="center">
                <Box as={motion.div}
                    animation={animation}
                    // not work: transition={{ ... }}
                    padding="2"
                    // @ts-ignore - "Does not exist" Type Error against Motion
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    width="12"
                    height="12"
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <SpinnerIcon color="white"/>
                </Box>
            </Container>
        );
    } 
    
    return (
        <Container>
            <Box boxSize='sm'>
                <Image src={`${process.env.REACT_APP_API_URL}/${image}`} alt='Dan Abramov' />
            </Box>
        
            <Box>
                {data.map((data) => (
                <Box key={data.id}>
                    <Heading>{data.title}</Heading>
                </Box>))}            
            </Box>

            <Flex direction="column" gap="1.5rem">
                {paragraph.map((paragraph) => (
                <Box key={paragraph.id} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(paragraph.value) }}/>))}
            </Flex>
        </Container>
    );
}

export default App;