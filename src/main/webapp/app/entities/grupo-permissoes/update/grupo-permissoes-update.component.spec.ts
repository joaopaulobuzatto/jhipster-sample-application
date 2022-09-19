import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { GrupoPermissoesFormService } from './grupo-permissoes-form.service';
import { GrupoPermissoesService } from '../service/grupo-permissoes.service';
import { IGrupoPermissoes } from '../grupo-permissoes.model';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

import { GrupoPermissoesUpdateComponent } from './grupo-permissoes-update.component';

describe('GrupoPermissoes Management Update Component', () => {
  let comp: GrupoPermissoesUpdateComponent;
  let fixture: ComponentFixture<GrupoPermissoesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let grupoPermissoesFormService: GrupoPermissoesFormService;
  let grupoPermissoesService: GrupoPermissoesService;
  let licencaService: LicencaService;
  let usuarioService: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [GrupoPermissoesUpdateComponent],
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
      .overrideTemplate(GrupoPermissoesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GrupoPermissoesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    grupoPermissoesFormService = TestBed.inject(GrupoPermissoesFormService);
    grupoPermissoesService = TestBed.inject(GrupoPermissoesService);
    licencaService = TestBed.inject(LicencaService);
    usuarioService = TestBed.inject(UsuarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Licenca query and add missing value', () => {
      const grupoPermissoes: IGrupoPermissoes = { id: 456 };
      const licenca: ILicenca = { id: 83231 };
      grupoPermissoes.licenca = licenca;

      const licencaCollection: ILicenca[] = [{ id: 30496 }];
      jest.spyOn(licencaService, 'query').mockReturnValue(of(new HttpResponse({ body: licencaCollection })));
      const additionalLicencas = [licenca];
      const expectedCollection: ILicenca[] = [...additionalLicencas, ...licencaCollection];
      jest.spyOn(licencaService, 'addLicencaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ grupoPermissoes });
      comp.ngOnInit();

      expect(licencaService.query).toHaveBeenCalled();
      expect(licencaService.addLicencaToCollectionIfMissing).toHaveBeenCalledWith(
        licencaCollection,
        ...additionalLicencas.map(expect.objectContaining)
      );
      expect(comp.licencasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const grupoPermissoes: IGrupoPermissoes = { id: 456 };
      const usuarioCriador: IUsuario = { id: 44656 };
      grupoPermissoes.usuarioCriador = usuarioCriador;

      const usuarioCollection: IUsuario[] = [{ id: 60000 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuarioCriador];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ grupoPermissoes });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const grupoPermissoes: IGrupoPermissoes = { id: 456 };
      const licenca: ILicenca = { id: 37295 };
      grupoPermissoes.licenca = licenca;
      const usuarioCriador: IUsuario = { id: 56160 };
      grupoPermissoes.usuarioCriador = usuarioCriador;

      activatedRoute.data = of({ grupoPermissoes });
      comp.ngOnInit();

      expect(comp.licencasSharedCollection).toContain(licenca);
      expect(comp.usuariosSharedCollection).toContain(usuarioCriador);
      expect(comp.grupoPermissoes).toEqual(grupoPermissoes);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupoPermissoes>>();
      const grupoPermissoes = { id: 123 };
      jest.spyOn(grupoPermissoesFormService, 'getGrupoPermissoes').mockReturnValue(grupoPermissoes);
      jest.spyOn(grupoPermissoesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoPermissoes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grupoPermissoes }));
      saveSubject.complete();

      // THEN
      expect(grupoPermissoesFormService.getGrupoPermissoes).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(grupoPermissoesService.update).toHaveBeenCalledWith(expect.objectContaining(grupoPermissoes));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupoPermissoes>>();
      const grupoPermissoes = { id: 123 };
      jest.spyOn(grupoPermissoesFormService, 'getGrupoPermissoes').mockReturnValue({ id: null });
      jest.spyOn(grupoPermissoesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoPermissoes: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: grupoPermissoes }));
      saveSubject.complete();

      // THEN
      expect(grupoPermissoesFormService.getGrupoPermissoes).toHaveBeenCalled();
      expect(grupoPermissoesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGrupoPermissoes>>();
      const grupoPermissoes = { id: 123 };
      jest.spyOn(grupoPermissoesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ grupoPermissoes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(grupoPermissoesService.update).toHaveBeenCalled();
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
  });
});
