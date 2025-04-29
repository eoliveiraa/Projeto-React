import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import CadastroFilme from "../pages/cadastroFilme/CadastroFilme";
import CadastroGenero from "../pages/cadastroGenero/CadastroGenero";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} exact/>
                <Route path="/Filme" element={<CadastroFilme />} />
                <Route path="/Genero" element={<CadastroGenero />} />

                {/* Caminho das rotas, direcionando para as paginas,
                 http://localhost:3000/'pagina direcionada' */}

            </Routes>
        </BrowserRouter>

    )
}

export default Rotas;