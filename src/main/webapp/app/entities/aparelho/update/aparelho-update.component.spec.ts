import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AparelhoFormService } from './aparelho-form.service';
import { AparelhoService } from '../service/aparelho.service';
import { IAparelho } from '../aparelho.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

import { AparelhoUpdateComponent } from './aparelho-update.component';

describe('Aparelho Management Update Component', () => {
  let comp: AparelhoUpdateComponent;
  let fixture: ComponentFixture<AparelhoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let aparelhoFormService: AparelhoFormService;
  let aparelhoService: AparelhoService;
  let usuarioService: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AparelhoUpdateComponent],
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
      .overrideTemplate(AparelhoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AparelhoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    aparelhoFormService = TestBed.inject(AparelhoFormService);
    aparelhoService = TestBed.inject(AparelhoService);
    usuarioService = TestBed.inject(UsuarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Usuario query and add missing value', () => {
      const aparelho: IAparelho = { id: 456 };
      const usuarioCriador: IUsuario = { id: 24667 };
      aparelho.usuarioCriador = usuarioCriador;

      const usuarioCollection: IUsuario[] = [{ id: 19944 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuarioCriador];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ aparelho });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const aparelho: IAparelho = { id: 456 };
      const usuarioCriador: IUsuario = { id: 52273 };
      aparelho.usuarioCriador = usuarioCriador;

      activatedRoute.data = of({ aparelho });
      comp.ngOnInit();

      expect(comp.usuariosSharedCollection).toContain(usuarioCriador);
      expect(comp.aparelho).toEqual(aparelho);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAparelho>>();
      const aparelho = { id: 123 };
      jest.spyOn(aparelhoFormService, 'getAparelho').mockReturnValue(aparelho);
      jest.spyOn(aparelhoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ aparelho });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: aparelho }));
      saveSubject.complete();

      // THEN
      expect(aparelhoFormService.getAparelho).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(aparelhoService.update).toHaveBeenCalledWith(expect.objectContaining(aparelho));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAparelho>>();
      const aparelho = { id: 123 };
      jest.spyOn(aparelhoFormService, 'getAparelho').mockReturnValue({ id: null });
      jest.spyOn(aparelhoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ aparelho: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: aparelho }));
      saveSubject.complete();

      // THEN
      expect(aparelhoFormService.getAparelho).toHaveBeenCalled();
      expect(aparelhoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAparelho>>();
      const aparelho = { id: 123 };
      jest.spyOn(aparelhoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ aparelho });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(aparelhoService.update).toHaveBeenCalled();
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
