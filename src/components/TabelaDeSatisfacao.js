import React, { Component } from 'react';
import { sort, paginacao } from '../util'

class TabelaDeSatisfacao extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pagina: 1,
      coluna: '',
      ordem: undefined,
      lojaId: 0
    }
  }

  onClickOrdenacao(coluna) {
    let ordem = 'asc';
    if (this.state.coluna === coluna && this.state.ordem === 'asc') {
      ordem = 'desc';
    }
    this.setState({ coluna: coluna, ordem: ordem });
  }

  onChangePage(pagina) {
    this.setState({ pagina: pagina });
  }

  render() {
    const { coluna, ordem, pagina } = this.state;
    let avaliacoes = sort(paginacao(pagina, this.props.avaliacoes), coluna, ordem);
    return (<div style={{ overflowX: "auto" }}>
      <table className="tabela-satisfacao">
        <thead>
          <tr>
            <Coluna titulo="Nome da Loja" nome={'loja'} ativo={coluna} ordem={ordem} onClick={(c) => { this.onClickOrdenacao(c) }} />
            <Coluna titulo="Satisfacao" nome={'satisfacao'} ativo={coluna} ordem={ordem} onClick={(c) => { this.onClickOrdenacao(c) }} />
            <Coluna titulo="Avaliações" nome={'avaliacao'} ativo={coluna} ordem={ordem} onClick={(c) => { this.onClickOrdenacao(c) }} />
            <Coluna titulo="Excelente" nome={'excelente'} ativo={coluna} ordem={ordem} onClick={(c) => { this.onClickOrdenacao(c) }} />
            <Coluna titulo="Muito Bom" nome={'muitobom'} ativo={coluna} ordem={ordem} onClick={(c) => { this.onClickOrdenacao(c) }} />
            <Coluna titulo="Razoável" nome={'razoavel'} ativo={coluna} ordem={ordem} onClick={(c) => { this.onClickOrdenacao(c) }} />
            <Coluna titulo="Ruim" nome={'ruim'} ativo={coluna} ordem={ordem} onClick={(c) => { this.onClickOrdenacao(c) }} />
            <Coluna titulo="Horrível" nome={'horrivel'} ativo={coluna} ordem={ordem} onClick={(c) => { this.onClickOrdenacao(c) }} />
            <th />
          </tr>
        </thead>
        <tbody>
          {
            avaliacoes.map((a, i) => {
              return <Avaliacao key={a.lojaId} avaliacao={a} index={i} selecionada={a.lojaId === this.state.lojaId} onClick={(lojaId) => { this.setState({ lojaId: lojaId }) }} />
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <td>
              <Paginacao paginaAtual={this.state.pagina} irParaPagina={(pagina) => { this.onChangePage(pagina) }} qtdPaginas={Math.ceil(this.props.avaliacoes.length / 10)} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>);
  }
}

const Coluna = ({ titulo, nome, ativo, ordem, onClick }) => {
  let icon = 'arrow_drop_down';
  if (ativo === nome && ordem === 'desc') icon = 'arrow_drop_up';
  return (
    <th onClick={() => { onClick(nome) }}>
      <div className="filtro">
        <span>{titulo}</span>
        <i className="material-icons">{icon}</i>
      </div>
    </th>
  );
}

const Paginacao = ({ paginaAtual, qtdPaginas, irParaPagina }) => {
  let paginas = [];
  for (let i = 0; i < qtdPaginas; i++) paginas.push(<button key={"change-page-" + i} className={"change-page " + (i + 1 === paginaAtual ? "pagina-atual" : "")} onClick={() => { irParaPagina(i + 1) }}>{i + 1}</button>);
  return (
    <div className="paginacao">
      <button disabled={paginaAtual === 1} className="change-page" onClick={() => { irParaPagina(1) }}>Primeira</button>
      {paginas}
      <button disabled={paginaAtual === qtdPaginas} className="change-page" onClick={() => { irParaPagina(qtdPaginas) }}>Última</button>
    </div>
  );
}

const Avaliacao = ({ avaliacao, index, selecionada, onClick }) => {
  return (
    <tr key={avaliacao.loja} className={selecionada ? "selecionada" : ''} onClick={() => { onClick(avaliacao.lojaId) }}>
      <td align="left">
        <span className="loja-index">{index + 1}</span>
        <span className="loja">{avaliacao.loja}</span>
      </td>
      <td align="left" width={30}>{(avaliacao.satisfacao * 100) + "%"}</td>
      <td align="left" width={30}>{avaliacao.totalAvaliacoes}</td>
      <td align="left" width={30}>{avaliacao.excelente}</td>
      <td align="left" width={100}>{avaliacao.muitobom}</td>
      <td align="left" width={30}>{avaliacao.razoavel}</td>
      <td align="left" width={30}>{avaliacao.ruim}</td>
      <td align="left" width={30}>{avaliacao.horrivel}</td>
      <td align="left" width={10}><button className="btn-add"><i className="material-icons">add</i></button></td>
    </tr>
  );
}

export default TabelaDeSatisfacao;
