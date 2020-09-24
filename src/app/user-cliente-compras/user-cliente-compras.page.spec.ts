import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserClienteComprasPage } from './user-cliente-compras.page';

describe('UserClienteComprasPage', () => {
  let component: UserClienteComprasPage;
  let fixture: ComponentFixture<UserClienteComprasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserClienteComprasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserClienteComprasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
