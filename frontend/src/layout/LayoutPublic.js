import { Outlet } from "react-router-dom";
import { Container } from '@chakra-ui/react';

const LayoutPublic = () => {
    return <>
        <nav>nav</nav>
        <Container maxW="2xl">
            {/* Contiene los elementos hijos de nuestra ruta raíz */}
            <Outlet/>
        </Container>
        <footer>footer</footer>
    </>;
} 

export default LayoutPublic;