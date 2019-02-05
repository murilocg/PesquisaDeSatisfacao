import React, { Component } from 'react';
import IndiceContainer from './IndiceContainer';
import PesquisaLoja from './PesquisaLoja';
import TabelaDeSatisfacao from './TabelaDeSatisfacao';
import { Tab, Tabs } from '@material-ui/core';

class PesquisaDeSatisfacao extends Component {

  constructor(props) {
    super(props);
    this.state = { filter: '' }
  }

  render() {
    const avaliacoes = filter(this.state.filter, this.props.avaliacoes);
    return (
      <div className="pesquisa-de-satisfacao">
        <Tabs>
          <Tab className="tab" component="a" label="Ponto de Venda"></Tab>
        </Tabs >
        <h3>Consolidado das Lojas</h3>
        <IndiceContainer global={this.props.global} />
        <h3>Lojas</h3>
        <PesquisaLoja onSearch={(v) => this.setState({ filter: v })} />
        <TabelaDeSatisfacao avaliacoes={avaliacoes} />
      </div >);
  }
}


function filter(v, arr) {
  if (v === '') return arr;
  v = v.toLowerCase();
  const avaliacoes = arr.filter((avaliacao) => avaliacao.loja.toLowerCase().includes(v));
  if (avaliacoes.length === 0) return [];
  if (!Array.isArray(avaliacoes)) return [avaliacoes];
  return avaliacoes;
}

export default PesquisaDeSatisfacao;
