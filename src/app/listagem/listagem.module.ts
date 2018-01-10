import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { BotaoListagemModule } from './botao-listagem/botao-listagem.module';
import { PaginacaoComponent } from './paginacao/paginacao.component';
import { ListagemComponent } from './listagem.component';

@NgModule({
    declarations: [
        ListagemComponent,
        PaginacaoComponent
    ],imports:[
        BotaoListagemModule,
        FormsModule,
        CommonModule
    ],exports:[
        ListagemComponent,
        PaginacaoComponent
    ]
})
export class ListagemModule{

}