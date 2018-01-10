import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'botao-listagem-editar',
  templateUrl: './botao-listagem-editar.component.html',
  styleUrls: ['./botao-listagem-editar.component.css']
})
export class BotaoListagemEditarComponent implements OnInit {

  @Input() id:number;
  @Output() goEdicao = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  onEdicao():void{
    this.goEdicao.emit(this.id);
  }
  
}
