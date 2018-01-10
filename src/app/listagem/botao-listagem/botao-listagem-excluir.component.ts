import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'botao-listagem-excluir',
  templateUrl: './botao-listagem-excluir.component.html',
  styleUrls: ['./botao-listagem-excluir.component.css']
})
export class BotaoListagemExcluirComponent implements OnInit {

  private showDialog:boolean = false;

  @Input() id:number;

  @Output() goExclusao = new EventEmitter<number>();
    
  constructor() { 

  }

  ngOnInit() { 

  }
    
  onExclusao(event){

    event.preventDefault();
        
    this.showDialog = !this.showDialog;
    this.goExclusao.emit(this.id);
    
  }

}
