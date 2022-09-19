import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PessoaJuridicaFormService } from './pessoa-juridica-form.service';
import { PessoaJuridicaService } from '../service/pessoa-juridica.service';
import { IPessoaJuridica } from '../pessoa-juridica.model';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';

import { PessoaJuridicaUpdateComponent } from './pessoa-juridica-update.component';

describe('PessoaJuridica Management Update Component', () => {
  let comp: PessoaJuridicaUpdateComponent;
  let fixture: ComponentFixture<PessoaJuridicaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pessoaJuridicaFormService: PessoaJuridicaFormService;
  let pessoaJuridicaService: PessoaJuridicaService;
  let licencaService: LicencaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PessoaJuridicaUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PessoaJuridicaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PessoaJuridicaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pessoaJuridicaFormService = TestBed.inject(PessoaJuridicaFormService);
    pessoaJuridicaService = TestBed.inject(PessoaJuridicaService);
    licencaService = TestBed.inject(LicencaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Licenca query and add missing value', () => {
      const pessoaJuridica: IPessoaJuridica = { id: 456 };
      const pessoaJuridicaLicenca: ILicenca = { id: 42050 };
      pessoaJuridica.pessoaJuridicaLicenca = pessoaJuridicaLicenca;

      const licencaCollection: ILicenca[] = [{ id: 40612 }];
      jest.spyOn(licencaService, 'query').mockReturnValue(of(new HttpResponse({ body: licencaCollection })));
      const additionalLicencas = [pessoaJuridicaLicenca];
      const expectedCollection: ILicenca[] = [...additionalLicencas, ...licencaCollection];
      jest.spyOn(licencaService, 'addLicencaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pessoaJuridica });
      comp.ngOnInit();

      expect(licencaService.query).toHaveBeenCalled();
      expect(licencaService.addLicencaToCollectionIfMissing).toHaveBeenCalledWith(
        licencaCollection,
        ...additionalLicencas.map(expect.objectContaining)
      );
      expect(comp.licencasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const pessoaJuridica: IPessoaJuridica = { id: 456 };
      const pessoaJuridicaLicenca: ILicenca = { id: 81275 };
      pessoaJuridica.pessoaJuridicaLicenca = pessoaJuridicaLicenca;

      activatedRoute.data = of({ pessoaJuridica });
      comp.ngOnInit();

      expect(comp.licencasSharedCollection).toContain(pessoaJuridicaLicenca);
      expect(comp.pessoaJuridica).toEqual(pessoaJuridica);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPessoaJuridica>>();
      const pessoaJuridica = { id: 123 };
      jest.spyOn(pessoaJuridicaFormService, 'getPessoaJuridica').mockReturnValue(pessoaJuridica);
      jest.spyOn(pessoaJuridicaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pessoaJuridica });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pessoaJuridica }));
      saveSubject.complete();

      // THEN
      expect(pessoaJuridicaFormService.getPessoaJuridica).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(pessoaJuridicaService.update).toHaveBeenCalledWith(expect.objectContaining(pessoaJuridica));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPessoaJuridica>>();
      const pessoaJuridica = { id: 123 };
      jest.spyOn(pessoaJuridicaFormService, 'getPessoaJuridica').mockReturnValue({ id: null });
      jest.spyOn(pessoaJuridicaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pessoaJuridica: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pessoaJuridica }));
      saveSubject.complete();

      // THEN
      expect(pessoaJuridicaFormService.getPessoaJuridica).toHaveBeenCalled();
      expect(pessoaJuridicaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPessoaJuridica>>();
      const pessoaJuridica = { id: 123 };
      jest.spyOn(pessoaJuridicaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pessoaJuridica });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pessoaJuridicaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareLicenca', () => {
      it('Should forward to licencaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(licencaService, 'compareLicenca');
        comp.compareLicenca(entity, entity2);
        expect(licencaService.compareLicenca).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
