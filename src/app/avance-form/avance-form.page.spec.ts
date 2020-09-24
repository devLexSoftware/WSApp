import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvanceFormPage } from './avance-form.page';

describe('AvanceFormPage', () => {
  let component: AvanceFormPage;
  let fixture: ComponentFixture<AvanceFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvanceFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvanceFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
