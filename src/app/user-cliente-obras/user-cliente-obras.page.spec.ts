import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserClienteObrasPage } from './user-cliente-obras.page';

describe('UserClienteObrasPage', () => {
  let component: UserClienteObrasPage;
  let fixture: ComponentFixture<UserClienteObrasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserClienteObrasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserClienteObrasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
