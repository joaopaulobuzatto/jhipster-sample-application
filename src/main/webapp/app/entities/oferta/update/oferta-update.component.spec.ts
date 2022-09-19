import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { OfertaFormService } from './oferta-form.service';
import { OfertaService } from '../service/oferta.service';
import { IOferta } from '../oferta.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IPlano } from 'app/entities/plano/plano.model';
import { PlanoService } from 'app/entities/plano/service/plano.service';

import { OfertaUpdateComponent } from './oferta-update.component';

describe('Oferta Management Update Component', () => {
  let comp: OfertaUpdateComponent;
  let fixture: ComponentFixture<OfertaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ofertaFormService: OfertaFormService;
  let ofertaService: OfertaService;
  let usuarioService: UsuarioService;
  let planoService: PlanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [OfertaUpdateComponent],
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
      .overrideTemplate(OfertaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OfertaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ofertaFormService = TestBed.inject(OfertaFormService);
    ofertaService = TestBed.inject(OfertaService);
    usuarioService = TestBed.inject(UsuarioService);
    planoService = TestBed.inject(PlanoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Usuario query and add missing value', () => {
      const oferta: IOferta = { id: 456 };
      const usuarioCriador: IUsuario = { id: 98614 };
      oferta.usuarioCriador = usuarioCriador;

      const usuarioCollection: IUsuario[] = [{ id: 31796 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuarioCriador];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ oferta });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Plano query and add missing value', () => {
      const oferta: IOferta = { id: 456 };
      const plano: IPlano = { id: 80862 };
      oferta.plano = plano;

      const planoCollection: IPlano[] = [{ id: 90948 }];
      jest.spyOn(planoService, 'query').mockReturnValue(of(new HttpResponse({ body: planoCollection })));
      const additionalPlanos = [plano];
      const expectedCollection: IPlano[] = [...additionalPlanos, ...planoCollection];
      jest.spyOn(planoService, 'addPlanoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ oferta });
      comp.ngOnInit();

      expect(planoService.query).toHaveBeenCalled();
      expect(planoService.addPlanoToCollectionIfMissing).toHaveBeenCalledWith(
        planoCollection,
        ...additionalPlanos.map(expect.objectContaining)
      );
      expect(comp.planosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const oferta: IOferta = { id: 456 };
      const usuarioCriador: IUsuario = { id: 98499 };
      oferta.usuarioCriador = usuarioCriador;
      const plano: IPlano = { id: 1016 };
      oferta.plano = plano;

      activatedRoute.data = of({ oferta });
      comp.ngOnInit();

      expect(comp.usuariosSharedCollection).toContain(usuarioCriador);
      expect(comp.planosSharedCollection).toContain(plano);
      expect(comp.oferta).toEqual(oferta);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOferta>>();
      const oferta = { id: 123 };
      jest.spyOn(ofertaFormService, 'getOferta').mockReturnValue(oferta);
      jest.spyOn(ofertaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oferta });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: oferta }));
      saveSubject.complete();

      // THEN
      expect(ofertaFormService.getOferta).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ofertaService.update).toHaveBeenCalledWith(expect.objectContaining(oferta));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOferta>>();
      const oferta = { id: 123 };
      jest.spyOn(ofertaFormService, 'getOferta').mockReturnValue({ id: null });
      jest.spyOn(ofertaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oferta: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: oferta }));
      saveSubject.complete();

      // THEN
      expect(ofertaFormService.getOferta).toHaveBeenCalled();
      expect(ofertaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOferta>>();
      const oferta = { id: 123 };
      jest.spyOn(ofertaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ oferta });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ofertaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUsuario', () => {
      it('Should forward to usuarioService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(usuarioService, 'compareUsuario');
        comp.compareUsuario(entity, entity2);
        expect(usuarioService.compareUsuario).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('comparePlano', () => {
      it('Should forward to planoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(planoService, 'comparePlano');
        comp.comparePlano(entity, entity2);
        expect(planoService.comparePlano).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
