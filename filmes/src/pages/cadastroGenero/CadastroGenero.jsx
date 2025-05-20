//importaçao de componentes
import "./CadastroGenero.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";

import { useEffect, useState } from "react";
import api from "../../Services/services";
//sweet alert
import Swal from 'sweetalert2'

const CadastroGenero = () => {

    //nome do genero
    const [genero, setGenero] = useState("");
    const [listaGenero, setListaGenero] = useState([])
    //So usamos o useState quando precisamos guardar uma informaçao que muda o react precisa acompanhar
    // Quem eu vou manipular

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

    async function cadastrarGenero(e) {
        e.preventDefault();
        //alertarr a açao
        // alert("Entrou dentro da funçao cadastrarGenero");
        // trim = serve para eliminar todos os epaços inseridos

        if (genero.trim() != "") {

            try {
                //cadastrar um genero: post
                await api.post("genero", { nome: genero });
                alertar("success", "Cadastro feito com sucesso!");
                setGenero("");
                //atualiza minha lista assim que cadastrar um novo genero
                listarGenero();
            } catch (error) {
                alertar("error", "Erro! preencha o campo");
                console.log(error);

            }
            //try = tentar (o esperado)
            //catch = lança a exceçao

        } else {
            alertar("error", "Erro! entre em contato com o suporte");

        }
    }

    async function listarGenero() {
        try {
            //Aguarda a solicitaçao 
            const resposta = await api.get("genero");
            setListaGenero(resposta.data);

        } catch (error) {
            console.log(error);

        }
    }

    //funçao excluir genero
    async function excluirGenero(id) {

        //-----------ALERTA-------------//
        Swal.fire({
            title: "Voce tem certeza",
            text: "Voce nao tem como reverter esta açao!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "sim, deletar!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    //conectar api
                    // solicitar a exclusao do geenero 
                    //interpolaçao = `genero/${generoId.idGenero}`
                    // concatenaçao = um + dois = umdois

                    await api.delete(`genero/${id.idGenero}`)
                    // alertar("success", "Genero excluido com sucesso")
                    listarGenero();
                } catch (error) {
                    console.log(error);

                }
                // api.delete(`genero/${id.idGenero}`)
                Swal.fire({
                    title: "Deletado!",
                    text: "Deletado com sucesso.",
                    icon: "success"
                });
            }
        });

        //------------ALERTA--------------//

    }


    async function editarGenero(genero) {
        const { value: novoGenero } = await Swal.fire({
            title: "Modifique seu genero",
            input: "text",
            inputLabel: "Novo genero",
            inputValue: genero.nome,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo precisa estar preenchido!";
                }
            }
        });
        if (novoGenero) {
            try {
                api.put(`genero/${genero.idGenero}`, { nome: novoGenero });
                Swal.fire(`Genero modificado para: ${novoGenero}`);
            } catch (error) {
                console.log(error);

            }

        }
    }

    // Todo estado atualizado sera atualizado 
    // assim que a tela renderizar o metodo listargenero sera chamado  
    useEffect(() => {
        listarGenero();

    }, [listaGenero])


    // useEffect(() => {
    //     console.log(genero)
    // },[genero]);

    // useEffect(() => {
    //     deletarGenero();
    // }, [deletarGenero])

    // useEffect(() => {
    //     alertar("success", "lista modificada");
    //     //ao ser alterada sera atualizada
    // }, [])



    return (
        <>
            <Header />
            <main>
                <Cadastro
                    titulo="Cadastro de Gênero"
                    visibilidade="none"
                    placeholder="genero:"
                    //atribuindo a funçao
                    funcCadastro={cadastrarGenero}
                    valorInput={genero}
                    // ao mudar o valor do input
                    setValorInput={setGenero} />

                <Lista tituloLista="Lista de gêneros" visivel="none"
                    lista={listaGenero}
                    funcExcluir={excluirGenero}
                    funcEditar={editarGenero} />
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;