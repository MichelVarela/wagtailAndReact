import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DOMPurify from 'dompurify';
import { Container, Heading, Box, Image } from '@chakra-ui/react'


axios.defaults.baseURL = process.env.REACT_APP_API_URL

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
            const result = await axios.get(`${process.env.REACT_APP_API_URL}/pages/?type=home.HomePage&fields=header,body&id=` + id)
            
            setData(result.data.items);
            setBody(result.data.items[0].body);
            setLoading(false);
            
            let html = [];
            for (let i = 0; i < body.length; i++) {          
                
                if (body[i].type === 'image') { 
                    const results = await axios.get(`${process.env.REACT_APP_API_URL}/images/` + body[i].value)
                    .then(results => {                    
                        setImage(results.data.meta.download_url)
                    })
                }
                
                else if (body[i].type === 'paragraph') {
                    html.push(
                        <Box>
                            <Box dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body[i].value) }} />
                        </Box>
                    );
                    setParagraph(html)
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
            <h4>
            <img src="https://i.pinimg.com/originals/48/6a/a0/486aa0fa1658b7522ecd8918908ece40.gif" />
            </h4>
        );
    } 
    
    return (
        <Container>
            <Box boxSize='sm'>
                <Image src={`${process.env.REACT_APP_API_URL}/${image}`} alt='Dan Abramov' />
            </Box>
        
            <div>
            {data.map((data) => (
                <ul key={data.id}>
                {data.title} <br />
                {data.description}
                </ul>))}            
            </div>

            <div>
            {paragraph.map((paragraph) => (
            <ul>
                {paragraph}
            </ul>))}
            </div>
        </Container>
    );
}

export default App;