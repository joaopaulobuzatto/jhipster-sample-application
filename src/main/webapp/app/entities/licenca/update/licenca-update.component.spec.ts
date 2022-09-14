import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { LicencaFormService } from './licenca-form.service';
import { LicencaService } from '../service/licenca.service';
import { ILicenca } from '../licenca.model';
import { IPessoa } from 'app/entities/pessoa/pessoa.model';
import { PessoaService } from 'app/entities/pessoa/service/pessoa.service';
import { IPessoaFisica } from 'app/entities/pessoa-fisica/pessoa-fisica.model';
import { PessoaFisicaService } from 'app/entities/pessoa-fisica/service/pessoa-fisica.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IFilial } from 'app/entities/filial/filial.model';
import { FilialService } from 'app/entities/filial/service/filial.service';

import { LicencaUpdateComponent } from './licenca-update.component';

describe('Licenca Management Update Component', () => {
  let comp: LicencaUpdateComponent;
  let fixture: ComponentFixture<LicencaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let licencaFormService: LicencaFormService;
  let licencaService: LicencaService;
  let pessoaService: PessoaService;
  let pessoaFisicaService: PessoaFisicaService;
  let usuarioService: UsuarioService;
  let filialService: FilialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LicencaUpdateComponent],
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
      .overrideTemplate(LicencaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LicencaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    licencaFormService = TestBed.inject(LicencaFormService);
    licencaService = TestBed.inject(LicencaService);
    pessoaService = TestBed.inject(PessoaService);
    pessoaFisicaService = TestBed.inject(PessoaFisicaService);
    usuarioService = TestBed.inject(UsuarioService);
    filialService = TestBed.inject(FilialService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Pessoa query and add missing value', () => {
      const licenca: ILicenca = { id: 456 };
      const pessoa: IPessoa = { id: 63383 };
      licenca.pessoa = pessoa;

      const pessoaCollection: IPessoa[] = [{ id: 84255 }];
      jest.spyOn(pessoaService, 'query').mockReturnValue(of(new HttpResponse({ body: pessoaCollection })));
      const additionalPessoas = [pessoa];
      const expectedCollection: IPessoa[] = [...additionalPessoas, ...pessoaCollection];
      jest.spyOn(pessoaService, 'addPessoaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ licenca });
      comp.ngOnInit();

      expect(pessoaService.query).toHaveBeenCalled();
      expect(pessoaService.addPessoaToCollectionIfMissing).toHaveBeenCalledWith(
        pessoaCollection,
        ...additionalPessoas.map(expect.objectContaining)
      );
      expect(comp.pessoasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PessoaFisica query and add missing value', () => {
      const licenca: ILicenca = { id: 456 };
      const pessoaResponsavel: IPessoaFisica = { id: 24627 };
      licenca.pessoaResponsavel = pessoaResponsavel;
      const pessoaFinanceiro: IPessoaFisica = { id: 12088 };
      licenca.pessoaFinanceiro = pessoaFinanceiro;

      const pessoaFisicaCollection: IPessoaFisica[] = [{ id: 94533 }];
      jest.spyOn(pessoaFisicaService, 'query').mockReturnValue(of(new HttpResponse({ body: pessoaFisicaCollection })));
      const additionalPessoaFisicas = [pessoaResponsavel, pessoaFinanceiro];
      const expectedCollection: IPessoaFisica[] = [...additionalPessoaFisicas, ...pessoaFisicaCollection];
      jest.spyOn(pessoaFisicaService, 'addPessoaFisicaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ licenca });
      comp.ngOnInit();

      expect(pessoaFisicaService.query).toHaveBeenCalled();
      expect(pessoaFisicaService.addPessoaFisicaToCollectionIfMissing).toHaveBeenCalledWith(
        pessoaFisicaCollection,
        ...additionalPessoaFisicas.map(expect.objectContaining)
      );
      expect(comp.pessoaFisicasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const licenca: ILicenca = { id: 456 };
      const usuarioSuporte: IUsuario = { id: 87625 };
      licenca.usuarioSuporte = usuarioSuporte;
      const usuarioRobo: IUsuario = { id: 60490 };
      licenca.usuarioRobo = usuarioRobo;

      const usuarioCollection: IUsuario[] = [{ id: 43094 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuarioSuporte, usuarioRobo];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ licenca });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Filial query and add missing value', () => {
      const licenca: ILicenca = { id: 456 };
      const filialPadrao: IFilial = { id: 72272 };
      licenca.filialPadrao = filialPadrao;

      const filialCollection: IFilial[] = [{ id: 44379 }];
      jest.spyOn(filialService, 'query').mockReturnValue(of(new HttpResponse({ body: filialCollection })));
      const additionalFilials = [filialPadrao];
      const expectedCollection: IFilial[] = [...additionalFilials, ...filialCollection];
      jest.spyOn(filialService, 'addFilialToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ licenca });
      comp.ngOnInit();

      expect(filialService.query).toHaveBeenCalled();
      expect(filialService.addFilialToCollectionIfMissing).toHaveBeenCalledWith(
        filialCollection,
        ...additionalFilials.map(expect.objectContaining)
      );
      expect(comp.filialsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const licenca: ILicenca = { id: 456 };
      const pessoa: IPessoa = { id: 35696 };
      licenca.pessoa = pessoa;
      const pessoaResponsavel: IPessoaFisica = { id: 3480 };
      licenca.pessoaResponsavel = pessoaResponsavel;
      const pessoaFinanceiro: IPessoaFisica = { id: 55378 };
      licenca.pessoaFinanceiro = pessoaFinanceiro;
      const usuarioSuporte: IUsuario = { id: 8395 };
      licenca.usuarioSuporte = usuarioSuporte;
      const usuarioRobo: IUsuario = { id: 55463 };
      licenca.usuarioRobo = usuarioRobo;
      const filialPadrao: IFilial = { id: 75351 };
      licenca.filialPadrao = filialPadrao;

      activatedRoute.data = of({ licenca });
      comp.ngOnInit();

      expect(comp.pessoasSharedCollection).toContain(pessoa);
      expect(comp.pessoaFisicasSharedCollection).toContain(pessoaResponsavel);
      expect(comp.pessoaFisicasSharedCollection).toContain(pessoaFinanceiro);
      expect(comp.usuariosSharedCollection).toContain(usuarioSuporte);
      expect(comp.usuariosSharedCollection).toContain(usuarioRobo);
      expect(comp.filialsSharedCollection).toContain(filialPadrao);
      expect(comp.licenca).toEqual(licenca);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILicenca>>();
      const licenca = { id: 123 };
      jest.spyOn(licencaFormService, 'getLicenca').mockReturnValue(licenca);
      jest.spyOn(licencaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ licenca });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: licenca }));
      saveSubject.complete();

      // THEN
      expect(licencaFormService.getLicenca).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(licencaService.update).toHaveBeenCalledWith(expect.objectContaining(licenca));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILicenca>>();
      const licenca = { id: 123 };
      jest.spyOn(licencaFormService, 'getLicenca').mockReturnValue({ id: null });
      jest.spyOn(licencaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ licenca: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: licenca }));
      saveSubject.complete();

      // THEN
      expect(licencaFormService.getLicenca).toHaveBeenCalled();
      expect(licencaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILicenca>>();
      const licenca = { id: 123 };
      jest.spyOn(licencaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ licenca });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(licencaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('comparePessoa', () => {
      it('Should forward to pessoaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(pessoaService, 'comparePessoa');
        comp.comparePessoa(entity, entity2);
        expect(pessoaService.comparePessoa).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('comparePessoaFisica', () => {
      it('Should forward to pessoaFisicaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(pessoaFisicaService, 'comparePessoaFisica');
        comp.comparePessoaFisica(entity, entity2);
        expect(pessoaFisicaService.comparePessoaFisica).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareUsuario', () => {
      it('Should forward to usuarioService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(usuarioService, 'compareUsuario');
        comp.compareUsuario(entity, entity2);
        expect(usuarioService.compareUsuario).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareFilial', () => {
      it('Should forward to filialService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(filialService, 'compareFilial');
        comp.compareFilial(entity, entity2);
        expect(filialService.compareFilial).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
