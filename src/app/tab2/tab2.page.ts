import { Component } from '@angular/core';
import { evaluate } from 'mathjs'
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public calculo = '';
  public resultado: string;

  private ponto = false; // quando a variavé não for utilizada no html ela pode ser privada.
  private operacoes = ['+', '-', '*', '/'];

  constructor(public alertController: AlertController) {}

  public adicionarNumero(valor: string) {
    if(this.resultado){ //não é necessário uma condição pois basta ela estar preenchida para ser verdadeira.
      this.apagarTudo();

    }
    this.calculo = this.calculo + valor;
  }

  public adicionarPonto() {
    if (this.ponto) {
      return //se já tiver um ponto não acontece nada pois será retornado vazio.
    }
    // se for falso o resto será executado.
    this.calculo += ".";
    this.ponto = true;
  }

  public adicionarOperacao(operador: string) {
    if(this.resultado){
      this.calculo = this.resultado.toString(); // Move o resultado para cima. //toString: converte a variável
      this.resultado = null; // limpa o resultdo.
    }

    const ultimo = this.calculo.slice(-1);
    if(this.operacoes.indexOf(ultimo) > -1){ //idenOf: procura o que vai ir dentro do parâmetro(o último caracter é um dos que tá dentro de operacoes? se sim, ele será excluido)
      return;
    }

    this.calculo += operador;
    this.ponto = false; // depois de add um sinal é possível add um um ponto nos números seguintes
  }

  // zerando a calculadora.
  public apagarTudo() {
    this.calculo = ''; // deixa a variavél vazia já que ela não pode ser nula.
    this.resultado = null; // anula a variavél limpando tudo. 
    this.ponto = false; //libera a calculadora para a utilizar o ponto
  }

  public apagarUltimo() {
    // é necessário realizar um teste para confirmar que o último carácter é um ponto ou o mesmo poderá ser utilizado várias vezes.
    const ultimo = this.calculo.slice(-1);// verifica se o último carácter é um ponto, guarda e faz um teste.
    if(ultimo == '.') {
      this.ponto = false;
    }
    this.calculo = this.calculo.slice(0, -1); /*slice: os números representam o inicio, de onde ele sairá, e o final, que será cortado. */
  }

  // executando os calculos
  public calcularResultado() {
    try{
      this.resultado = evaluate(this.calculo); //tenta essa execução se não der ele executa o catch
    }catch (e) {
      this.resultado = '';
      this.presentAlert('Erro!!!', 'Cálculo inválido, verifique!'); //Mensagem de erro

    }
  }

  async presentAlert(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }
}
