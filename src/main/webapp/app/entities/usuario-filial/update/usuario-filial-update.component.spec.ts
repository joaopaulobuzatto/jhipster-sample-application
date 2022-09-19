import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UsuarioFilialFormService } from './usuario-filial-form.service';
import { UsuarioFilialService } from '../service/usuario-filial.service';
import { IUsuarioFilial } from '../usuario-filial.model';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IFilial } from 'app/entities/filial/filial.model';
import { FilialService } from 'app/entities/filial/service/filial.service';

import { UsuarioFilialUpdateComponent } from './usuario-filial-update.component';

describe('UsuarioFilial Management Update Component', () => {
  let comp: UsuarioFilialUpdateComponent;
  let fixture: ComponentFixture<UsuarioFilialUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let usuarioFilialFormService: UsuarioFilialFormService;
  let usuarioFilialService: UsuarioFilialService;
  let licencaService: LicencaService;
  let usuarioService: UsuarioService;
  let filialService: FilialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UsuarioFilialUpdateComponent],
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
      .overrideTemplate(UsuarioFilialUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UsuarioFilialUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    usuarioFilialFormService = TestBed.inject(UsuarioFilialFormService);
    usuarioFilialService = TestBed.inject(UsuarioFilialService);
    licencaService = TestBed.inject(LicencaService);
    usuarioService = TestBed.inject(UsuarioService);
    filialService = TestBed.inject(FilialService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Licenca query and add missing value', () => {
      const usuarioFilial: IUsuarioFilial = { id: 456 };
      const licenca: ILicenca = { id: 4192 };
      usuarioFilial.licenca = licenca;

      const licencaCollection: ILicenca[] = [{ id: 69475 }];
      jest.spyOn(licencaService, 'query').mockReturnValue(of(new HttpResponse({ body: licencaCollection })));
      const additionalLicencas = [licenca];
      const expectedCollection: ILicenca[] = [...additionalLicencas, ...licencaCollection];
      jest.spyOn(licencaService, 'addLicencaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuarioFilial });
      comp.ngOnInit();

      expect(licencaService.query).toHaveBeenCalled();
      expect(licencaService.addLicencaToCollectionIfMissing).toHaveBeenCalledWith(
        licencaCollection,
        ...additionalLicencas.map(expect.objectContaining)
      );
      expect(comp.licencasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const usuarioFilial: IUsuarioFilial = { id: 456 };
      const usuario: IUsuario = { id: 45334 };
      usuarioFilial.usuario = usuario;

      const usuarioCollection: IUsuario[] = [{ id: 25380 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuario];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuarioFilial });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Filial query and add missing value', () => {
      const usuarioFilial: IUsuarioFilial = { id: 456 };
      const filial: IFilial = { id: 67712 };
      usuarioFilial.filial = filial;

      const filialCollection: IFilial[] = [{ id: 18885 }];
      jest.spyOn(filialService, 'query').mockReturnValue(of(new HttpResponse({ body: filialCollection })));
      const additionalFilials = [filial];
      const expectedCollection: IFilial[] = [...additionalFilials, ...filialCollection];
      jest.spyOn(filialService, 'addFilialToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuarioFilial });
      comp.ngOnInit();

      expect(filialService.query).toHaveBeenCalled();
      expect(filialService.addFilialToCollectionIfMissing).toHaveBeenCalledWith(
        filialCollection,
        ...additionalFilials.map(expect.objectContaining)
      );
      expect(comp.filialsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const usuarioFilial: IUsuarioFilial = { id: 456 };
      const licenca: ILicenca = { id: 26930 };
      usuarioFilial.licenca = licenca;
      const usuario: IUsuario = { id: 46013 };
      usuarioFilial.usuario = usuario;
      const filial: IFilial = { id: 37451 };
      usuarioFilial.filial = filial;

      activatedRoute.data = of({ usuarioFilial });
      comp.ngOnInit();

      expect(comp.licencasSharedCollection).toContain(licenca);
      expect(comp.usuariosSharedCollection).toContain(usuario);
      expect(comp.filialsSharedCollection).toContain(filial);
      expect(comp.usuarioFilial).toEqual(usuarioFilial);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuarioFilial>>();
      const usuarioFilial = { id: 123 };
      jest.spyOn(usuarioFilialFormService, 'getUsuarioFilial').mockReturnValue(usuarioFilial);
      jest.spyOn(usuarioFilialService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuarioFilial });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usuarioFilial }));
      saveSubject.complete();

      // THEN
      expect(usuarioFilialFormService.getUsuarioFilial).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(usuarioFilialService.update).toHaveBeenCalledWith(expect.objectContaining(usuarioFilial));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuarioFilial>>();
      const usuarioFilial = { id: 123 };
      jest.spyOn(usuarioFilialFormService, 'getUsuarioFilial').mockReturnValue({ id: null });
      jest.spyOn(usuarioFilialService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuarioFilial: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usuarioFilial }));
      saveSubject.complete();

      // THEN
      expect(usuarioFilialFormService.getUsuarioFilial).toHaveBeenCalled();
      expect(usuarioFilialService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuarioFilial>>();
      const usuarioFilial = { id: 123 };
      jest.spyOn(usuarioFilialService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuarioFilial });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(usuarioFilialService.update).toHaveBeenCalled();
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
