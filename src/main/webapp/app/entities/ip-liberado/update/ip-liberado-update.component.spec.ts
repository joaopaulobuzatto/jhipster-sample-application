import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IpLiberadoFormService } from './ip-liberado-form.service';
import { IpLiberadoService } from '../service/ip-liberado.service';
import { IIpLiberado } from '../ip-liberado.model';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

import { IpLiberadoUpdateComponent } from './ip-liberado-update.component';

describe('IpLiberado Management Update Component', () => {
  let comp: IpLiberadoUpdateComponent;
  let fixture: ComponentFixture<IpLiberadoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ipLiberadoFormService: IpLiberadoFormService;
  let ipLiberadoService: IpLiberadoService;
  let licencaService: LicencaService;
  let usuarioService: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [IpLiberadoUpdateComponent],
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
      .overrideTemplate(IpLiberadoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(IpLiberadoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ipLiberadoFormService = TestBed.inject(IpLiberadoFormService);
    ipLiberadoService = TestBed.inject(IpLiberadoService);
    licencaService = TestBed.inject(LicencaService);
    usuarioService = TestBed.inject(UsuarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Licenca query and add missing value', () => {
      const ipLiberado: IIpLiberado = { id: 456 };
      const licenca: ILicenca = { id: 17798 };
      ipLiberado.licenca = licenca;

      const licencaCollection: ILicenca[] = [{ id: 59969 }];
      jest.spyOn(licencaService, 'query').mockReturnValue(of(new HttpResponse({ body: licencaCollection })));
      const additionalLicencas = [licenca];
      const expectedCollection: ILicenca[] = [...additionalLicencas, ...licencaCollection];
      jest.spyOn(licencaService, 'addLicencaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ipLiberado });
      comp.ngOnInit();

      expect(licencaService.query).toHaveBeenCalled();
      expect(licencaService.addLicencaToCollectionIfMissing).toHaveBeenCalledWith(
        licencaCollection,
        ...additionalLicencas.map(expect.objectContaining)
      );
      expect(comp.licencasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const ipLiberado: IIpLiberado = { id: 456 };
      const usuarioCriador: IUsuario = { id: 7406 };
      ipLiberado.usuarioCriador = usuarioCriador;

      const usuarioCollection: IUsuario[] = [{ id: 22454 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuarioCriador];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ipLiberado });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const ipLiberado: IIpLiberado = { id: 456 };
      const licenca: ILicenca = { id: 56630 };
      ipLiberado.licenca = licenca;
      const usuarioCriador: IUsuario = { id: 73993 };
      ipLiberado.usuarioCriador = usuarioCriador;

      activatedRoute.data = of({ ipLiberado });
      comp.ngOnInit();

      expect(comp.licencasSharedCollection).toContain(licenca);
      expect(comp.usuariosSharedCollection).toContain(usuarioCriador);
      expect(comp.ipLiberado).toEqual(ipLiberado);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIpLiberado>>();
      const ipLiberado = { id: 123 };
      jest.spyOn(ipLiberadoFormService, 'getIpLiberado').mockReturnValue(ipLiberado);
      jest.spyOn(ipLiberadoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ipLiberado });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ipLiberado }));
      saveSubject.complete();

      // THEN
      expect(ipLiberadoFormService.getIpLiberado).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ipLiberadoService.update).toHaveBeenCalledWith(expect.objectContaining(ipLiberado));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIpLiberado>>();
      const ipLiberado = { id: 123 };
      jest.spyOn(ipLiberadoFormService, 'getIpLiberado').mockReturnValue({ id: null });
      jest.spyOn(ipLiberadoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ipLiberado: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ipLiberado }));
      saveSubject.complete();

      // THEN
      expect(ipLiberadoFormService.getIpLiberado).toHaveBeenCalled();
      expect(ipLiberadoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IIpLiberado>>();
      const ipLiberado = { id: 123 };
      jest.spyOn(ipLiberadoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ipLiberado });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ipLiberadoService.update).toHaveBeenCalled();
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
