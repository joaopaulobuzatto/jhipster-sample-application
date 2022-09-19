import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { EventoAgendaService } from '../service/evento-agenda.service';

import { EventoAgendaComponent } from './evento-agenda.component';

describe('EventoAgenda Management Component', () => {
  let comp: EventoAgendaComponent;
  let fixture: ComponentFixture<EventoAgendaComponent>;
  let service: EventoAgendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'evento-agenda', component: EventoAgendaComponent }]), HttpClientTestingModule],
      declarations: [EventoAgendaComponent],
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
      .overrideTemplate(EventoAgendaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EventoAgendaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(EventoAgendaService);

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
    expect(comp.eventoAgenda?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to eventoAgendaService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getEventoAgendaIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getEventoAgendaIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
