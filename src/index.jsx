import React, { useState, useEffect } from 'react';
import './style.css';

function App() {
  // Carrega os dados já salvos no localStorage do navegador, se não houver nenhum dado ele usa uma lista vazia.
  const [gastos, setGastos] = useState(() => {
    const savedGastos = localStorage.getItem('gastos');
    return savedGastos ? JSON.parse(savedGastos) : [];
  });

  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');

  // Efeito para salvar os gastos no localStorage sempre que eles mudarem
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

  // INSERIR GASTO
  const adicionarGasto = (e) => {
    e.preventDefault();

    const dataHoje = new Date().toISOString().split('T')[0]; // Obtém a data de hoje no formato YYYY-MM-DD

    if (nome && data && valor) {
      if (data > dataHoje) { // Verifica se a data é posterior à data de hoje
        alert('Não é permitido inserir gastos com data futura.');
        return;
      }
      const novoGasto = { nome, data, valor: parseFloat(valor) };
      
      setGastos([...gastos, novoGasto]);
      setNome('');
      setData('');
      setValor('');
    }
  };

  // Deletar Gasto
  const removerGasto = (index) => {
    const novosGastos = gastos.filter((_, i) => i !== index);
    setGastos(novosGastos);
  };

  // Total de Gastos
  const totalGasto = gastos.reduce((total, gasto) => total + gasto.valor, 0);

  return (
    <div className="App">
      <h1>Controle de Gastos</h1>

      <form onSubmit={adicionarGasto}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Moto-taxí"
          />
        </div>
        <div>
          <label>Data:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <div>
          <label>Valor:</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Ex: 11,52"
          />
        </div>
        <button type="submit">Inserir</button>
      </form>

      <h2>Todos os Gastos</h2>
      <ul>
        {gastos.map((gasto, index) => (
          <li key={index}>
            {gasto.nome} - {gasto.data} - R$ {gasto.valor.toFixed(2)}
            <button onClick={() => removerGasto(index)}>Deletar</button>
          </li>
        ))}
      </ul>

      <h3>Total Gastos: R$ {totalGasto.toFixed(2)}</h3>
    </div>
  );
}

export default App;
