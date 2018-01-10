
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ListagemInterface } from "app/listagem/listagem.interface";
import { Http, Headers, Response } from "@angular/http";
import { Router } from "@angular/router";

declare var $:any;

@Component({
    selector: 'instituicao',
    templateUrl: './instituicao.component.html'
})
export class InstituicaoComponent implements OnInit, OnDestroy, ListagemInterface{

    private http:Http;
    private router:Router;
    //LISTAGEM
    private data:any;    
    private totalResultados:number;    
    private titulo:string;
    private colunas:object[];
    private msgSucesso:boolean = false;
    private msgFalha:boolean = false;

    constructor(http:Http,router:Router) {         
        this.http = http;    
        this.router = router;        
    }

    ngOnInit(): void {

        this.carregarRegistros();           
        this.titulo = "Caso de Uso";
        this.colunas =  [    
                            {"descricao":"#","ordenacao":"id"},
                            {"descricao":"Título","ordenacao":"titulo"},
                            {"descricao":"Autor","ordenacao":"autor"},
                            {"descricao":"Dt. Criação","ordenacao":"dtcriacao"},
                            {"descricao":"Dt. Alteração","ordenacao":"dtalteracao"}, 
                            {"descricao":"Status","ordenacao":"status"}
                        ];    
    }

    ngOnDestroy():void {

    }

    carregarRegistros():void{
        
        let json = {};
        let url = 'http://localhost:8080/angular/casosdeuso';
        let headers = new Headers();
    
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', localStorage.getItem('token'));             
        
        this.http.post(url, json, { headers: headers })
    
            .subscribe((res:Response) => {

                this.data = res.json();   
                this.totalResultados = this.data.length;

            }, erro => {

                localStorage.setItem('token',null);
                this.router.navigate(['/dashboard']);

            }
    
        );    
    
    }

    excluirRegistro(id):void{
        
        let indice:number;

        this.data.forEach((casouso, i) => {
            if(casouso.id == id){
                indice = i;
            }
        });

        this.data.splice(indice,1);

        let msg = 'Registro excluído com sucesso.';
        this.showNotification('top','center','success',msg);

    }

    editarRegistro(id):void{        

        this.router.navigate(['/dashboard'],{queryParams: {id:id}})

    }

    showNotification(from, align, type, msg){

        $.notify({
            icon: "ti-check",
            message: 'Registro excluído com sucesso.'
        },{
            type: type,
            timer: 1000,
            placement: {
                from: from,
                align: align
            }
        });
        
    }

}