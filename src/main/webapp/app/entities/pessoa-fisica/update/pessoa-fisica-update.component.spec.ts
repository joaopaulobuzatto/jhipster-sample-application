import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PessoaFisicaFormService } from './pessoa-fisica-form.service';
import { PessoaFisicaService } from '../service/pessoa-fisica.service';
import { IPessoaFisica } from '../pessoa-fisica.model';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';

import { PessoaFisicaUpdateComponent } from './pessoa-fisica-update.component';

describe('PessoaFisica Management Update Component', () => {
  let comp: PessoaFisicaUpdateComponent;
  let fixture: ComponentFixture<PessoaFisicaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pessoaFisicaFormService: PessoaFisicaFormService;
  let pessoaFisicaService: PessoaFisicaService;
  let licencaService: LicencaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PessoaFisicaUpdateComponent],
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
      .overrideTemplate(PessoaFisicaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PessoaFisicaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pessoaFisicaFormService = TestBed.inject(PessoaFisicaFormService);
    pessoaFisicaService = TestBed.inject(PessoaFisicaService);
    licencaService = TestBed.inject(LicencaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Licenca query and add missing value', () => {
      const pessoaFisica: IPessoaFisica = { id: 456 };
      const pessoaFisicaLicenca: ILicenca = { id: 38900 };
      pessoaFisica.pessoaFisicaLicenca = pessoaFisicaLicenca;

      const licencaCollection: ILicenca[] = [{ id: 9168 }];
      jest.spyOn(licencaService, 'query').mockReturnValue(of(new HttpResponse({ body: licencaCollection })));
      const additionalLicencas = [pessoaFisicaLicenca];
      const expectedCollection: ILicenca[] = [...additionalLicencas, ...licencaCollection];
      jest.spyOn(licencaService, 'addLicencaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pessoaFisica });
      comp.ngOnInit();

      expect(licencaService.query).toHaveBeenCalled();
      expect(licencaService.addLicencaToCollectionIfMissing).toHaveBeenCalledWith(
        licencaCollection,
        ...additionalLicencas.map(expect.objectContaining)
      );
      expect(comp.licencasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const pessoaFisica: IPessoaFisica = { id: 456 };
      const pessoaFisicaLicenca: ILicenca = { id: 79523 };
      pessoaFisica.pessoaFisicaLicenca = pessoaFisicaLicenca;

      activatedRoute.data = of({ pessoaFisica });
      comp.ngOnInit();

      expect(comp.licencasSharedCollection).toContain(pessoaFisicaLicenca);
      expect(comp.pessoaFisica).toEqual(pessoaFisica);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPessoaFisica>>();
      const pessoaFisica = { id: 123 };
      jest.spyOn(pessoaFisicaFormService, 'getPessoaFisica').mockReturnValue(pessoaFisica);
      jest.spyOn(pessoaFisicaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pessoaFisica });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pessoaFisica }));
      saveSubject.complete();

      // THEN
      expect(pessoaFisicaFormService.getPessoaFisica).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(pessoaFisicaService.update).toHaveBeenCalledWith(expect.objectContaining(pessoaFisica));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPessoaFisica>>();
      const pessoaFisica = { id: 123 };
      jest.spyOn(pessoaFisicaFormService, 'getPessoaFisica').mockReturnValue({ id: null });
      jest.spyOn(pessoaFisicaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pessoaFisica: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pessoaFisica }));
      saveSubject.complete();

      // THEN
      expect(pessoaFisicaFormService.getPessoaFisica).toHaveBeenCalled();
      expect(pessoaFisicaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPessoaFisica>>();
      const pessoaFisica = { id: 123 };
      jest.spyOn(pessoaFisicaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pessoaFisica });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pessoaFisicaService.update).toHaveBeenCalled();
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
