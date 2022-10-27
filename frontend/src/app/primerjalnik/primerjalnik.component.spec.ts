import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerjalnikComponent } from './primerjalnik.component';

describe('PrimerjalnikComponent', () => {
  let component: PrimerjalnikComponent;
  let fixture: ComponentFixture<PrimerjalnikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimerjalnikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimerjalnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
