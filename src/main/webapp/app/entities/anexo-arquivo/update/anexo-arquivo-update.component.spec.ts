import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AnexoArquivoFormService } from './anexo-arquivo-form.service';
import { AnexoArquivoService } from '../service/anexo-arquivo.service';
import { IAnexoArquivo } from '../anexo-arquivo.model';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IDetentorAnexoArquivo } from 'app/entities/detentor-anexo-arquivo/detentor-anexo-arquivo.model';
import { DetentorAnexoArquivoService } from 'app/entities/detentor-anexo-arquivo/service/detentor-anexo-arquivo.service';
import { ITipoDeDocumentoAnexavel } from 'app/entities/tipo-de-documento-anexavel/tipo-de-documento-anexavel.model';
import { TipoDeDocumentoAnexavelService } from 'app/entities/tipo-de-documento-anexavel/service/tipo-de-documento-anexavel.service';

import { AnexoArquivoUpdateComponent } from './anexo-arquivo-update.component';

describe('AnexoArquivo Management Update Component', () => {
  let comp: AnexoArquivoUpdateComponent;
  let fixture: ComponentFixture<AnexoArquivoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let anexoArquivoFormService: AnexoArquivoFormService;
  let anexoArquivoService: AnexoArquivoService;
  let licencaService: LicencaService;
  let usuarioService: UsuarioService;
  let detentorAnexoArquivoService: DetentorAnexoArquivoService;
  let tipoDeDocumentoAnexavelService: TipoDeDocumentoAnexavelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AnexoArquivoUpdateComponent],
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
      .overrideTemplate(AnexoArquivoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AnexoArquivoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    anexoArquivoFormService = TestBed.inject(AnexoArquivoFormService);
    anexoArquivoService = TestBed.inject(AnexoArquivoService);
    licencaService = TestBed.inject(LicencaService);
    usuarioService = TestBed.inject(UsuarioService);
    detentorAnexoArquivoService = TestBed.inject(DetentorAnexoArquivoService);
    tipoDeDocumentoAnexavelService = TestBed.inject(TipoDeDocumentoAnexavelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Licenca query and add missing value', () => {
      const anexoArquivo: IAnexoArquivo = { id: 456 };
      const licenca: ILicenca = { id: 66389 };
      anexoArquivo.licenca = licenca;

      const licencaCollection: ILicenca[] = [{ id: 10260 }];
      jest.spyOn(licencaService, 'query').mockReturnValue(of(new HttpResponse({ body: licencaCollection })));
      const additionalLicencas = [licenca];
      const expectedCollection: ILicenca[] = [...additionalLicencas, ...licencaCollection];
      jest.spyOn(licencaService, 'addLicencaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ anexoArquivo });
      comp.ngOnInit();

      expect(licencaService.query).toHaveBeenCalled();
      expect(licencaService.addLicencaToCollectionIfMissing).toHaveBeenCalledWith(
        licencaCollection,
        ...additionalLicencas.map(expect.objectContaining)
      );
      expect(comp.licencasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const anexoArquivo: IAnexoArquivo = { id: 456 };
      const usuarioCriador: IUsuario = { id: 53682 };
      anexoArquivo.usuarioCriador = usuarioCriador;

      const usuarioCollection: IUsuario[] = [{ id: 16724 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuarioCriador];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ anexoArquivo });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DetentorAnexoArquivo query and add missing value', () => {
      const anexoArquivo: IAnexoArquivo = { id: 456 };
      const detentorAnexoArquivo: IDetentorAnexoArquivo = { id: 45028 };
      anexoArquivo.detentorAnexoArquivo = detentorAnexoArquivo;

      const detentorAnexoArquivoCollection: IDetentorAnexoArquivo[] = [{ id: 42614 }];
      jest.spyOn(detentorAnexoArquivoService, 'query').mockReturnValue(of(new HttpResponse({ body: detentorAnexoArquivoCollection })));
      const additionalDetentorAnexoArquivos = [detentorAnexoArquivo];
      const expectedCollection: IDetentorAnexoArquivo[] = [...additionalDetentorAnexoArquivos, ...detentorAnexoArquivoCollection];
      jest.spyOn(detentorAnexoArquivoService, 'addDetentorAnexoArquivoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ anexoArquivo });
      comp.ngOnInit();

      expect(detentorAnexoArquivoService.query).toHaveBeenCalled();
      expect(detentorAnexoArquivoService.addDetentorAnexoArquivoToCollectionIfMissing).toHaveBeenCalledWith(
        detentorAnexoArquivoCollection,
        ...additionalDetentorAnexoArquivos.map(expect.objectContaining)
      );
      expect(comp.detentorAnexoArquivosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call TipoDeDocumentoAnexavel query and add missing value', () => {
      const anexoArquivo: IAnexoArquivo = { id: 456 };
      const tipoDeDocumentoAnexavel: ITipoDeDocumentoAnexavel = { id: 88459 };
      anexoArquivo.tipoDeDocumentoAnexavel = tipoDeDocumentoAnexavel;

      const tipoDeDocumentoAnexavelCollection: ITipoDeDocumentoAnexavel[] = [{ id: 98444 }];
      jest
        .spyOn(tipoDeDocumentoAnexavelService, 'query')
        .mockReturnValue(of(new HttpResponse({ body: tipoDeDocumentoAnexavelCollection })));
      const additionalTipoDeDocumentoAnexavels = [tipoDeDocumentoAnexavel];
      const expectedCollection: ITipoDeDocumentoAnexavel[] = [...additionalTipoDeDocumentoAnexavels, ...tipoDeDocumentoAnexavelCollection];
      jest.spyOn(tipoDeDocumentoAnexavelService, 'addTipoDeDocumentoAnexavelToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ anexoArquivo });
      comp.ngOnInit();

      expect(tipoDeDocumentoAnexavelService.query).toHaveBeenCalled();
      expect(tipoDeDocumentoAnexavelService.addTipoDeDocumentoAnexavelToCollectionIfMissing).toHaveBeenCalledWith(
        tipoDeDocumentoAnexavelCollection,
        ...additionalTipoDeDocumentoAnexavels.map(expect.objectContaining)
      );
      expect(comp.tipoDeDocumentoAnexavelsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const anexoArquivo: IAnexoArquivo = { id: 456 };
      const licenca: ILicenca = { id: 28756 };
      anexoArquivo.licenca = licenca;
      const usuarioCriador: IUsuario = { id: 49100 };
      anexoArquivo.usuarioCriador = usuarioCriador;
      const detentorAnexoArquivo: IDetentorAnexoArquivo = { id: 23418 };
      anexoArquivo.detentorAnexoArquivo = detentorAnexoArquivo;
      const tipoDeDocumentoAnexavel: ITipoDeDocumentoAnexavel = { id: 81641 };
      anexoArquivo.tipoDeDocumentoAnexavel = tipoDeDocumentoAnexavel;

      activatedRoute.data = of({ anexoArquivo });
      comp.ngOnInit();

      expect(comp.licencasSharedCollection).toContain(licenca);
      expect(comp.usuariosSharedCollection).toContain(usuarioCriador);
      expect(comp.detentorAnexoArquivosSharedCollection).toContain(detentorAnexoArquivo);
      expect(comp.tipoDeDocumentoAnexavelsSharedCollection).toContain(tipoDeDocumentoAnexavel);
      expect(comp.anexoArquivo).toEqual(anexoArquivo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnexoArquivo>>();
      const anexoArquivo = { id: 123 };
      jest.spyOn(anexoArquivoFormService, 'getAnexoArquivo').mockReturnValue(anexoArquivo);
      jest.spyOn(anexoArquivoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ anexoArquivo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: anexoArquivo }));
      saveSubject.complete();

      // THEN
      expect(anexoArquivoFormService.getAnexoArquivo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(anexoArquivoService.update).toHaveBeenCalledWith(expect.objectContaining(anexoArquivo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnexoArquivo>>();
      const anexoArquivo = { id: 123 };
      jest.spyOn(anexoArquivoFormService, 'getAnexoArquivo').mockReturnValue({ id: null });
      jest.spyOn(anexoArquivoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ anexoArquivo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: anexoArquivo }));
      saveSubject.complete();

      // THEN
      expect(anexoArquivoFormService.getAnexoArquivo).toHaveBeenCalled();
      expect(anexoArquivoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnexoArquivo>>();
      const anexoArquivo = { id: 123 };
      jest.spyOn(anexoArquivoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ anexoArquivo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(anexoArquivoService.update).toHaveBeenCalled();
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

    describe('compareDetentorAnexoArquivo', () => {
      it('Should forward to detentorAnexoArquivoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(detentorAnexoArquivoService, 'compareDetentorAnexoArquivo');
        comp.compareDetentorAnexoArquivo(entity, entity2);
        expect(detentorAnexoArquivoService.compareDetentorAnexoArquivo).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTipoDeDocumentoAnexavel', () => {
      it('Should forward to tipoDeDocumentoAnexavelService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(tipoDeDocumentoAnexavelService, 'compareTipoDeDocumentoAnexavel');
        comp.compareTipoDeDocumentoAnexavel(entity, entity2);
        expect(tipoDeDocumentoAnexavelService.compareTipoDeDocumentoAnexavel).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
