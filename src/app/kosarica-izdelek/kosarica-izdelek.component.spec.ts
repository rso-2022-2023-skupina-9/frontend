import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KosaricaIzdelekComponent } from './kosarica-izdelek.component';

describe('KosaricaIzdelekComponent', () => {
  let component: KosaricaIzdelekComponent;
  let fixture: ComponentFixture<KosaricaIzdelekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KosaricaIzdelekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KosaricaIzdelekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
