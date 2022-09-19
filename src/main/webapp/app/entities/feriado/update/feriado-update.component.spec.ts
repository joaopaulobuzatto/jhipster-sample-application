import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FeriadoFormService } from './feriado-form.service';
import { FeriadoService } from '../service/feriado.service';
import { IFeriado } from '../feriado.model';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

import { FeriadoUpdateComponent } from './feriado-update.component';

describe('Feriado Management Update Component', () => {
  let comp: FeriadoUpdateComponent;
  let fixture: ComponentFixture<FeriadoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let feriadoFormService: FeriadoFormService;
  let feriadoService: FeriadoService;
  let licencaService: LicencaService;
  let usuarioService: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FeriadoUpdateComponent],
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
      .overrideTemplate(FeriadoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FeriadoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    feriadoFormService = TestBed.inject(FeriadoFormService);
    feriadoService = TestBed.inject(FeriadoService);
    licencaService = TestBed.inject(LicencaService);
    usuarioService = TestBed.inject(UsuarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Licenca query and add missing value', () => {
      const feriado: IFeriado = { id: 456 };
      const licenca: ILicenca = { id: 32508 };
      feriado.licenca = licenca;

      const licencaCollection: ILicenca[] = [{ id: 72712 }];
      jest.spyOn(licencaService, 'query').mockReturnValue(of(new HttpResponse({ body: licencaCollection })));
      const additionalLicencas = [licenca];
      const expectedCollection: ILicenca[] = [...additionalLicencas, ...licencaCollection];
      jest.spyOn(licencaService, 'addLicencaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ feriado });
      comp.ngOnInit();

      expect(licencaService.query).toHaveBeenCalled();
      expect(licencaService.addLicencaToCollectionIfMissing).toHaveBeenCalledWith(
        licencaCollection,
        ...additionalLicencas.map(expect.objectContaining)
      );
      expect(comp.licencasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const feriado: IFeriado = { id: 456 };
      const usuarioCriador: IUsuario = { id: 97405 };
      feriado.usuarioCriador = usuarioCriador;

      const usuarioCollection: IUsuario[] = [{ id: 38318 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuarioCriador];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ feriado });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const feriado: IFeriado = { id: 456 };
      const licenca: ILicenca = { id: 3117 };
      feriado.licenca = licenca;
      const usuarioCriador: IUsuario = { id: 3987 };
      feriado.usuarioCriador = usuarioCriador;

      activatedRoute.data = of({ feriado });
      comp.ngOnInit();

      expect(comp.licencasSharedCollection).toContain(licenca);
      expect(comp.usuariosSharedCollection).toContain(usuarioCriador);
      expect(comp.feriado).toEqual(feriado);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFeriado>>();
      const feriado = { id: 123 };
      jest.spyOn(feriadoFormService, 'getFeriado').mockReturnValue(feriado);
      jest.spyOn(feriadoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ feriado });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: feriado }));
      saveSubject.complete();

      // THEN
      expect(feriadoFormService.getFeriado).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(feriadoService.update).toHaveBeenCalledWith(expect.objectContaining(feriado));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFeriado>>();
      const feriado = { id: 123 };
      jest.spyOn(feriadoFormService, 'getFeriado').mockReturnValue({ id: null });
      jest.spyOn(feriadoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ feriado: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: feriado }));
      saveSubject.complete();

      // THEN
      expect(feriadoFormService.getFeriado).toHaveBeenCalled();
      expect(feriadoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IFeriado>>();
      const feriado = { id: 123 };
      jest.spyOn(feriadoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ feriado });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(feriadoService.update).toHaveBeenCalled();
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
