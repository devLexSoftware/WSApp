import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompraInfoPage } from './compra-info.page';

describe('CompraInfoPage', () => {
  let component: CompraInfoPage;
  let fixture: ComponentFixture<CompraInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompraInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
