import "./Lista.css";

import Editar from "../../assets/img/pen-to-square-solid.svg";
import Excluir from "../../assets/img/trash-can-regular.svg";


const Lista = (props) => {
    return (
        <section className="layout_grid listagem">
            <h1>{props.tituloLista}</h1>
            <hr />
            <div className="tabela">
                <table>
                    {/* cabeçalho da tabela */}
                    <thead>
                        {/* tr => table row */}
                        <tr className="table_cabecalho">
                            {/* th => table head */}
                            <th>Nome</th>
                            <th style={{ display: props.visivel }}>Gênero</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    {/* tbody => corpo da tabela */}
                    <tbody>
                        {/*verificar se a lista esta vindo vazia*/}
                        {props.lista && props.lista.length > 0 ? (
                            // vamos mapear os itens da lista
                            props.lista.map((item, index) => (

                                <tr className="item_lista" key={item.idGenero}>
                                    <td data-cell="Nome">
                                        {item.nome}
                                    </td>
                                    <td data-cell="Gênero" style={{ display: props.visivel }}>Ação</td>
                                    <td data-cell="Editar"><img src={Editar} alt="Caneta" /></td>

                                    <button onClick={()=>(props.funcExcluir(item))} className="botaoExcluir">

                                        <td data-cell="Excluir" ><img src={Excluir} alt="Lixeira" /></td>
                                    </button>

                                </tr>

                            ))
                        ) :
                            (
                                <p>Nenhum genero foi encontrado.</p>
                            )

                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Lista;