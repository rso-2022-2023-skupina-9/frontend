import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerjalnikTrgovinaComponent } from './primerjalnik-trgovina.component';

describe('PrimerjalnikTrgovinaComponent', () => {
  let component: PrimerjalnikTrgovinaComponent;
  let fixture: ComponentFixture<PrimerjalnikTrgovinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimerjalnikTrgovinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimerjalnikTrgovinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
