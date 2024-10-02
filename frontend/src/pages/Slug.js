import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import DOMPurify from 'dompurify';

/* chakra */
import { Container, Flex, Heading, Box, Image, keyframes, Text } from '@chakra-ui/react';

/* utils */
import { getRootPage, getPageData, getImage } from "../utils";

const Slug = () => {
    const { data } = useLoaderData();
    console.log(data);
    
    return (
        <>
            <Text>Slug</Text>
        </>
    );
}

export default Slug;

export const loaderSlug = async ({ params }) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v2/pages/?fields=*&slug=${params.slug}`);
    const data = response.data;
    return { data };
};