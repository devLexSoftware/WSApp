import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserClientePage } from './user-cliente.page';

describe('UserClientePage', () => {
  let component: UserClientePage;
  let fixture: ComponentFixture<UserClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserClientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
