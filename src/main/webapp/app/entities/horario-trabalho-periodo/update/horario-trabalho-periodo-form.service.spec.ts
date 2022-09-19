import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../horario-trabalho-periodo.test-samples';

import { HorarioTrabalhoPeriodoFormService } from './horario-trabalho-periodo-form.service';

describe('HorarioTrabalhoPeriodo Form Service', () => {
  let service: HorarioTrabalhoPeriodoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorarioTrabalhoPeriodoFormService);
  });

  describe('Service methods', () => {
    describe('createHorarioTrabalhoPeriodoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createHorarioTrabalhoPeriodoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dataCriacao: expect.any(Object),
            diaDaSemana: expect.any(Object),
            periodo1Inicio: expect.any(Object),
            periodo1Fim: expect.any(Object),
            periodo2Inicio: expect.any(Object),
            periodo2Fim: expect.any(Object),
            periodo3Inicio: expect.any(Object),
            periodo3Fim: expect.any(Object),
            periodo4Inicio: expect.any(Object),
            periodo4Fim: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
            horarioTrabalho: expect.any(Object),
          })
        );
      });

      it('passing IHorarioTrabalhoPeriodo should create a new form with FormGroup', () => {
        const formGroup = service.createHorarioTrabalhoPeriodoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dataCriacao: expect.any(Object),
            diaDaSemana: expect.any(Object),
            periodo1Inicio: expect.any(Object),
            periodo1Fim: expect.any(Object),
            periodo2Inicio: expect.any(Object),
            periodo2Fim: expect.any(Object),
            periodo3Inicio: expect.any(Object),
            periodo3Fim: expect.any(Object),
            periodo4Inicio: expect.any(Object),
            periodo4Fim: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
            horarioTrabalho: expect.any(Object),
          })
        );
      });
    });

    describe('getHorarioTrabalhoPeriodo', () => {
      it('should return NewHorarioTrabalhoPeriodo for default HorarioTrabalhoPeriodo initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createHorarioTrabalhoPeriodoFormGroup(sampleWithNewData);

        const horarioTrabalhoPeriodo = service.getHorarioTrabalhoPeriodo(formGroup) as any;

        expect(horarioTrabalhoPeriodo).toMatchObject(sampleWithNewData);
      });

      it('should return NewHorarioTrabalhoPeriodo for empty HorarioTrabalhoPeriodo initial value', () => {
        const formGroup = service.createHorarioTrabalhoPeriodoFormGroup();

        const horarioTrabalhoPeriodo = service.getHorarioTrabalhoPeriodo(formGroup) as any;

        expect(horarioTrabalhoPeriodo).toMatchObject({});
      });

      it('should return IHorarioTrabalhoPeriodo', () => {
        const formGroup = service.createHorarioTrabalhoPeriodoFormGroup(sampleWithRequiredData);

        const horarioTrabalhoPeriodo = service.getHorarioTrabalhoPeriodo(formGroup) as any;

        expect(horarioTrabalhoPeriodo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IHorarioTrabalhoPeriodo should not enable id FormControl', () => {
        const formGroup = service.createHorarioTrabalhoPeriodoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewHorarioTrabalhoPeriodo should disable id FormControl', () => {
        const formGroup = service.createHorarioTrabalhoPeriodoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
