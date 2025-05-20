import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import { useEffect, useState } from "react";

import api from "../../Services/services";
import Swal from 'sweetalert2'

// import { Fragment } from "react";

const CadastroFilme = () => {
    const [filme, setFilme] = useState("");
    const [listaGenero, setListaGenero] = useState([])
    const [genero, setGenero] = useState("")

    function alertar(icone, mensagem) {
        //------------ALERTA------------------

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        });

        //----------FIM DO ALERTA--------------
    }

    //funcao para trazer os generos para o meu select
    async function listarGenero() {
        try {
            const resposta = await api.get("genero");
            setListaGenero(resposta.data)
        } catch (error) {
            console.log(error);

        }
    }

    async function cadastrarFilme(e) {
        e.preventDefault();
        if (filme.trim() != "") {

            try {
                await api.post("filme", { titulo: filme, idGenero: genero });
                alertar("success", "sucesso! Cadastro realizado")
                setFilme("")
                setGenero("")

            } catch (error) {
                console.log(error);

            }

        } else {
            alertar("error", "Erro! preencha os campos")
        }

    }


    useEffect(() => {
        listarGenero();
    }, [])

    return (
        <>
            <Header />
            <main>
                <Cadastro titulo="Cadastro de Filme" placeholder="filme:"
                    funcCadastro={cadastrarFilme}
                    valorInput={filme}
                    setValorInput={setFilme}
                    lista={listaGenero}
                    valorSelect={genero}
                    setValorSelect={setGenero}
                />

                <Lista tituloLista="Lista de Filmes" />
            </main>
            <Footer />
        </>
    )
}

export default CadastroFilme;