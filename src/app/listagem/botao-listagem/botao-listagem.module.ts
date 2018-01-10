import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BotaoListagemEditarComponent } from './botao-listagem-editar.component';
import { ModalListagemComponent } from './../modal-listagem/modal-listagem.component';
import { BotaoListagemExcluirComponent } from './botao-listagem-excluir.component';


@NgModule({
    declarations: [
        BotaoListagemEditarComponent,
        BotaoListagemExcluirComponent,
        ModalListagemComponent
    ],
    exports: [
        BotaoListagemEditarComponent,
        BotaoListagemExcluirComponent,
        ModalListagemComponent
    ],
    imports:[
        RouterModule,
        FormsModule,
        BrowserModule
    ]
})
export class BotaoListagemModule{  }