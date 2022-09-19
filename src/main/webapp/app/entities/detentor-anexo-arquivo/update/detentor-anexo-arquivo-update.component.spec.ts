import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DetentorAnexoArquivoFormService } from './detentor-anexo-arquivo-form.service';
import { DetentorAnexoArquivoService } from '../service/detentor-anexo-arquivo.service';
import { IDetentorAnexoArquivo } from '../detentor-anexo-arquivo.model';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

import { DetentorAnexoArquivoUpdateComponent } from './detentor-anexo-arquivo-update.component';

describe('DetentorAnexoArquivo Management Update Component', () => {
  let comp: DetentorAnexoArquivoUpdateComponent;
  let fixture: ComponentFixture<DetentorAnexoArquivoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let detentorAnexoArquivoFormService: DetentorAnexoArquivoFormService;
  let detentorAnexoArquivoService: DetentorAnexoArquivoService;
  let licencaService: LicencaService;
  let usuarioService: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DetentorAnexoArquivoUpdateComponent],
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
      .overrideTemplate(DetentorAnexoArquivoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DetentorAnexoArquivoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    detentorAnexoArquivoFormService = TestBed.inject(DetentorAnexoArquivoFormService);
    detentorAnexoArquivoService = TestBed.inject(DetentorAnexoArquivoService);
    licencaService = TestBed.inject(LicencaService);
    usuarioService = TestBed.inject(UsuarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Licenca query and add missing value', () => {
      const detentorAnexoArquivo: IDetentorAnexoArquivo = { id: 456 };
      const licenca: ILicenca = { id: 2844 };
      detentorAnexoArquivo.licenca = licenca;

      const licencaCollection: ILicenca[] = [{ id: 98932 }];
      jest.spyOn(licencaService, 'query').mockReturnValue(of(new HttpResponse({ body: licencaCollection })));
      const additionalLicencas = [licenca];
      const expectedCollection: ILicenca[] = [...additionalLicencas, ...licencaCollection];
      jest.spyOn(licencaService, 'addLicencaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ detentorAnexoArquivo });
      comp.ngOnInit();

      expect(licencaService.query).toHaveBeenCalled();
      expect(licencaService.addLicencaToCollectionIfMissing).toHaveBeenCalledWith(
        licencaCollection,
        ...additionalLicencas.map(expect.objectContaining)
      );
      expect(comp.licencasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const detentorAnexoArquivo: IDetentorAnexoArquivo = { id: 456 };
      const usuarioCriador: IUsuario = { id: 47840 };
      detentorAnexoArquivo.usuarioCriador = usuarioCriador;

      const usuarioCollection: IUsuario[] = [{ id: 30863 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuarioCriador];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ detentorAnexoArquivo });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const detentorAnexoArquivo: IDetentorAnexoArquivo = { id: 456 };
      const licenca: ILicenca = { id: 47533 };
      detentorAnexoArquivo.licenca = licenca;
      const usuarioCriador: IUsuario = { id: 49307 };
      detentorAnexoArquivo.usuarioCriador = usuarioCriador;

      activatedRoute.data = of({ detentorAnexoArquivo });
      comp.ngOnInit();

      expect(comp.licencasSharedCollection).toContain(licenca);
      expect(comp.usuariosSharedCollection).toContain(usuarioCriador);
      expect(comp.detentorAnexoArquivo).toEqual(detentorAnexoArquivo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDetentorAnexoArquivo>>();
      const detentorAnexoArquivo = { id: 123 };
      jest.spyOn(detentorAnexoArquivoFormService, 'getDetentorAnexoArquivo').mockReturnValue(detentorAnexoArquivo);
      jest.spyOn(detentorAnexoArquivoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ detentorAnexoArquivo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: detentorAnexoArquivo }));
      saveSubject.complete();

      // THEN
      expect(detentorAnexoArquivoFormService.getDetentorAnexoArquivo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(detentorAnexoArquivoService.update).toHaveBeenCalledWith(expect.objectContaining(detentorAnexoArquivo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDetentorAnexoArquivo>>();
      const detentorAnexoArquivo = { id: 123 };
      jest.spyOn(detentorAnexoArquivoFormService, 'getDetentorAnexoArquivo').mockReturnValue({ id: null });
      jest.spyOn(detentorAnexoArquivoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ detentorAnexoArquivo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: detentorAnexoArquivo }));
      saveSubject.complete();

      // THEN
      expect(detentorAnexoArquivoFormService.getDetentorAnexoArquivo).toHaveBeenCalled();
      expect(detentorAnexoArquivoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDetentorAnexoArquivo>>();
      const detentorAnexoArquivo = { id: 123 };
      jest.spyOn(detentorAnexoArquivoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ detentorAnexoArquivo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(detentorAnexoArquivoService.update).toHaveBeenCalled();
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
