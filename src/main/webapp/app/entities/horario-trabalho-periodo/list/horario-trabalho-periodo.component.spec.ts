import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HorarioTrabalhoPeriodoService } from '../service/horario-trabalho-periodo.service';

import { HorarioTrabalhoPeriodoComponent } from './horario-trabalho-periodo.component';

describe('HorarioTrabalhoPeriodo Management Component', () => {
  let comp: HorarioTrabalhoPeriodoComponent;
  let fixture: ComponentFixture<HorarioTrabalhoPeriodoComponent>;
  let service: HorarioTrabalhoPeriodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'horario-trabalho-periodo', component: HorarioTrabalhoPeriodoComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [HorarioTrabalhoPeriodoComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(HorarioTrabalhoPeriodoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HorarioTrabalhoPeriodoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(HorarioTrabalhoPeriodoService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.horarioTrabalhoPeriodos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to horarioTrabalhoPeriodoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getHorarioTrabalhoPeriodoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getHorarioTrabalhoPeriodoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
