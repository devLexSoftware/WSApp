import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedidoFormPage } from './pedido-form.page';

describe('PedidoFormPage', () => {
  let component: PedidoFormPage;
  let fixture: ComponentFixture<PedidoFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidoFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
