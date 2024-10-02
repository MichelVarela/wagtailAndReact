import axios from "axios";


const getRootPage = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v2/pages/find/?html_path=/`);
    
    return response.data;
};

const getPageData = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v2/pages/${id}`);
    
    return response.data;
};

const getChildPage = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v2/pages/?child_of=${id}&fields=*`);
    
    return response.data;
};

const getImage = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v2/images/${id}`);
    return response.data;
};

const getDocument = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v2/documents/${id}`);
    return response.data;
};

export { getRootPage, getPageData, getImage, getDocument }