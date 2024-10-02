import axios from "axios";

const getImage = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v2/images/${id}`);
    return response.data;
};

export { getImage }