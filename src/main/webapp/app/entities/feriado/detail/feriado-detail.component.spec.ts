import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FeriadoDetailComponent } from './feriado-detail.component';

describe('Feriado Management Detail Component', () => {
  let comp: FeriadoDetailComponent;
  let fixture: ComponentFixture<FeriadoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeriadoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ feriado: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(FeriadoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(FeriadoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load feriado on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.feriado).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
