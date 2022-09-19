import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EventoAgendaDetailComponent } from './evento-agenda-detail.component';

describe('EventoAgenda Management Detail Component', () => {
  let comp: EventoAgendaDetailComponent;
  let fixture: ComponentFixture<EventoAgendaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventoAgendaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ eventoAgenda: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EventoAgendaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EventoAgendaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load eventoAgenda on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.eventoAgenda).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
