import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HorarioTrabalhoPeriodoDetailComponent } from './horario-trabalho-periodo-detail.component';

describe('HorarioTrabalhoPeriodo Management Detail Component', () => {
  let comp: HorarioTrabalhoPeriodoDetailComponent;
  let fixture: ComponentFixture<HorarioTrabalhoPeriodoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorarioTrabalhoPeriodoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ horarioTrabalhoPeriodo: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(HorarioTrabalhoPeriodoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(HorarioTrabalhoPeriodoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load horarioTrabalhoPeriodo on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.horarioTrabalhoPeriodo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
