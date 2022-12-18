import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerjalnikVrstaComponent } from './primerjalnik-vrsta.component';

describe('PrimerjalnikVrstaComponent', () => {
  let component: PrimerjalnikVrstaComponent;
  let fixture: ComponentFixture<PrimerjalnikVrstaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimerjalnikVrstaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimerjalnikVrstaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
