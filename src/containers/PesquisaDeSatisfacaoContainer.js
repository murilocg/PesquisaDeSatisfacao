import React, { Component } from 'react';
import { getAvaliacoes } from '../api'
import PesquisaDeSatisfacao from '../components/PesquisaDeSatisfacao';
import '../css/pesquisa-de-satisfacao.scss';

class PesquisaDeSatisfacaoContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            global: {
                satisfacao: 0,
                totalAvaliacoes: 0,
                excelente: 0,
                muitobom: 0,
                razoavel: 0,
                ruim: 0,
                horrivel: 0,
            },
            avaliacoes: []
        }
    }

    componentDidMount() {
        getAvaliacoes((res) => this.setState({ global: res.global, avaliacoes: res.avaliacoes }));
    }

    render() {
        return <PesquisaDeSatisfacao avaliacoes={this.state.avaliacoes} global={this.state.global} />;
    }
}

export default PesquisaDeSatisfacaoContainer;
