import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PessoaFormService } from './pessoa-form.service';
import { PessoaService } from '../service/pessoa.service';
import { IPessoa } from '../pessoa.model';
import { IEndereco } from 'app/entities/endereco/endereco.model';
import { EnderecoService } from 'app/entities/endereco/service/endereco.service';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IOperadora } from 'app/entities/operadora/operadora.model';
import { OperadoraService } from 'app/entities/operadora/service/operadora.service';

import { PessoaUpdateComponent } from './pessoa-update.component';

describe('Pessoa Management Update Component', () => {
  let comp: PessoaUpdateComponent;
  let fixture: ComponentFixture<PessoaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pessoaFormService: PessoaFormService;
  let pessoaService: PessoaService;
  let enderecoService: EnderecoService;
  let licencaService: LicencaService;
  let operadoraService: OperadoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PessoaUpdateComponent],
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
      .overrideTemplate(PessoaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PessoaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pessoaFormService = TestBed.inject(PessoaFormService);
    pessoaService = TestBed.inject(PessoaService);
    enderecoService = TestBed.inject(EnderecoService);
    licencaService = TestBed.inject(LicencaService);
    operadoraService = TestBed.inject(OperadoraService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Endereco query and add missing value', () => {
      const pessoa: IPessoa = { id: 456 };
      const endereco: IEndereco = { id: 64584 };
      pessoa.endereco = endereco;

      const enderecoCollection: IEndereco[] = [{ id: 87079 }];
      jest.spyOn(enderecoService, 'query').mockReturnValue(of(new HttpResponse({ body: enderecoCollection })));
      const additionalEnderecos = [endereco];
      const expectedCollection: IEndereco[] = [...additionalEnderecos, ...enderecoCollection];
      jest.spyOn(enderecoService, 'addEnderecoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pessoa });
      comp.ngOnInit();

      expect(enderecoService.query).toHaveBeenCalled();
      expect(enderecoService.addEnderecoToCollectionIfMissing).toHaveBeenCalledWith(
        enderecoCollection,
        ...additionalEnderecos.map(expect.objectContaining)
      );
      expect(comp.enderecosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Licenca query and add missing value', () => {
      const pessoa: IPessoa = { id: 456 };
      const licenca: ILicenca = { id: 69738 };
      pessoa.licenca = licenca;

      const licencaCollection: ILicenca[] = [{ id: 18498 }];
      jest.spyOn(licencaService, 'query').mockReturnValue(of(new HttpResponse({ body: licencaCollection })));
      const additionalLicencas = [licenca];
      const expectedCollection: ILicenca[] = [...additionalLicencas, ...licencaCollection];
      jest.spyOn(licencaService, 'addLicencaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pessoa });
      comp.ngOnInit();

      expect(licencaService.query).toHaveBeenCalled();
      expect(licencaService.addLicencaToCollectionIfMissing).toHaveBeenCalledWith(
        licencaCollection,
        ...additionalLicencas.map(expect.objectContaining)
      );
      expect(comp.licencasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Operadora query and add missing value', () => {
      const pessoa: IPessoa = { id: 456 };
      const operadoraTelefone1: IOperadora = { id: 9322 };
      pessoa.operadoraTelefone1 = operadoraTelefone1;

      const operadoraCollection: IOperadora[] = [{ id: 40305 }];
      jest.spyOn(operadoraService, 'query').mockReturnValue(of(new HttpResponse({ body: operadoraCollection })));
      const additionalOperadoras = [operadoraTelefone1];
      const expectedCollection: IOperadora[] = [...additionalOperadoras, ...operadoraCollection];
      jest.spyOn(operadoraService, 'addOperadoraToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ pessoa });
      comp.ngOnInit();

      expect(operadoraService.query).toHaveBeenCalled();
      expect(operadoraService.addOperadoraToCollectionIfMissing).toHaveBeenCalledWith(
        operadoraCollection,
        ...additionalOperadoras.map(expect.objectContaining)
      );
      expect(comp.operadorasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const pessoa: IPessoa = { id: 456 };
      const endereco: IEndereco = { id: 41167 };
      pessoa.endereco = endereco;
      const licenca: ILicenca = { id: 2669 };
      pessoa.licenca = licenca;
      const operadoraTelefone1: IOperadora = { id: 50312 };
      pessoa.operadoraTelefone1 = operadoraTelefone1;

      activatedRoute.data = of({ pessoa });
      comp.ngOnInit();

      expect(comp.enderecosSharedCollection).toContain(endereco);
      expect(comp.licencasSharedCollection).toContain(licenca);
      expect(comp.operadorasSharedCollection).toContain(operadoraTelefone1);
      expect(comp.pessoa).toEqual(pessoa);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPessoa>>();
      const pessoa = { id: 123 };
      jest.spyOn(pessoaFormService, 'getPessoa').mockReturnValue(pessoa);
      jest.spyOn(pessoaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pessoa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pessoa }));
      saveSubject.complete();

      // THEN
      expect(pessoaFormService.getPessoa).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(pessoaService.update).toHaveBeenCalledWith(expect.objectContaining(pessoa));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPessoa>>();
      const pessoa = { id: 123 };
      jest.spyOn(pessoaFormService, 'getPessoa').mockReturnValue({ id: null });
      jest.spyOn(pessoaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pessoa: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pessoa }));
      saveSubject.complete();

      // THEN
      expect(pessoaFormService.getPessoa).toHaveBeenCalled();
      expect(pessoaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPessoa>>();
      const pessoa = { id: 123 };
      jest.spyOn(pessoaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pessoa });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pessoaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareEndereco', () => {
      it('Should forward to enderecoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(enderecoService, 'compareEndereco');
        comp.compareEndereco(entity, entity2);
        expect(enderecoService.compareEndereco).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareLicenca', () => {
      it('Should forward to licencaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(licencaService, 'compareLicenca');
        comp.compareLicenca(entity, entity2);
        expect(licencaService.compareLicenca).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareOperadora', () => {
      it('Should forward to operadoraService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(operadoraService, 'compareOperadora');
        comp.compareOperadora(entity, entity2);
        expect(operadoraService.compareOperadora).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
