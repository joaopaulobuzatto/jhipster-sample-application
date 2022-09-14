import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../horario-trabalho.test-samples';

import { HorarioTrabalhoFormService } from './horario-trabalho-form.service';

describe('HorarioTrabalho Form Service', () => {
  let service: HorarioTrabalhoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorarioTrabalhoFormService);
  });

  describe('Service methods', () => {
    describe('createHorarioTrabalhoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createHorarioTrabalhoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            descricao: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
          })
        );
      });

      it('passing IHorarioTrabalho should create a new form with FormGroup', () => {
        const formGroup = service.createHorarioTrabalhoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            descricao: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
          })
        );
      });
    });

    describe('getHorarioTrabalho', () => {
      it('should return NewHorarioTrabalho for default HorarioTrabalho initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createHorarioTrabalhoFormGroup(sampleWithNewData);

        const horarioTrabalho = service.getHorarioTrabalho(formGroup) as any;

        expect(horarioTrabalho).toMatchObject(sampleWithNewData);
      });

      it('should return NewHorarioTrabalho for empty HorarioTrabalho initial value', () => {
        const formGroup = service.createHorarioTrabalhoFormGroup();

        const horarioTrabalho = service.getHorarioTrabalho(formGroup) as any;

        expect(horarioTrabalho).toMatchObject({});
      });

      it('should return IHorarioTrabalho', () => {
        const formGroup = service.createHorarioTrabalhoFormGroup(sampleWithRequiredData);

        const horarioTrabalho = service.getHorarioTrabalho(formGroup) as any;

        expect(horarioTrabalho).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IHorarioTrabalho should not enable id FormControl', () => {
        const formGroup = service.createHorarioTrabalhoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewHorarioTrabalho should disable id FormControl', () => {
        const formGroup = service.createHorarioTrabalhoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
