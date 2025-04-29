import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";

// import { Fragment } from "react";

const CadastroFilme = () => {
    return (
        <>
            <Header />
            <main>
                <Cadastro titulo ="Cadastro de Filme" placeholder = "filme:"/>
                <Lista tituloLista = "Lista de Filmes" />
            </main>
                <Footer />
        </>
    )
}

export default CadastroFilme;