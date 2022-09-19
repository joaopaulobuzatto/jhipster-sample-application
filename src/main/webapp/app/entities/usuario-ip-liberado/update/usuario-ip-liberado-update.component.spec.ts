import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UsuarioIpLiberadoFormService } from './usuario-ip-liberado-form.service';
import { UsuarioIpLiberadoService } from '../service/usuario-ip-liberado.service';
import { IUsuarioIpLiberado } from '../usuario-ip-liberado.model';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IIpLiberado } from 'app/entities/ip-liberado/ip-liberado.model';
import { IpLiberadoService } from 'app/entities/ip-liberado/service/ip-liberado.service';

import { UsuarioIpLiberadoUpdateComponent } from './usuario-ip-liberado-update.component';

describe('UsuarioIpLiberado Management Update Component', () => {
  let comp: UsuarioIpLiberadoUpdateComponent;
  let fixture: ComponentFixture<UsuarioIpLiberadoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let usuarioIpLiberadoFormService: UsuarioIpLiberadoFormService;
  let usuarioIpLiberadoService: UsuarioIpLiberadoService;
  let licencaService: LicencaService;
  let usuarioService: UsuarioService;
  let ipLiberadoService: IpLiberadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UsuarioIpLiberadoUpdateComponent],
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
      .overrideTemplate(UsuarioIpLiberadoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UsuarioIpLiberadoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    usuarioIpLiberadoFormService = TestBed.inject(UsuarioIpLiberadoFormService);
    usuarioIpLiberadoService = TestBed.inject(UsuarioIpLiberadoService);
    licencaService = TestBed.inject(LicencaService);
    usuarioService = TestBed.inject(UsuarioService);
    ipLiberadoService = TestBed.inject(IpLiberadoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Licenca query and add missing value', () => {
      const usuarioIpLiberado: IUsuarioIpLiberado = { id: 456 };
      const licenca: ILicenca = { id: 69752 };
      usuarioIpLiberado.licenca = licenca;

      const licencaCollection: ILicenca[] = [{ id: 34542 }];
      jest.spyOn(licencaService, 'query').mockReturnValue(of(new HttpResponse({ body: licencaCollection })));
      const additionalLicencas = [licenca];
      const expectedCollection: ILicenca[] = [...additionalLicencas, ...licencaCollection];
      jest.spyOn(licencaService, 'addLicencaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuarioIpLiberado });
      comp.ngOnInit();

      expect(licencaService.query).toHaveBeenCalled();
      expect(licencaService.addLicencaToCollectionIfMissing).toHaveBeenCalledWith(
        licencaCollection,
        ...additionalLicencas.map(expect.objectContaining)
      );
      expect(comp.licencasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const usuarioIpLiberado: IUsuarioIpLiberado = { id: 456 };
      const usuario: IUsuario = { id: 30552 };
      usuarioIpLiberado.usuario = usuario;

      const usuarioCollection: IUsuario[] = [{ id: 37653 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuario];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuarioIpLiberado });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call IpLiberado query and add missing value', () => {
      const usuarioIpLiberado: IUsuarioIpLiberado = { id: 456 };
      const ipLiberado: IIpLiberado = { id: 2927 };
      usuarioIpLiberado.ipLiberado = ipLiberado;

      const ipLiberadoCollection: IIpLiberado[] = [{ id: 24687 }];
      jest.spyOn(ipLiberadoService, 'query').mockReturnValue(of(new HttpResponse({ body: ipLiberadoCollection })));
      const additionalIpLiberados = [ipLiberado];
      const expectedCollection: IIpLiberado[] = [...additionalIpLiberados, ...ipLiberadoCollection];
      jest.spyOn(ipLiberadoService, 'addIpLiberadoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuarioIpLiberado });
      comp.ngOnInit();

      expect(ipLiberadoService.query).toHaveBeenCalled();
      expect(ipLiberadoService.addIpLiberadoToCollectionIfMissing).toHaveBeenCalledWith(
        ipLiberadoCollection,
        ...additionalIpLiberados.map(expect.objectContaining)
      );
      expect(comp.ipLiberadosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const usuarioIpLiberado: IUsuarioIpLiberado = { id: 456 };
      const licenca: ILicenca = { id: 80788 };
      usuarioIpLiberado.licenca = licenca;
      const usuario: IUsuario = { id: 82336 };
      usuarioIpLiberado.usuario = usuario;
      const ipLiberado: IIpLiberado = { id: 21014 };
      usuarioIpLiberado.ipLiberado = ipLiberado;

      activatedRoute.data = of({ usuarioIpLiberado });
      comp.ngOnInit();

      expect(comp.licencasSharedCollection).toContain(licenca);
      expect(comp.usuariosSharedCollection).toContain(usuario);
      expect(comp.ipLiberadosSharedCollection).toContain(ipLiberado);
      expect(comp.usuarioIpLiberado).toEqual(usuarioIpLiberado);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuarioIpLiberado>>();
      const usuarioIpLiberado = { id: 123 };
      jest.spyOn(usuarioIpLiberadoFormService, 'getUsuarioIpLiberado').mockReturnValue(usuarioIpLiberado);
      jest.spyOn(usuarioIpLiberadoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuarioIpLiberado });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usuarioIpLiberado }));
      saveSubject.complete();

      // THEN
      expect(usuarioIpLiberadoFormService.getUsuarioIpLiberado).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(usuarioIpLiberadoService.update).toHaveBeenCalledWith(expect.objectContaining(usuarioIpLiberado));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuarioIpLiberado>>();
      const usuarioIpLiberado = { id: 123 };
      jest.spyOn(usuarioIpLiberadoFormService, 'getUsuarioIpLiberado').mockReturnValue({ id: null });
      jest.spyOn(usuarioIpLiberadoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuarioIpLiberado: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usuarioIpLiberado }));
      saveSubject.complete();

      // THEN
      expect(usuarioIpLiberadoFormService.getUsuarioIpLiberado).toHaveBeenCalled();
      expect(usuarioIpLiberadoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuarioIpLiberado>>();
      const usuarioIpLiberado = { id: 123 };
      jest.spyOn(usuarioIpLiberadoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuarioIpLiberado });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(usuarioIpLiberadoService.update).toHaveBeenCalled();
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

    describe('compareIpLiberado', () => {
      it('Should forward to ipLiberadoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(ipLiberadoService, 'compareIpLiberado');
        comp.compareIpLiberado(entity, entity2);
        expect(ipLiberadoService.compareIpLiberado).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
