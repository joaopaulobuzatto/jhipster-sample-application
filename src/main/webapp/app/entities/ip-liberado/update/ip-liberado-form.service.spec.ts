import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../ip-liberado.test-samples';

import { IpLiberadoFormService } from './ip-liberado-form.service';

describe('IpLiberado Form Service', () => {
  let service: IpLiberadoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpLiberadoFormService);
  });

  describe('Service methods', () => {
    describe('createIpLiberadoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createIpLiberadoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            descricao: expect.any(Object),
            ipLiberado: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
          })
        );
      });

      it('passing IIpLiberado should create a new form with FormGroup', () => {
        const formGroup = service.createIpLiberadoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigo: expect.any(Object),
            dataCriacao: expect.any(Object),
            descricao: expect.any(Object),
            ipLiberado: expect.any(Object),
            licenca: expect.any(Object),
            usuarioCriador: expect.any(Object),
          })
        );
      });
    });

    describe('getIpLiberado', () => {
      it('should return NewIpLiberado for default IpLiberado initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createIpLiberadoFormGroup(sampleWithNewData);

        const ipLiberado = service.getIpLiberado(formGroup) as any;

        expect(ipLiberado).toMatchObject(sampleWithNewData);
      });

      it('should return NewIpLiberado for empty IpLiberado initial value', () => {
        const formGroup = service.createIpLiberadoFormGroup();

        const ipLiberado = service.getIpLiberado(formGroup) as any;

        expect(ipLiberado).toMatchObject({});
      });

      it('should return IIpLiberado', () => {
        const formGroup = service.createIpLiberadoFormGroup(sampleWithRequiredData);

        const ipLiberado = service.getIpLiberado(formGroup) as any;

        expect(ipLiberado).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IIpLiberado should not enable id FormControl', () => {
        const formGroup = service.createIpLiberadoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewIpLiberado should disable id FormControl', () => {
        const formGroup = service.createIpLiberadoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
