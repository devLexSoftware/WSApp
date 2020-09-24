import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ObraFormPage } from './obra-form.page';

describe('ObraFormPage', () => {
  let component: ObraFormPage;
  let fixture: ComponentFixture<ObraFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObraFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ObraFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
