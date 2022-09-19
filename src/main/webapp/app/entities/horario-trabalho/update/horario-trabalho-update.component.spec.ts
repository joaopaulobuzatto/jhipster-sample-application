import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { HorarioTrabalhoFormService } from './horario-trabalho-form.service';
import { HorarioTrabalhoService } from '../service/horario-trabalho.service';
import { IHorarioTrabalho } from '../horario-trabalho.model';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

import { HorarioTrabalhoUpdateComponent } from './horario-trabalho-update.component';

describe('HorarioTrabalho Management Update Component', () => {
  let comp: HorarioTrabalhoUpdateComponent;
  let fixture: ComponentFixture<HorarioTrabalhoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let horarioTrabalhoFormService: HorarioTrabalhoFormService;
  let horarioTrabalhoService: HorarioTrabalhoService;
  let licencaService: LicencaService;
  let usuarioService: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [HorarioTrabalhoUpdateComponent],
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
      .overrideTemplate(HorarioTrabalhoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HorarioTrabalhoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    horarioTrabalhoFormService = TestBed.inject(HorarioTrabalhoFormService);
    horarioTrabalhoService = TestBed.inject(HorarioTrabalhoService);
    licencaService = TestBed.inject(LicencaService);
    usuarioService = TestBed.inject(UsuarioService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Licenca query and add missing value', () => {
      const horarioTrabalho: IHorarioTrabalho = { id: 456 };
      const licenca: ILicenca = { id: 9837 };
      horarioTrabalho.licenca = licenca;

      const licencaCollection: ILicenca[] = [{ id: 38339 }];
      jest.spyOn(licencaService, 'query').mockReturnValue(of(new HttpResponse({ body: licencaCollection })));
      const additionalLicencas = [licenca];
      const expectedCollection: ILicenca[] = [...additionalLicencas, ...licencaCollection];
      jest.spyOn(licencaService, 'addLicencaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ horarioTrabalho });
      comp.ngOnInit();

      expect(licencaService.query).toHaveBeenCalled();
      expect(licencaService.addLicencaToCollectionIfMissing).toHaveBeenCalledWith(
        licencaCollection,
        ...additionalLicencas.map(expect.objectContaining)
      );
      expect(comp.licencasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const horarioTrabalho: IHorarioTrabalho = { id: 456 };
      const usuarioCriador: IUsuario = { id: 88230 };
      horarioTrabalho.usuarioCriador = usuarioCriador;

      const usuarioCollection: IUsuario[] = [{ id: 80733 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [usuarioCriador];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ horarioTrabalho });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const horarioTrabalho: IHorarioTrabalho = { id: 456 };
      const licenca: ILicenca = { id: 43371 };
      horarioTrabalho.licenca = licenca;
      const usuarioCriador: IUsuario = { id: 17783 };
      horarioTrabalho.usuarioCriador = usuarioCriador;

      activatedRoute.data = of({ horarioTrabalho });
      comp.ngOnInit();

      expect(comp.licencasSharedCollection).toContain(licenca);
      expect(comp.usuariosSharedCollection).toContain(usuarioCriador);
      expect(comp.horarioTrabalho).toEqual(horarioTrabalho);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHorarioTrabalho>>();
      const horarioTrabalho = { id: 123 };
      jest.spyOn(horarioTrabalhoFormService, 'getHorarioTrabalho').mockReturnValue(horarioTrabalho);
      jest.spyOn(horarioTrabalhoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ horarioTrabalho });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: horarioTrabalho }));
      saveSubject.complete();

      // THEN
      expect(horarioTrabalhoFormService.getHorarioTrabalho).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(horarioTrabalhoService.update).toHaveBeenCalledWith(expect.objectContaining(horarioTrabalho));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHorarioTrabalho>>();
      const horarioTrabalho = { id: 123 };
      jest.spyOn(horarioTrabalhoFormService, 'getHorarioTrabalho').mockReturnValue({ id: null });
      jest.spyOn(horarioTrabalhoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ horarioTrabalho: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: horarioTrabalho }));
      saveSubject.complete();

      // THEN
      expect(horarioTrabalhoFormService.getHorarioTrabalho).toHaveBeenCalled();
      expect(horarioTrabalhoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHorarioTrabalho>>();
      const horarioTrabalho = { id: 123 };
      jest.spyOn(horarioTrabalhoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ horarioTrabalho });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(horarioTrabalhoService.update).toHaveBeenCalled();
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
