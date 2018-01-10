import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalListagemComponent } from './modal-listagem.component';

describe('ModalListagemComponent', () => {
  let component: ModalListagemComponent;
  let fixture: ComponentFixture<ModalListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
