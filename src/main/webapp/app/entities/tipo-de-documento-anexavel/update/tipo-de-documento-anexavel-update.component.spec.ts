import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TipoDeDocumentoAnexavelFormService } from './tipo-de-documento-anexavel-form.service';
import { TipoDeDocumentoAnexavelService } from '../service/tipo-de-documento-anexavel.service';
import { ITipoDeDocumentoAnexavel } from '../tipo-de-documento-anexavel.model';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

import { TipoDeDocumentoAnexavelUpdateComponent } from './tipo-de-documento-anexavel-update.component';

describe('TipoDeDocumentoAnexavel Management Update Component', () => {
  let comp: TipoDeDocumentoAnexavelUpdateComponent;
  let fixture: ComponentFixture<TipoDeDocumentoAnexavelUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tipoDeDocumentoAnexavelFormService: TipoDeDocumentoAnexavelFormService;
  let tipoDeDocumentoAnexavelService: TipoDeDocumentoAnexavelService;
  let licencaService: LicencaService;
  let usuarioService: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TipoDeDocumentoAnexavelUpdateComponent],
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
      .overrideTemplate(TipoDeDocumentoAnexavelUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoDeDocumentoAnexavelUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tipoDeDocumentoAnexavelFormService = TestBed.inject(TipoDeDocumentoAnexavelFormService);
    tipoDeDocumentoAnexavelService = TestBed.inject(TipoDeDocumentoAnexavelService);
    licencaService = TestBed.inject(LicencaService);
    usuarioService = TestBed.inject(UsuarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Licenca query and add missing value', () => {
      const tipoDeDocumentoAnexavel: ITipoDeDocumentoAnexavel = { id: 456 };
      const licenca: ILicenca = { id: 75009 };
      tipoDeDocumentoAnexavel.licenca = licenca;

      const licencaCollection: ILicenca[] = [{ id: 57727 }];
      jest.spyOn(licencaService, 'query').mockReturnValue(of(new HttpResponse({ body: licencaCollection })));
      const additionalLicencas = [licenca];
      const expectedCollection: ILicenca[] = [...additionalLicencas, ...licencaCollection];
      jest.spyOn(licencaService, 'addLicencaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tipoDeDocumentoAnexavel });
      comp.ngOnInit();

      expect(licencaService.query).toHaveBeenCalled();
      expect(licencaService.addLicencaToCollectionIfMissing).toHaveBeenCalledWith(
        licencaCollection,
        ...additionalLicencas.map(expect.objectContaining)
      );
      expect(comp.licencasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const tipoDeDocumentoAnexavel: ITipoDeDocumentoAnexavel = { id: 456 };
      const usuarioCriador: IUsuario = { id: 3488 };
      tipoDeDocumentoAnexavel.usuarioCriador = usuarioCriador;

      const usuarioCollection: IUsuario[] = [{ id: 23640 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuarioCriador];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ tipoDeDocumentoAnexavel });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const tipoDeDocumentoAnexavel: ITipoDeDocumentoAnexavel = { id: 456 };
      const licenca: ILicenca = { id: 22919 };
      tipoDeDocumentoAnexavel.licenca = licenca;
      const usuarioCriador: IUsuario = { id: 59863 };
      tipoDeDocumentoAnexavel.usuarioCriador = usuarioCriador;

      activatedRoute.data = of({ tipoDeDocumentoAnexavel });
      comp.ngOnInit();

      expect(comp.licencasSharedCollection).toContain(licenca);
      expect(comp.usuariosSharedCollection).toContain(usuarioCriador);
      expect(comp.tipoDeDocumentoAnexavel).toEqual(tipoDeDocumentoAnexavel);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoDeDocumentoAnexavel>>();
      const tipoDeDocumentoAnexavel = { id: 123 };
      jest.spyOn(tipoDeDocumentoAnexavelFormService, 'getTipoDeDocumentoAnexavel').mockReturnValue(tipoDeDocumentoAnexavel);
      jest.spyOn(tipoDeDocumentoAnexavelService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoDeDocumentoAnexavel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoDeDocumentoAnexavel }));
      saveSubject.complete();

      // THEN
      expect(tipoDeDocumentoAnexavelFormService.getTipoDeDocumentoAnexavel).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tipoDeDocumentoAnexavelService.update).toHaveBeenCalledWith(expect.objectContaining(tipoDeDocumentoAnexavel));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoDeDocumentoAnexavel>>();
      const tipoDeDocumentoAnexavel = { id: 123 };
      jest.spyOn(tipoDeDocumentoAnexavelFormService, 'getTipoDeDocumentoAnexavel').mockReturnValue({ id: null });
      jest.spyOn(tipoDeDocumentoAnexavelService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoDeDocumentoAnexavel: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tipoDeDocumentoAnexavel }));
      saveSubject.complete();

      // THEN
      expect(tipoDeDocumentoAnexavelFormService.getTipoDeDocumentoAnexavel).toHaveBeenCalled();
      expect(tipoDeDocumentoAnexavelService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITipoDeDocumentoAnexavel>>();
      const tipoDeDocumentoAnexavel = { id: 123 };
      jest.spyOn(tipoDeDocumentoAnexavelService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoDeDocumentoAnexavel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tipoDeDocumentoAnexavelService.update).toHaveBeenCalled();
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
