import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  private http:Http;
  private router:Router;
  private filtro:string;
  private colunaOrdenada:string;
  private classificacao;
  private paginaAtual:number;
  private isLoaded:boolean;

  @Input() titulo:string;
  @Input() colunasTitulo:object[];
  @Input() data:any;
  @Input() totalResultados:number;
  @Input() atributosIgnorados:string[];

  @Output() doEdicao = new EventEmitter<number>();
  @Output() doExclusao = new EventEmitter<number>();

  constructor(http:Http,router:Router) { 

    this.http = http;    
    this.router = router;
    
  }

  ngOnInit() {

    if(this.paginaAtual == undefined || !this.paginaAtual){
      this.paginaAtual = 1;
    }

    this.isLoaded = true;
    this.colunaOrdenada = '';

  }

  filtar(){

    let registros:number = this.getNumeroRegistrosSelecionado();

    let registroFinal = this.paginaAtual * registros;
    let registroInicial = registroFinal - registros;        

    if(!this.data || this.isFiltroInvalido()){
        try {
            this.totalResultados = this.data.length;
            let registros = this.ordernarListaPorColuna(this.data);
            return registros.slice(registroInicial,registroFinal);
        } catch (error) {
            return this.data;
        }        
    }

    let datasFiltradas = this.data.filter((casodeuso, indice) => {

        let filter = this.filtro.toLowerCase();
        let isValid = false;

        (<any>Object).values(casodeuso).forEach(valor => {
            
            if(!isValid){
                if((typeof valor) == 'number'){
                    if(valor == filter){
                        isValid  = true;
                    }
                }else if((typeof valor) == 'string'){
                    if(valor.toLowerCase().indexOf(filter) >= 0){
                        isValid  = true;
                    }
                }
            }

        });

        return isValid;

    });
  
    datasFiltradas = this.ordernarListaPorColuna(datasFiltradas);
    this.totalResultados = datasFiltradas.length;        
    
    return datasFiltradas.slice(registroInicial,registroFinal);

  }

  alterarResultadosPorPagina(event){

    event.preventDefault();    
    this.filtar();

  }

  getNumeroRegistrosSelecionado(){        

    let select:any = document.querySelector('.selecao-registros');
    return select.options[select.selectedIndex].value;    

  }

  isFiltroInvalido(){

    return (this.filtro === undefined || this.filtro.trim() == '');

  }

  setColunaParaOrdenacao(event, coluna){
    
    event.preventDefault();

    if(this.colunaOrdenada == coluna && this.classificacao == 'asc') {

        this.classificacao = 'desc';

    }else if(this.colunaOrdenada == coluna && this.classificacao == 'desc'){

        this.classificacao = 'asc';

    }else{

        this.colunaOrdenada = coluna;
        this.classificacao = 'asc';
        
    }
    
    this.alteraIconeOrdenacaoCSS();
    this.filtar();

  }

  ordernarListaPorColuna(registros){

    if(this.colunaOrdenada!=''){

        if(this.classificacao == 'asc'){

            return registros.sort((a,b) =>{
                if (a[this.colunaOrdenada] > b[this.colunaOrdenada]) {
                    return 1;
                }else if (a[this.colunaOrdenada] < b[this.colunaOrdenada]) {
                    return -1;
                }else {
                    return 0;
                }            
            });

        }else if (this.classificacao == 'desc'){

            return registros.sort((a,b) =>{
                if (a[this.colunaOrdenada] < b[this.colunaOrdenada]) {
                    return 1;
                }else if (a[this.colunaOrdenada] > b[this.colunaOrdenada]) {
                    return -1;
                }else {
                    return 0;
                }            
            });

        }

    }else {

        return registros;

    }

  }

  alteraIconeOrdenacaoCSS(){
    
    let elementos:any = document.querySelectorAll('thead>tr>th>a>span');
    
    if(this.classificacao == 'asc')
        elementos.forEach(span => span.classList.replace('ti-angle-double-up','ti-angle-double-down'));    
    else if(this.classificacao == 'desc')
        elementos.forEach(span => span.classList.replace('ti-angle-double-down','ti-angle-double-up'));
    
  }
  
  alterarPagina(pagina):void {

    this.paginaAtual = pagina;
    this.filtar();

  }

  paginaPosterior():void {

    if(this.existePaginaPosterior())
        this.paginaAtual++;            
    else
        this.paginaAtual = this.totalPaginas();

    this.filtar();

  }

  paginaAnterior():void {

    if(this.existePaginaAnterior())
        this.paginaAtual--;
    else
        this.paginaAtual = 1;

    this.filtar();

  }

  totalPaginas(): number {

    return Math.ceil(this.totalResultados / this.getNumeroRegistrosSelecionado()) || 0;

  }

  existePaginaPosterior(): boolean{

    return ((this.paginaAtual + 1) <= this.totalPaginas());

  }

  existePaginaAnterior(): boolean{

    return ((this.paginaAtual - 1) > 0);

  }

  listagemEdicao(event){

    this.doEdicao.emit(event);

  }

  listagemExclusao(event){

    this.doExclusao.emit(event);    
    this.filtar();

  }

  getArrayOfAtributos(registro):string[]{

    let atributos = [];

    if(registro){
        (<any>Object).entries(registro).forEach(atributo => {
            //se não estiver na lista, eu incluo esse registro. [Posição 0 = key / Posição 1 = value]
            if(this.atributosIgnorados.indexOf(atributo[0]) < 0)
                atributos.push(atributo[1]);
        });
    }        

    return atributos;

  }

}
