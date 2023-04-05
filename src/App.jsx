import React, { useState, useRef, useEffect } from 'react'
import Contato from './componentes/Contato'
import { v4 as uuid } from 'uuid'
import './App.css'

export default function App() {

  const [contato, setContato] = useState({ id: '', nome: '', telefone: '' })
  const [listaContatos, serListaContatos] = useState([])

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

    serListaContatos([...listaContatos, { ...contato, id: uuid() }])

    setContato({ nome: "", telefone: "" })

    inputNome.current.focus()

  }

  function enterAddContato(event) {
    if (event.code === 'Enter') {
      addContato()
    }
  }

  function limparStorage() {
    serListaContatos([])
  }

  function removerContato(id) {
    let novaLista = listaContatos.filter(contato => contato.id !== id)
    serListaContatos(novaLista)
  }

  useEffect(() => {
    if (localStorage.getItem('meus_contatos') !== null) {
      serListaContatos(JSON.parse(localStorage.getItem('meus_contatos')))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('meus_contatos', JSON.stringify(listaContatos))
  }, [listaContatos])

  return (
    <main>
      <section className='header'>
        <h1>Lista de Contatos</h1>
      </section>

      <section className='deshboar'>
        <div>
          <label className='label'>Nome:</label>
          <input type="text" ref={inputNome} onChange={novoNome} value={contato.nome} />
        </div>

        <div>
          <label>Telefone:</label>
          <input type="tel" ref={inputTelefone} onChange={novoTelefone} onKeyUp={enterAddContato} value={contato.telefone} />
        </div>

          <button onClick={addContato}>Adicionar</button>
          {/* <button onClick={limparStorage}>Limpar Lista</button> */}
      </section>

      <section className='list'>
        {listaContatos.map(contato => {
          return <Contato key={contato.id} id={contato.id} nome={contato.nome} telefone={contato.telefone} remover={removerContato} />
        })}
      </section>
    </main>
  )
}