import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EquipoFormPage } from './equipo-form.page';

describe('EquipoFormPage', () => {
  let component: EquipoFormPage;
  let fixture: ComponentFixture<EquipoFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipoFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EquipoFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
