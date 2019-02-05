import React, { Component } from 'react';
import $ from 'jquery';

class PesquisaLoja extends Component {

  render() {
    return (
      <div className="pesquisa-loja-container">
        <input placeholder="Buscar Loja" id="pesquisa-loja" />
        <button type="button"  onClick={() => { this.props.onSearch($("#pesquisa-loja").val()) }} >
          <i className="material-icons">search</i>
        </button>
      </div>
    );
  }
}

export default PesquisaLoja;
