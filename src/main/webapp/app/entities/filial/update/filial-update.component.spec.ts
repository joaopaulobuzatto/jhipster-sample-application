import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FilialFormService } from './filial-form.service';
import { FilialService } from '../service/filial.service';
import { IFilial } from '../filial.model';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IPessoaJuridica } from 'app/entities/pessoa-juridica/pessoa-juridica.model';
import { PessoaJuridicaService } from 'app/entities/pessoa-juridica/service/pessoa-juridica.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

import { FilialUpdateComponent } from './filial-update.component';

describe('Filial Management Update Component', () => {
  let comp: FilialUpdateComponent;
  let fixture: ComponentFixture<FilialUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let filialFormService: FilialFormService;
  let filialService: FilialService;
  let licencaService: LicencaService;
  let pessoaJuridicaService: PessoaJuridicaService;
  let usuarioService: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FilialUpdateComponent],
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
      .overrideTemplate(FilialUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FilialUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    filialFormService = TestBed.inject(FilialFormService);
    filialService = TestBed.inject(FilialService);
    licencaService = TestBed.inject(LicencaService);
    pessoaJuridicaService = TestBed.inject(PessoaJuridicaService);
    usuarioService = TestBed.inject(UsuarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Licenca query and add missing value', () => {
      const filial: IFilial = { id: 456 };
      const licenca: ILicenca = { id: 52014 };
      filial.licenca = licenca;

      const licencaCollection: ILicenca[] = [{ id: 17475 }];
      jest.spyOn(licencaService, 'query').mockReturnValue(of(new HttpResponse({ body: licencaCollection })));
      const additionalLicencas = [licenca];
      const expectedCollection: ILicenca[] = [...additionalLicencas, ...licencaCollection];
      jest.spyOn(licencaService, 'addLicencaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ filial });
      comp.ngOnInit();

      expect(licencaService.query).toHaveBeenCalled();
      expect(licencaService.addLicencaToCollectionIfMissing).toHaveBeenCalledWith(
        licencaCollection,
        ...additionalLicencas.map(expect.objectContaining)
      );
      expect(comp.licencasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PessoaJuridica query and add missing value', () => {
      const filial: IFilial = { id: 456 };
      const pessoa: IPessoaJuridica = { id: 13931 };
      filial.pessoa = pessoa;

      const pessoaJuridicaCollection: IPessoaJuridica[] = [{ id: 81878 }];
      jest.spyOn(pessoaJuridicaService, 'query').mockReturnValue(of(new HttpResponse({ body: pessoaJuridicaCollection })));
      const additionalPessoaJuridicas = [pessoa];
      const expectedCollection: IPessoaJuridica[] = [...additionalPessoaJuridicas, ...pessoaJuridicaCollection];
      jest.spyOn(pessoaJuridicaService, 'addPessoaJuridicaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ filial });
      comp.ngOnInit();

      expect(pessoaJuridicaService.query).toHaveBeenCalled();
      expect(pessoaJuridicaService.addPessoaJuridicaToCollectionIfMissing).toHaveBeenCalledWith(
        pessoaJuridicaCollection,
        ...additionalPessoaJuridicas.map(expect.objectContaining)
      );
      expect(comp.pessoaJuridicasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const filial: IFilial = { id: 456 };
      const usuarioCriador: IUsuario = { id: 2807 };
      filial.usuarioCriador = usuarioCriador;

      const usuarioCollection: IUsuario[] = [{ id: 81048 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuarioCriador];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ filial });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const filial: IFilial = { id: 456 };
      const licenca: ILicenca = { id: 6898 };
      filial.licenca = licenca;
      const pessoa: IPessoaJuridica = { id: 3707 };
      filial.pessoa = pessoa;
      const usuarioCriador: IUsuario = { id: 19535 };
      filial.usuarioCriador = usuarioCriador;

      activatedRoute.data = of({ filial });
      comp.ngOnInit();

      expect(comp.licencasSharedCollection).toContain(licenca);
      expect(comp.pessoaJuridicasSharedCollection).toContain(pessoa);
      expect(comp.usuariosSharedCollection).toContain(usuarioCriador);
      expect(comp.filial).toEqual(filial);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFilial>>();
      const filial = { id: 123 };
      jest.spyOn(filialFormService, 'getFilial').mockReturnValue(filial);
      jest.spyOn(filialService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ filial });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: filial }));
      saveSubject.complete();

      // THEN
      expect(filialFormService.getFilial).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(filialService.update).toHaveBeenCalledWith(expect.objectContaining(filial));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFilial>>();
      const filial = { id: 123 };
      jest.spyOn(filialFormService, 'getFilial').mockReturnValue({ id: null });
      jest.spyOn(filialService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ filial: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: filial }));
      saveSubject.complete();

      // THEN
      expect(filialFormService.getFilial).toHaveBeenCalled();
      expect(filialService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFilial>>();
      const filial = { id: 123 };
      jest.spyOn(filialService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ filial });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(filialService.update).toHaveBeenCalled();
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

    describe('comparePessoaJuridica', () => {
      it('Should forward to pessoaJuridicaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(pessoaJuridicaService, 'comparePessoaJuridica');
        comp.comparePessoaJuridica(entity, entity2);
        expect(pessoaJuridicaService.comparePessoaJuridica).toHaveBeenCalledWith(entity, entity2);
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
  });
});
