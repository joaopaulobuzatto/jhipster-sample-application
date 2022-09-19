import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EventoAgendaFormService } from './evento-agenda-form.service';
import { EventoAgendaService } from '../service/evento-agenda.service';
import { IEventoAgenda } from '../evento-agenda.model';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

import { EventoAgendaUpdateComponent } from './evento-agenda-update.component';

describe('EventoAgenda Management Update Component', () => {
  let comp: EventoAgendaUpdateComponent;
  let fixture: ComponentFixture<EventoAgendaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let eventoAgendaFormService: EventoAgendaFormService;
  let eventoAgendaService: EventoAgendaService;
  let licencaService: LicencaService;
  let usuarioService: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EventoAgendaUpdateComponent],
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
      .overrideTemplate(EventoAgendaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EventoAgendaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    eventoAgendaFormService = TestBed.inject(EventoAgendaFormService);
    eventoAgendaService = TestBed.inject(EventoAgendaService);
    licencaService = TestBed.inject(LicencaService);
    usuarioService = TestBed.inject(UsuarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Licenca query and add missing value', () => {
      const eventoAgenda: IEventoAgenda = { id: 456 };
      const licenca: ILicenca = { id: 50131 };
      eventoAgenda.licenca = licenca;

      const licencaCollection: ILicenca[] = [{ id: 109 }];
      jest.spyOn(licencaService, 'query').mockReturnValue(of(new HttpResponse({ body: licencaCollection })));
      const additionalLicencas = [licenca];
      const expectedCollection: ILicenca[] = [...additionalLicencas, ...licencaCollection];
      jest.spyOn(licencaService, 'addLicencaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ eventoAgenda });
      comp.ngOnInit();

      expect(licencaService.query).toHaveBeenCalled();
      expect(licencaService.addLicencaToCollectionIfMissing).toHaveBeenCalledWith(
        licencaCollection,
        ...additionalLicencas.map(expect.objectContaining)
      );
      expect(comp.licencasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const eventoAgenda: IEventoAgenda = { id: 456 };
      const usuarioCriador: IUsuario = { id: 12629 };
      eventoAgenda.usuarioCriador = usuarioCriador;
      const usuarioResponsavel: IUsuario = { id: 17506 };
      eventoAgenda.usuarioResponsavel = usuarioResponsavel;

      const usuarioCollection: IUsuario[] = [{ id: 89611 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuarioCriador, usuarioResponsavel];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ eventoAgenda });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const eventoAgenda: IEventoAgenda = { id: 456 };
      const licenca: ILicenca = { id: 9070 };
      eventoAgenda.licenca = licenca;
      const usuarioCriador: IUsuario = { id: 89167 };
      eventoAgenda.usuarioCriador = usuarioCriador;
      const usuarioResponsavel: IUsuario = { id: 69329 };
      eventoAgenda.usuarioResponsavel = usuarioResponsavel;

      activatedRoute.data = of({ eventoAgenda });
      comp.ngOnInit();

      expect(comp.licencasSharedCollection).toContain(licenca);
      expect(comp.usuariosSharedCollection).toContain(usuarioCriador);
      expect(comp.usuariosSharedCollection).toContain(usuarioResponsavel);
      expect(comp.eventoAgenda).toEqual(eventoAgenda);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEventoAgenda>>();
      const eventoAgenda = { id: 123 };
      jest.spyOn(eventoAgendaFormService, 'getEventoAgenda').mockReturnValue(eventoAgenda);
      jest.spyOn(eventoAgendaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ eventoAgenda });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: eventoAgenda }));
      saveSubject.complete();

      // THEN
      expect(eventoAgendaFormService.getEventoAgenda).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(eventoAgendaService.update).toHaveBeenCalledWith(expect.objectContaining(eventoAgenda));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEventoAgenda>>();
      const eventoAgenda = { id: 123 };
      jest.spyOn(eventoAgendaFormService, 'getEventoAgenda').mockReturnValue({ id: null });
      jest.spyOn(eventoAgendaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ eventoAgenda: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: eventoAgenda }));
      saveSubject.complete();

      // THEN
      expect(eventoAgendaFormService.getEventoAgenda).toHaveBeenCalled();
      expect(eventoAgendaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEventoAgenda>>();
      const eventoAgenda = { id: 123 };
      jest.spyOn(eventoAgendaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ eventoAgenda });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(eventoAgendaService.update).toHaveBeenCalled();
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
