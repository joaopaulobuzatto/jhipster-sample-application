import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ServicoFormService } from './servico-form.service';
import { ServicoService } from '../service/servico.service';
import { IServico } from '../servico.model';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

import { ServicoUpdateComponent } from './servico-update.component';

describe('Servico Management Update Component', () => {
  let comp: ServicoUpdateComponent;
  let fixture: ComponentFixture<ServicoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let servicoFormService: ServicoFormService;
  let servicoService: ServicoService;
  let usuarioService: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ServicoUpdateComponent],
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
      .overrideTemplate(ServicoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ServicoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    servicoFormService = TestBed.inject(ServicoFormService);
    servicoService = TestBed.inject(ServicoService);
    usuarioService = TestBed.inject(UsuarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Usuario query and add missing value', () => {
      const servico: IServico = { id: 456 };
      const usuarioCriador: IUsuario = { id: 74076 };
      servico.usuarioCriador = usuarioCriador;

      const usuarioCollection: IUsuario[] = [{ id: 24211 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuarioCriador];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ servico });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const servico: IServico = { id: 456 };
      const usuarioCriador: IUsuario = { id: 16153 };
      servico.usuarioCriador = usuarioCriador;

      activatedRoute.data = of({ servico });
      comp.ngOnInit();

      expect(comp.usuariosSharedCollection).toContain(usuarioCriador);
      expect(comp.servico).toEqual(servico);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IServico>>();
      const servico = { id: 123 };
      jest.spyOn(servicoFormService, 'getServico').mockReturnValue(servico);
      jest.spyOn(servicoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ servico });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: servico }));
      saveSubject.complete();

      // THEN
      expect(servicoFormService.getServico).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(servicoService.update).toHaveBeenCalledWith(expect.objectContaining(servico));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IServico>>();
      const servico = { id: 123 };
      jest.spyOn(servicoFormService, 'getServico').mockReturnValue({ id: null });
      jest.spyOn(servicoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ servico: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: servico }));
      saveSubject.complete();

      // THEN
      expect(servicoFormService.getServico).toHaveBeenCalled();
      expect(servicoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IServico>>();
      const servico = { id: 123 };
      jest.spyOn(servicoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ servico });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(servicoService.update).toHaveBeenCalled();
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
