import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PedidosObraPage } from './pedidos-obra.page';

describe('PedidosObraPage', () => {
  let component: PedidosObraPage;
  let fixture: ComponentFixture<PedidosObraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosObraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PedidosObraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
