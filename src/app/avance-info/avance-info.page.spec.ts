import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvanceInfoPage } from './avance-info.page';

describe('AvanceInfoPage', () => {
  let component: AvanceInfoPage;
  let fixture: ComponentFixture<AvanceInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvanceInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvanceInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
