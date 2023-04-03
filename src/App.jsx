import React, { useState, useRef } from 'react'
import Contato from './componentes/Contato'
import { v4 as uuid } from 'uuid'

export default function App() {

  const [contato, setContato] = useState({ nome: '', telefone: '' })
  const [listaContato, setListaContato] = useState([])

  const inputNome = useRef()
  const inputTelefone = useRef()

  function novoNome(event) {
    setContato({ ...contato, nome: event.target.value })
  }

  function novoTelefone(event) {
    setContato({ ...contato, telefone: event.target.value })
  }

  function addContato() {
    if (contato.nome === "" || contato.telefone === "") return

    let duplicado = listaContato.find((ct) => ct.nome === contato.nome && ct.telefone === contato.telefone)

    if (typeof duplicado !== 'undefined') {
      inputTelefone.current.focus()
      alert('Esse número de Telefone já existe')
      return
    }

    setListaContato([...listaContato, contato])

    setContato({ nome: "", telefone: "" })

    inputNome.current.focus()

  }

  return (
    <>
      <h1>Lista de Contatos</h1>
      <hr />
      <div>
        <label>Nome:</label><br />
        <input type="text" ref={inputNome} onChange={novoNome} value={contato.nome} />
      </div>

      <div>
        <label>Telefone:</label><br />
        <input type="tel" ref={inputTelefone} onChange={novoTelefone} value={contato.telefone} />
      </div>

      <button onClick={addContato}>Adicionar Contato</button>

      {listaContato.map(contato => {
        return <Contato key={uuid()} nome={contato.nome} telefone={contato.telefone} />
      })}
    </>
  )
}