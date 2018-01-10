import { Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, state, style, animate, transition } from '@angular/core';

@Component({
  selector: 'modal-listagem',
  templateUrl: './modal-listagem.component.html',
  styleUrls: ['./modal-listagem.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]  
})
export class ModalListagemComponent implements OnInit {

  /** 
   * 
   * @author Cory Parisi
   * @see https://coryrylan.com/blog/build-a-angular-modal-dialog-with-angular-animate
   * 
  **/

  @Input() closable = false;
  @Input() visible: boolean;

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onExluir


  //private modal:any = new tingle.modal({});

  constructor() { 
    this.visible = false;
  }

  ngOnInit() {

  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  
}
