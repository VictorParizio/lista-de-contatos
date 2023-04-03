import React, { useState, useRef, useEffect } from 'react'
import Contato from './componentes/Contato'
import { v4 as uuid } from 'uuid'

export default function App() {

  const [contato, setContato] = useState({ nome: '', telefone: '' })
  const [listaContatos, setlistaContatos] = useState([])

  const inputNome = useRef()
  const inputTelefone = useRef()

  function novoNome(event) {
    setContato({ ...contato, nome: event.target.value })
  }

  function novoTelefone(event) {
    setContato({ ...contato, telefone: event.target.value })
  }

  function addContato() {
    if (contato.nome === "" || contato.telefone === "") {
      alert('"Nome" e "Telefone" são campos obrigatórios')
      return  
    }

    let duplicado = listaContatos.find((ct) => ct.nome === contato.nome && ct.telefone === contato.telefone)

    if (typeof duplicado !== 'undefined') {
      inputTelefone.current.focus()
      alert('Esse número de Telefone já existe')
      return
    }

    setlistaContatos([...listaContatos, contato])

    setContato({ nome: "", telefone: "" })

    inputNome.current.focus()

  }

  function enterAddContato(event) {
    if (event.code === 'Enter') {
      addContato()
    }
  }

  useEffect(() => {
    if (localStorage.getItem('meus_contatos') !== null) {
      setlistaContatos(JSON.parse(localStorage.getItem('meus_contatos')))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('meus_contatos', JSON.stringify(listaContatos))
  }, [listaContatos])

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
        <input type="tel" ref={inputTelefone} onChange={novoTelefone} onKeyUp={enterAddContato} value={contato.telefone} />
      </div>

      <button onClick={addContato}>Adicionar Contato</button>

      {listaContatos.map(contato => {
        return <Contato key={uuid()} nome={contato.nome} telefone={contato.telefone} />
      })}
    </>
  )
}