import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompraFormPage } from './compra-form.page';

describe('CompraFormPage', () => {
  let component: CompraFormPage;
  let fixture: ComponentFixture<CompraFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompraFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
