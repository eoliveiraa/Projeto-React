import "./CadastroGenero.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";

const CadastroGenero = () => {
    return (
        <>
            <Header />
            <main>
                <Cadastro
                    titulo="Cadastro de Gênero"
                    visibilidade="none"
                    placeholder="genero:" />

                <Lista tituloLista="Lista de gêneros" visivel="none" />
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;