import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PlanoFormService } from './plano-form.service';
import { PlanoService } from '../service/plano.service';
import { IPlano } from '../plano.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

import { PlanoUpdateComponent } from './plano-update.component';

describe('Plano Management Update Component', () => {
  let comp: PlanoUpdateComponent;
  let fixture: ComponentFixture<PlanoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let planoFormService: PlanoFormService;
  let planoService: PlanoService;
  let usuarioService: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PlanoUpdateComponent],
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
      .overrideTemplate(PlanoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PlanoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    planoFormService = TestBed.inject(PlanoFormService);
    planoService = TestBed.inject(PlanoService);
    usuarioService = TestBed.inject(UsuarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Usuario query and add missing value', () => {
      const plano: IPlano = { id: 456 };
      const usuarioCriador: IUsuario = { id: 45746 };
      plano.usuarioCriador = usuarioCriador;

      const usuarioCollection: IUsuario[] = [{ id: 14551 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuarioCriador];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ plano });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const plano: IPlano = { id: 456 };
      const usuarioCriador: IUsuario = { id: 27700 };
      plano.usuarioCriador = usuarioCriador;

      activatedRoute.data = of({ plano });
      comp.ngOnInit();

      expect(comp.usuariosSharedCollection).toContain(usuarioCriador);
      expect(comp.plano).toEqual(plano);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlano>>();
      const plano = { id: 123 };
      jest.spyOn(planoFormService, 'getPlano').mockReturnValue(plano);
      jest.spyOn(planoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ plano });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: plano }));
      saveSubject.complete();

      // THEN
      expect(planoFormService.getPlano).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(planoService.update).toHaveBeenCalledWith(expect.objectContaining(plano));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlano>>();
      const plano = { id: 123 };
      jest.spyOn(planoFormService, 'getPlano').mockReturnValue({ id: null });
      jest.spyOn(planoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ plano: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: plano }));
      saveSubject.complete();

      // THEN
      expect(planoFormService.getPlano).toHaveBeenCalled();
      expect(planoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPlano>>();
      const plano = { id: 123 };
      jest.spyOn(planoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ plano });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(planoService.update).toHaveBeenCalled();
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
  });
});
