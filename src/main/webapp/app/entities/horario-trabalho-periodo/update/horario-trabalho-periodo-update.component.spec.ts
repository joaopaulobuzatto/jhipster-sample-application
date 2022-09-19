import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { HorarioTrabalhoPeriodoFormService } from './horario-trabalho-periodo-form.service';
import { HorarioTrabalhoPeriodoService } from '../service/horario-trabalho-periodo.service';
import { IHorarioTrabalhoPeriodo } from '../horario-trabalho-periodo.model';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IHorarioTrabalho } from 'app/entities/horario-trabalho/horario-trabalho.model';
import { HorarioTrabalhoService } from 'app/entities/horario-trabalho/service/horario-trabalho.service';

import { HorarioTrabalhoPeriodoUpdateComponent } from './horario-trabalho-periodo-update.component';

describe('HorarioTrabalhoPeriodo Management Update Component', () => {
  let comp: HorarioTrabalhoPeriodoUpdateComponent;
  let fixture: ComponentFixture<HorarioTrabalhoPeriodoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let horarioTrabalhoPeriodoFormService: HorarioTrabalhoPeriodoFormService;
  let horarioTrabalhoPeriodoService: HorarioTrabalhoPeriodoService;
  let licencaService: LicencaService;
  let usuarioService: UsuarioService;
  let horarioTrabalhoService: HorarioTrabalhoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [HorarioTrabalhoPeriodoUpdateComponent],
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
      .overrideTemplate(HorarioTrabalhoPeriodoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HorarioTrabalhoPeriodoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    horarioTrabalhoPeriodoFormService = TestBed.inject(HorarioTrabalhoPeriodoFormService);
    horarioTrabalhoPeriodoService = TestBed.inject(HorarioTrabalhoPeriodoService);
    licencaService = TestBed.inject(LicencaService);
    usuarioService = TestBed.inject(UsuarioService);
    horarioTrabalhoService = TestBed.inject(HorarioTrabalhoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Licenca query and add missing value', () => {
      const horarioTrabalhoPeriodo: IHorarioTrabalhoPeriodo = { id: 456 };
      const licenca: ILicenca = { id: 27002 };
      horarioTrabalhoPeriodo.licenca = licenca;

      const licencaCollection: ILicenca[] = [{ id: 55268 }];
      jest.spyOn(licencaService, 'query').mockReturnValue(of(new HttpResponse({ body: licencaCollection })));
      const additionalLicencas = [licenca];
      const expectedCollection: ILicenca[] = [...additionalLicencas, ...licencaCollection];
      jest.spyOn(licencaService, 'addLicencaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ horarioTrabalhoPeriodo });
      comp.ngOnInit();

      expect(licencaService.query).toHaveBeenCalled();
      expect(licencaService.addLicencaToCollectionIfMissing).toHaveBeenCalledWith(
        licencaCollection,
        ...additionalLicencas.map(expect.objectContaining)
      );
      expect(comp.licencasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const horarioTrabalhoPeriodo: IHorarioTrabalhoPeriodo = { id: 456 };
      const usuarioCriador: IUsuario = { id: 18452 };
      horarioTrabalhoPeriodo.usuarioCriador = usuarioCriador;

      const usuarioCollection: IUsuario[] = [{ id: 77769 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuarioCriador];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ horarioTrabalhoPeriodo });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call HorarioTrabalho query and add missing value', () => {
      const horarioTrabalhoPeriodo: IHorarioTrabalhoPeriodo = { id: 456 };
      const horarioTrabalho: IHorarioTrabalho = { id: 32247 };
      horarioTrabalhoPeriodo.horarioTrabalho = horarioTrabalho;

      const horarioTrabalhoCollection: IHorarioTrabalho[] = [{ id: 72434 }];
      jest.spyOn(horarioTrabalhoService, 'query').mockReturnValue(of(new HttpResponse({ body: horarioTrabalhoCollection })));
      const additionalHorarioTrabalhos = [horarioTrabalho];
      const expectedCollection: IHorarioTrabalho[] = [...additionalHorarioTrabalhos, ...horarioTrabalhoCollection];
      jest.spyOn(horarioTrabalhoService, 'addHorarioTrabalhoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ horarioTrabalhoPeriodo });
      comp.ngOnInit();

      expect(horarioTrabalhoService.query).toHaveBeenCalled();
      expect(horarioTrabalhoService.addHorarioTrabalhoToCollectionIfMissing).toHaveBeenCalledWith(
        horarioTrabalhoCollection,
        ...additionalHorarioTrabalhos.map(expect.objectContaining)
      );
      expect(comp.horarioTrabalhosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const horarioTrabalhoPeriodo: IHorarioTrabalhoPeriodo = { id: 456 };
      const licenca: ILicenca = { id: 92617 };
      horarioTrabalhoPeriodo.licenca = licenca;
      const usuarioCriador: IUsuario = { id: 81842 };
      horarioTrabalhoPeriodo.usuarioCriador = usuarioCriador;
      const horarioTrabalho: IHorarioTrabalho = { id: 86151 };
      horarioTrabalhoPeriodo.horarioTrabalho = horarioTrabalho;

      activatedRoute.data = of({ horarioTrabalhoPeriodo });
      comp.ngOnInit();

      expect(comp.licencasSharedCollection).toContain(licenca);
      expect(comp.usuariosSharedCollection).toContain(usuarioCriador);
      expect(comp.horarioTrabalhosSharedCollection).toContain(horarioTrabalho);
      expect(comp.horarioTrabalhoPeriodo).toEqual(horarioTrabalhoPeriodo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHorarioTrabalhoPeriodo>>();
      const horarioTrabalhoPeriodo = { id: 123 };
      jest.spyOn(horarioTrabalhoPeriodoFormService, 'getHorarioTrabalhoPeriodo').mockReturnValue(horarioTrabalhoPeriodo);
      jest.spyOn(horarioTrabalhoPeriodoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ horarioTrabalhoPeriodo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: horarioTrabalhoPeriodo }));
      saveSubject.complete();

      // THEN
      expect(horarioTrabalhoPeriodoFormService.getHorarioTrabalhoPeriodo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(horarioTrabalhoPeriodoService.update).toHaveBeenCalledWith(expect.objectContaining(horarioTrabalhoPeriodo));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHorarioTrabalhoPeriodo>>();
      const horarioTrabalhoPeriodo = { id: 123 };
      jest.spyOn(horarioTrabalhoPeriodoFormService, 'getHorarioTrabalhoPeriodo').mockReturnValue({ id: null });
      jest.spyOn(horarioTrabalhoPeriodoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ horarioTrabalhoPeriodo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: horarioTrabalhoPeriodo }));
      saveSubject.complete();

      // THEN
      expect(horarioTrabalhoPeriodoFormService.getHorarioTrabalhoPeriodo).toHaveBeenCalled();
      expect(horarioTrabalhoPeriodoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHorarioTrabalhoPeriodo>>();
      const horarioTrabalhoPeriodo = { id: 123 };
      jest.spyOn(horarioTrabalhoPeriodoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ horarioTrabalhoPeriodo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(horarioTrabalhoPeriodoService.update).toHaveBeenCalled();
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

    describe('compareHorarioTrabalho', () => {
      it('Should forward to horarioTrabalhoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(horarioTrabalhoService, 'compareHorarioTrabalho');
        comp.compareHorarioTrabalho(entity, entity2);
        expect(horarioTrabalhoService.compareHorarioTrabalho).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
