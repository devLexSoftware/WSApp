import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ObraInfoPage } from './obra-info.page';

describe('ObraInfoPage', () => {
  let component: ObraInfoPage;
  let fixture: ComponentFixture<ObraInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObraInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ObraInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
