import React, { Component } from "react";
import Card from "../components/Card";
import { Col12, Col6 } from "../components/Grid/Col";
import FormGroup from "../components/FormGroup";
import Row from "../components/Grid/Row";
import { PainelCentral } from "../components/PainelCentral";
import { withRouter } from 'react-router-dom';
import UsuarioService from "../app/service/usuarioService";

class Login extends Component {

	constructor() {
		super();
		this.state = {
			usuario: {
				email: '',
				senha: ''
			},
			mensagemErro: null,
		}
		this.service = new UsuarioService();
	}

	onChangeEmail = (event) => {
		this.setState({
			usuario: {
				...this.state.usuario,
				email: event.target.value
			}
		});
	}

	onChangeSenha = (event) => {
		this.setState({
			usuario: {
				...this.state.usuario,
				senha: event.target.value
			}
		});
	}

	entrar = () => {
		this.service.autenticar(this.state.usuario
		).then(response => {

			localStorage.setItem('_usuario_logado', JSON.stringify(response.data));
			this.props.history.push('/home');
		}).catch(erro => {
			this.setState({
				mensagemErro: erro.response.data
			})
		});
		/*this.service.autenticar({
			email: this.state.email,
			senha: this.state.senha
		}).then( response => {
			this.context.iniciarSessao(response.data)
			this.props.history.push('/home')
		}).catch( erro => {
			mensagemErro(erro.response.data)
		})*/
	}

	prepareCadastrar = () => {
		this.props.history.push('/cadastro')
	}

	render() {
		return (
			<PainelCentral>
				<Row>
					<Col6>
						<div className="bs-docs-section">
							<Card title="Login">
								<Row>
									<Col6>
										{this.state.mensagemErro &&
											<div className="alert alert-dismissible alert-danger">
												<button type="button" className="btn-close" data-bs-dismiss="alert"></button>
												<strong>{this.state.mensagemErro}</strong>
											</div>}
									</Col6>
								</Row>
								<Row>
									<Col12>
										<div className="bs-component">
											<fieldset>
												<FormGroup label="Email: *" htmlFor="exampleInputEmail1">
													<input type="email"
														value={this.state.usuario.email}
														onChange={this.onChangeEmail}
														className="form-control"
														id="exampleInputEmail1"
														aria-describedby="emailHelp"
														placeholder="Digite o Email" />
												</FormGroup>
												<FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
													<input type="password"
														value={this.state.usuario.senha}
														onChange={this.onChangeSenha}
														className="form-control"
														id="exampleInputPassword1"
														placeholder="Password" />
												</FormGroup>
												<button
													onClick={this.entrar}
													className="btn btn-success">
													<i className="pi pi-sign-in">
														Entrar
													</i>
												</button>
												<button
													onClick={this.prepareCadastrar}
													className="btn btn-danger">
													<i className="pi pi-plus">
														Cadastrar
													</i>
												</button>
											</fieldset>
										</div>
									</Col12>
								</Row>
							</Card>
						</div>
					</Col6>
				</Row>
			</PainelCentral>
		)

	}
}

export default withRouter(Login)