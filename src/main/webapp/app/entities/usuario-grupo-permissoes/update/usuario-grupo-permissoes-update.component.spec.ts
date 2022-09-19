import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UsuarioGrupoPermissoesFormService } from './usuario-grupo-permissoes-form.service';
import { UsuarioGrupoPermissoesService } from '../service/usuario-grupo-permissoes.service';
import { IUsuarioGrupoPermissoes } from '../usuario-grupo-permissoes.model';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IGrupoPermissoes } from 'app/entities/grupo-permissoes/grupo-permissoes.model';
import { GrupoPermissoesService } from 'app/entities/grupo-permissoes/service/grupo-permissoes.service';

import { UsuarioGrupoPermissoesUpdateComponent } from './usuario-grupo-permissoes-update.component';

describe('UsuarioGrupoPermissoes Management Update Component', () => {
  let comp: UsuarioGrupoPermissoesUpdateComponent;
  let fixture: ComponentFixture<UsuarioGrupoPermissoesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let usuarioGrupoPermissoesFormService: UsuarioGrupoPermissoesFormService;
  let usuarioGrupoPermissoesService: UsuarioGrupoPermissoesService;
  let licencaService: LicencaService;
  let usuarioService: UsuarioService;
  let grupoPermissoesService: GrupoPermissoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UsuarioGrupoPermissoesUpdateComponent],
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
      .overrideTemplate(UsuarioGrupoPermissoesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UsuarioGrupoPermissoesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    usuarioGrupoPermissoesFormService = TestBed.inject(UsuarioGrupoPermissoesFormService);
    usuarioGrupoPermissoesService = TestBed.inject(UsuarioGrupoPermissoesService);
    licencaService = TestBed.inject(LicencaService);
    usuarioService = TestBed.inject(UsuarioService);
    grupoPermissoesService = TestBed.inject(GrupoPermissoesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Licenca query and add missing value', () => {
      const usuarioGrupoPermissoes: IUsuarioGrupoPermissoes = { id: 456 };
      const licenca: ILicenca = { id: 56554 };
      usuarioGrupoPermissoes.licenca = licenca;

      const licencaCollection: ILicenca[] = [{ id: 93690 }];
      jest.spyOn(licencaService, 'query').mockReturnValue(of(new HttpResponse({ body: licencaCollection })));
      const additionalLicencas = [licenca];
      const expectedCollection: ILicenca[] = [...additionalLicencas, ...licencaCollection];
      jest.spyOn(licencaService, 'addLicencaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuarioGrupoPermissoes });
      comp.ngOnInit();

      expect(licencaService.query).toHaveBeenCalled();
      expect(licencaService.addLicencaToCollectionIfMissing).toHaveBeenCalledWith(
        licencaCollection,
        ...additionalLicencas.map(expect.objectContaining)
      );
      expect(comp.licencasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const usuarioGrupoPermissoes: IUsuarioGrupoPermissoes = { id: 456 };
      const usuario: IUsuario = { id: 26960 };
      usuarioGrupoPermissoes.usuario = usuario;

      const usuarioCollection: IUsuario[] = [{ id: 51238 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuario];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuarioGrupoPermissoes });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call GrupoPermissoes query and add missing value', () => {
      const usuarioGrupoPermissoes: IUsuarioGrupoPermissoes = { id: 456 };
      const grupoPermissoes: IGrupoPermissoes = { id: 92787 };
      usuarioGrupoPermissoes.grupoPermissoes = grupoPermissoes;

      const grupoPermissoesCollection: IGrupoPermissoes[] = [{ id: 82137 }];
      jest.spyOn(grupoPermissoesService, 'query').mockReturnValue(of(new HttpResponse({ body: grupoPermissoesCollection })));
      const additionalGrupoPermissoes = [grupoPermissoes];
      const expectedCollection: IGrupoPermissoes[] = [...additionalGrupoPermissoes, ...grupoPermissoesCollection];
      jest.spyOn(grupoPermissoesService, 'addGrupoPermissoesToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuarioGrupoPermissoes });
      comp.ngOnInit();

      expect(grupoPermissoesService.query).toHaveBeenCalled();
      expect(grupoPermissoesService.addGrupoPermissoesToCollectionIfMissing).toHaveBeenCalledWith(
        grupoPermissoesCollection,
        ...additionalGrupoPermissoes.map(expect.objectContaining)
      );
      expect(comp.grupoPermissoesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const usuarioGrupoPermissoes: IUsuarioGrupoPermissoes = { id: 456 };
      const licenca: ILicenca = { id: 16358 };
      usuarioGrupoPermissoes.licenca = licenca;
      const usuario: IUsuario = { id: 6265 };
      usuarioGrupoPermissoes.usuario = usuario;
      const grupoPermissoes: IGrupoPermissoes = { id: 77829 };
      usuarioGrupoPermissoes.grupoPermissoes = grupoPermissoes;

      activatedRoute.data = of({ usuarioGrupoPermissoes });
      comp.ngOnInit();

      expect(comp.licencasSharedCollection).toContain(licenca);
      expect(comp.usuariosSharedCollection).toContain(usuario);
      expect(comp.grupoPermissoesSharedCollection).toContain(grupoPermissoes);
      expect(comp.usuarioGrupoPermissoes).toEqual(usuarioGrupoPermissoes);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuarioGrupoPermissoes>>();
      const usuarioGrupoPermissoes = { id: 123 };
      jest.spyOn(usuarioGrupoPermissoesFormService, 'getUsuarioGrupoPermissoes').mockReturnValue(usuarioGrupoPermissoes);
      jest.spyOn(usuarioGrupoPermissoesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuarioGrupoPermissoes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usuarioGrupoPermissoes }));
      saveSubject.complete();

      // THEN
      expect(usuarioGrupoPermissoesFormService.getUsuarioGrupoPermissoes).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(usuarioGrupoPermissoesService.update).toHaveBeenCalledWith(expect.objectContaining(usuarioGrupoPermissoes));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuarioGrupoPermissoes>>();
      const usuarioGrupoPermissoes = { id: 123 };
      jest.spyOn(usuarioGrupoPermissoesFormService, 'getUsuarioGrupoPermissoes').mockReturnValue({ id: null });
      jest.spyOn(usuarioGrupoPermissoesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuarioGrupoPermissoes: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usuarioGrupoPermissoes }));
      saveSubject.complete();

      // THEN
      expect(usuarioGrupoPermissoesFormService.getUsuarioGrupoPermissoes).toHaveBeenCalled();
      expect(usuarioGrupoPermissoesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuarioGrupoPermissoes>>();
      const usuarioGrupoPermissoes = { id: 123 };
      jest.spyOn(usuarioGrupoPermissoesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuarioGrupoPermissoes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(usuarioGrupoPermissoesService.update).toHaveBeenCalled();
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

    describe('compareUsuario', () => {
      it('Should forward to usuarioService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(usuarioService, 'compareUsuario');
        comp.compareUsuario(entity, entity2);
        expect(usuarioService.compareUsuario).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareGrupoPermissoes', () => {
      it('Should forward to grupoPermissoesService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(grupoPermissoesService, 'compareGrupoPermissoes');
        comp.compareGrupoPermissoes(entity, entity2);
        expect(grupoPermissoesService.compareGrupoPermissoes).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
