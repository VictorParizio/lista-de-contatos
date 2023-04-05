import React from "react";

export default function Contato(props){
    return(
        <div>
            <p>{props.nome}</p>
            <p>{props.telefone}</p>
            <span onClick={()=>{props.remover(props.id)}}>X</span>
        </div>
    )
}