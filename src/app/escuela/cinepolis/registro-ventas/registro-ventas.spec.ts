import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroVentas } from './registro-ventas';

describe('RegistroVentas', () => {
  let component: RegistroVentas;
  let fixture: ComponentFixture<RegistroVentas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroVentas],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroVentas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
