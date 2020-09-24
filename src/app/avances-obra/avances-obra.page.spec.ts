import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvancesObraPage } from './avances-obra.page';

describe('AvancesObraPage', () => {
  let component: AvancesObraPage;
  let fixture: ComponentFixture<AvancesObraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvancesObraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvancesObraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
