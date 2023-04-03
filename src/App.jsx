import React, { useState } from 'react'

export default function App() {

  const [contato, setContato] = useState({nome: '', telefone:''})
  const [listaContato, setListaContato] = useState([])

  function novoNome(event){
    setContato({...contato, nome: event.target.value})
  }

  function novoTelefone(event){
    setContato({...contato, telefone: event.target.value})
  }

  function addContato(){
    setListaContato([...listaContato, contato])
  }
 
  return (
    <>
      <h1>Lista de Contatos</h1>
      <hr />
      <div>
        <label>Nome:</label><br />
        <input type="text" onChange={novoNome} value = {contato.nome} />
      </div>
      <div>
        <label>Telefone:</label><br />
        <input type="tel" onChange={novoTelefone} value = {contato.telefone} />
      </div>
      <button onClick={addContato}>Adicionar Contato</button>
    </>
  )
}