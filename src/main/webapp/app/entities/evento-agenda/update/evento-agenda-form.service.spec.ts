import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../evento-agenda.test-samples';

import { EventoAgendaFormService } from './evento-agenda-form.service';

describe('EventoAgenda Form Service', () => {
  let service: EventoAgendaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventoAgendaFormService);
  });

  describe('Service methods', () => {
    describe('createEventoAgendaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEventoAgendaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dataCriacao: expect.any(Object),
            data: expect.any(Object),
            descricao: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
            usuarioResponsavel: expect.any(Object),
          })
        );
      });

      it('passing IEventoAgenda should create a new form with FormGroup', () => {
        const formGroup = service.createEventoAgendaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dataCriacao: expect.any(Object),
            data: expect.any(Object),
            descricao: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
            usuarioResponsavel: expect.any(Object),
          })
        );
      });
    });

    describe('getEventoAgenda', () => {
      it('should return NewEventoAgenda for default EventoAgenda initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEventoAgendaFormGroup(sampleWithNewData);

        const eventoAgenda = service.getEventoAgenda(formGroup) as any;

        expect(eventoAgenda).toMatchObject(sampleWithNewData);
      });

      it('should return NewEventoAgenda for empty EventoAgenda initial value', () => {
        const formGroup = service.createEventoAgendaFormGroup();

        const eventoAgenda = service.getEventoAgenda(formGroup) as any;

        expect(eventoAgenda).toMatchObject({});
      });

      it('should return IEventoAgenda', () => {
        const formGroup = service.createEventoAgendaFormGroup(sampleWithRequiredData);

        const eventoAgenda = service.getEventoAgenda(formGroup) as any;

        expect(eventoAgenda).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEventoAgenda should not enable id FormControl', () => {
        const formGroup = service.createEventoAgendaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEventoAgenda should disable id FormControl', () => {
        const formGroup = service.createEventoAgendaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
