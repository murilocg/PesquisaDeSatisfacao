import React, { Component } from 'react';

class IndiceContainer extends Component {

    render() {
        const { satisfacao, totalAvaliacoes, excelente, muitobom, razoavel, ruim, horrivel } = this.props.global;
        return (
            <div className="indice-container">
                <div className="indice">
                    <div className="indice-titulo results">
                        <span>Satisfação</span>
                        <i className="material-icons">help</i>
                    </div>
                    <div className="indice-results">{(satisfacao * 100) + "%"}</div>
                </div>
                <div className="indice">
                    <div className="indice-titulo results">
                        <span>Avaliações</span>
                        <i className="material-icons">help</i>
                    </div>
                    <div className="indice-results">{totalAvaliacoes}</div>
                </div>
                <IndiceAvaliacao titulo="Excelente" value={(excelente * 100) + "%"} icon={"excelente.png"} />
                <IndiceAvaliacao titulo="Muito Bom" value={(muitobom * 100) + "%"} icon={"muitobom.png"} />
                <IndiceAvaliacao titulo="Razoável" value={(razoavel * 100) + "%"} icon={"razoavel.png"} />
                <IndiceAvaliacao titulo="Ruim" value={(ruim * 100) + "%"} icon={"ruim.png"} />
                <IndiceAvaliacao titulo="Horrível" value={(horrivel * 100) + "%"} icon={"horrivel.png"} />
            </div>);
    }
}

class IndiceAvaliacao extends Component {

    render() {
        return (
            <div className="indice">
                <div className="indice-titulo">{this.props.titulo}</div>
                <div className="indice-value">
                    <div>
                        <img alt="" src={`/imgs/${this.props.icon}`} />
                    </div>
                    <div>
                        <span>{this.props.value}</span>
                    </div>
                </div>
            </div>);
    }
}


export default IndiceContainer;
