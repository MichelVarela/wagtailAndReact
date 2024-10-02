import React, { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from 'dompurify';

/* chakra */
import { Container, Heading, Box, Image, keyframes, Text } from '@chakra-ui/react';
import { SpinnerIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

/* swiper carousel */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import "swiper/css/autoplay";

/* utils */
import { getRootPage, getPageData, getImage } from "../utils";


axios.defaults.baseURL = process.env.REACT_APP_API_URL

const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0); border-radius: 20%; }
  25% { transform: scale(2) rotate(0); border-radius: 20%; }
  50% { transform: scale(2) rotate(270deg); border-radius: 50%; }
  75% { transform: scale(1) rotate(270deg); border-radius: 50%; }
  100% { transform: scale(1) rotate(0); border-radius: 20%; }
`;

const animation = `${animationKeyframes} 2s ease-in-out infinite`;

function Home() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [body, setBody] = useState([]);
    
    const retrieveBody = async () => {
        
        try {
            setLoading(true)
            const rootPage = await getRootPage();
            
            /* tomo los datos de homePage[0] */
            setData(rootPage);
            
            /* body actual */
            let currentBody = rootPage.body;
            /* body reestructurado */
            let restructuredBody = [];

            for (let i = 0; i < currentBody.length; i++) {

                if (currentBody[i].type === 'heading') {
                    currentBody[i].value = <Heading as="h2">{currentBody[i].value}</Heading>;
                }

                if (currentBody[i].type === 'paragraph') {
                    let paragraph = currentBody[i].value;
                    
                    /* parse del richtext */
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(currentBody[i].value, 'text/html');

                    /* mostrar imagenes en el richtext */
                    const embed = doc.querySelectorAll('embed[embedtype="image"]');
                    
                    if (embed.length > 0) {
                        for (let j = 0; j < embed.length; j++) {
                            
                            const image = await getImage(embed[j].getAttribute("id"));
                            const format = embed[j].getAttribute("format"); /* classes fullwidth, left, right */                            
                            
                            let addSlash = embed[j].outerHTML.replace('">', '"/>').trim();
                            
                            /* replace de embedtype[image] por tags img */
                            paragraph = paragraph.replace(addSlash, `<img src=${process.env.REACT_APP_API_URL + image.meta.download_url} alt="${image.title}" class="${format}" style="margin-top: 1rem; margin-bottom: 1rem;">`);
                        }
                    }

                    const internalLink = doc.querySelectorAll('a[linktype="page"]');
                    
                    /* mostrar redireccionamientos a páginas internas */
                    if (internalLink.length > 0) {
                        for (let j = 0; j < internalLink.length; j++) {
                            //console.log(internalLink[j].getAttribute("id"));
                            const link = await getPageData(internalLink[j].getAttribute("id"));
                            console.log(link);
                            
                        }
                    }
                    
                    currentBody[i].value = <Box dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(paragraph) }}></Box>;
                }

                if (currentBody[i].type === 'gallery') {
                    let gallery = [];

                    for (let j = 0; j < currentBody[i].value.length; j++) {

                        const image = await getImage(currentBody[i].value[j]);
                        gallery.push(<Box p="1rem"><Image src={process.env.REACT_APP_API_URL + image.meta.download_url} alt={image.title}></Image></Box>);
                    }

                    /* swiper carousel */
                    currentBody[i].value = <Swiper modules={[Autoplay]} slidesPerView="auto" loop={true} autoplay={{ delay: 3000 }}>
                        {gallery.map((slide, item) => (
                            <SwiperSlide key={item} style={{width: "auto"}}>{slide}</SwiperSlide>
                        ))}
                    </Swiper>
                }

                if (currentBody[i].type === 'image') {

                    const image = await getImage(currentBody[i].value);
                    currentBody[i].value = <Box p="2rem"><Image src={process.env.REACT_APP_API_URL + image.meta.download_url} alt={image.title}></Image></Box>;
                }

                /* if (currentBody[i].type === 'video') {
                    currentBody[i].value = <Box dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`<iframe width="560" height="315" src="${currentBody[i].value}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'web-share'] }) }}></Box>;
                } */

                restructuredBody.push(currentBody[i])
            }

            setBody(restructuredBody);
            //console.log(body);
            
            setLoading(false);      
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
        <>
            <Box marginBottom="2rem">
                {/* header */}
                <Text dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.header) }}></Text>
            </Box>

            <Box>
                {body.map(item => (
                    <Box key={item.id} marginBottom="2rem">{item.value}</Box>
                ))}
            </Box>
        </>
    );
}

export default Home;