import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriljubljeniIzdelkiComponent } from './priljubljeni-izdelki.component';

describe('PriljubljeniIzdelkiComponent', () => {
  let component: PriljubljeniIzdelkiComponent;
  let fixture: ComponentFixture<PriljubljeniIzdelkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriljubljeniIzdelkiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriljubljeniIzdelkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
