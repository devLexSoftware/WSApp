import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComprasObraPage } from './compras-obra.page';

describe('ComprasObraPage', () => {
  let component: ComprasObraPage;
  let fixture: ComponentFixture<ComprasObraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprasObraPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComprasObraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
