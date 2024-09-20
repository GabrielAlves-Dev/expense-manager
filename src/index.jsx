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

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

  // INSERIR GASTO
  const adicionarGasto = (e) => {
    e.preventDefault();

    const dataHoje = new Date().toISOString().split('T')[0]; // Data de hoje

    if (!nome || !data || !valor) {
      alert('ERROR: Preencha todos os campos!');
      return;
    }

    if (data > dataHoje) { // Verifica se a data
      alert('ERROR: Não é permitido inserir gastos com uma data futura.');
      return;
    }
    const novoGasto = { nome, data, valor: parseFloat(valor) };
    
    setGastos([...gastos, novoGasto]);
    setNome('');
    setData('');
    setValor('');
  };

  // DELETAR GASTO
  const removerGasto = (index) => {
    const novosGastos = gastos.filter((_, i) => i !== index);
    setGastos(novosGastos);
  };

  // TODOS OS GASTOS
  const totalGasto = gastos.reduce((total, gasto) => total + gasto.valor, 0);

  // Função para formatar a data no padrão brasileiro (DD/MM/YYYY)
  const formatarData = (data) => {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`; // Retorna a data no formato DD/MM/YYYY
  };

  // Função para formatar o valor para o padrão brasileiro (R$ X,XX)
  const formatarValor = (valor) => {
    return valor.toFixed(2).replace('.', ','); // Converte para string e substitui o ponto pela vírgula
  };

  return (
    <div className="App">
      <h1>Gerenciador de Gastos</h1>

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
        {gastos.length === 0 ? (
          <li>Nenhum gasto inserido.</li>
        ) : (
          gastos.map((gasto, index) => (
            <li key={index}>
              {gasto.nome} - {formatarData(gasto.data)} - R$ {formatarValor(gasto.valor)}
              <button onClick={() => removerGasto(index)}>Deletar</button>
            </li>
          ))
        )}
      </ul>

      <h3>Total Gastos: R$ {formatarValor(totalGasto)}</h3>
    </div>
  );
}

export default App;
