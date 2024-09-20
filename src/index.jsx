import React, { useState, useEffect } from 'react';
import './style.css';
import Toast from './Toast/Toast';

function App() {
  const [gastos, setGastos] = useState(() => {
    const savedGastos = localStorage.getItem('gastos');
    return savedGastos ? JSON.parse(savedGastos) : [];
  });
  
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');
  const [toast, setToast] = useState({ mensagem: '', tipo: '' });
  const totalGasto = gastos.reduce((total, gasto) => total + gasto.valor, 0);
  const [erros, setErros] = useState({ nome: false, data: false, valor: false });
  const dataHoje = new Date().toISOString().split('T')[0];

  const mostrarToast = () => {
    setTimeout(() => {
        setToast({ mensagem: '', tipo: '' });
    }, 3000);
  };

  const formatarValor = (valor) => {
    return valor.toFixed(2).replace('.', ',');
  };

  const formatarData = (data) => {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

  // INSERIR GASTO
  const adicionarGasto = (e) => {
    e.preventDefault();

    let temErro = false;
    setToast({ mensagem: '', tipo: '' });
    setErros({ nome: false, data: false, valor: false });

    if (!nome) {
        setErros((prev) => ({ ...prev, nome: true }));
        temErro = true;
    }

    if (!data) {
        setErros((prev) => ({ ...prev, data: true }));
        temErro = true;
    }

    if (!valor) {
        setErros((prev) => ({ ...prev, valor: true }));
        temErro = true;
    }

    if (temErro) {
        setToast({ mensagem: 'Preencha todos os campos!', tipo: 'error' });
        mostrarToast();
        return;
    }

    const novoGasto = { nome, data, valor: parseFloat(valor) };
    setGastos([...gastos, novoGasto]);
    setNome('');
    setData('');
    setValor('');
    setToast({ mensagem: 'Gasto adicionado com sucesso!', tipo: 'success' });
    mostrarToast();
  };

  // DELETAR GASTO
  const removerGasto = (index) => {
      const novosGastos = gastos.filter((_, i) => i !== index);
      setGastos(novosGastos);
      setToast({ mensagem: 'Gasto removido com sucesso!', tipo: 'success' });
      mostrarToast();
  };

  return (
    <div className="App">

        {toast.mensagem && <Toast mensagem={toast.mensagem} onClose={() => setToast({ mensagem: '', tipo: '' })} tipo={toast.tipo} />}
        
        <h1>Gerenciador de Gastos</h1>

        <form onSubmit={adicionarGasto}>
          <div>
              <label className={erros.nome ? 'error' : ''}>Nome:</label>
              {erros.nome && <span className="error">*</span>}
              <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Moto-taxí"
              />
          </div>
          <div>
              <label className={erros.data ? 'error' : ''}>Data:</label>
              {erros.data && <span className="error">*</span>}
              <input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  max={dataHoje}
              />
          </div>
          <div>
              <label className={erros.valor ? 'error' : ''}>Valor:</label>
              {erros.valor && <span className="error">*</span>}
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
