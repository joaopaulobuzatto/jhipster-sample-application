import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HorarioTrabalhoDetailComponent } from './horario-trabalho-detail.component';

describe('HorarioTrabalho Management Detail Component', () => {
  let comp: HorarioTrabalhoDetailComponent;
  let fixture: ComponentFixture<HorarioTrabalhoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorarioTrabalhoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ horarioTrabalho: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(HorarioTrabalhoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(HorarioTrabalhoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load horarioTrabalho on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.horarioTrabalho).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
