import React, { useState } from 'react';

function CotacaoForm() {
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatarData = (dateStr) => dateStr.replaceAll('-', '');

  const buscarCotacao = async (e) => {
    e.preventDefault();
    if (!dataInicial || !dataFinal) return;

    const url = `https://economia.awesomeapi.com.br/json/daily/USD-BRL/365?start_date=${formatarData(dataInicial)}&end_date=${formatarData(dataFinal)}`;

    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setResultados(data.reverse());
      setError('');
    } catch (err) {
      setError('Erro ao buscar dados.');
      setResultados([]);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: '550px',
      margin: '60px auto',
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '12px',
      textAlign: 'center',
      background: '#e0f0ff'
    },

    titulo: {
      marginBottom: '15px',
      fontWeight: 'bold'
    },

    campo: {
      marginBottom: '20px',
      textAlign: 'left'
    },

    data: {
      display: 'block',
      marginBottom: '6px',
      color: '#005f99',
      fontWeight: 'bold'
    },


    input: {
      width: '100%',
      padding: '6px',
      border: '1px solid #007acc',
      borderRadius: '6px',
      fontSize: '14px'
    },

    buscar: {
      backgroundColor: '#007acc',
      color: 'white',
      padding: '10px 24px',
      fontSize: '16px',
      borderRadius: '12px',
      cursor: 'pointer'
    },
   
    resultado: {
      marginTop: '30px',
      textAlign: 'left',
      color: '#333'
    },
    
    erro: {
      color: 'red',
      marginTop: '20px'
    },

    buscando: {
      color: '#333',
      marginTop: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>Buscar Cotação USD/BRL</h1>

      <form onSubmit={buscarCotacao}>
        <div style={styles.campo}>
          <label style={styles.data}>Data Inicial:</label>
          <input
            type="date"
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.campo}>
          <label style={styles.data}>Data Final:</label>
          <input
            type="date"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.buscar}>Buscar</button>
      </form>

      {loading && <p style={styles.buscando}>Buscando...</p>}
      {error && <p style={styles.erro}>{error}</p>}

      {resultados.length > 0 && (
        <div style={styles.resultado}>
          <h2 style={styles.titulo}>Resultados:</h2>
          {resultados.map((item) => (
             <p key={item.timestamp}>
             Data: {new Date(item.timestamp * 1000).toLocaleDateString()} - Valor: R$ {parseFloat(item.bid).toFixed(4)}
           </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default CotacaoForm;
