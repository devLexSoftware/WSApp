import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserClienteAvancePage } from './user-cliente-avance.page';

describe('UserClienteAvancePage', () => {
  let component: UserClienteAvancePage;
  let fixture: ComponentFixture<UserClienteAvancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserClienteAvancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserClienteAvancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
