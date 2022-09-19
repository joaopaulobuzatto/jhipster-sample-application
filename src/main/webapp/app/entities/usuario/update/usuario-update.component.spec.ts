import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UsuarioFormService } from './usuario-form.service';
import { UsuarioService } from '../service/usuario.service';
import { IUsuario } from '../usuario.model';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IPessoaFisica } from 'app/entities/pessoa-fisica/pessoa-fisica.model';
import { PessoaFisicaService } from 'app/entities/pessoa-fisica/service/pessoa-fisica.service';
import { IHorarioTrabalho } from 'app/entities/horario-trabalho/horario-trabalho.model';
import { HorarioTrabalhoService } from 'app/entities/horario-trabalho/service/horario-trabalho.service';

import { UsuarioUpdateComponent } from './usuario-update.component';

describe('Usuario Management Update Component', () => {
  let comp: UsuarioUpdateComponent;
  let fixture: ComponentFixture<UsuarioUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let usuarioFormService: UsuarioFormService;
  let usuarioService: UsuarioService;
  let licencaService: LicencaService;
  let pessoaFisicaService: PessoaFisicaService;
  let horarioTrabalhoService: HorarioTrabalhoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UsuarioUpdateComponent],
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
      .overrideTemplate(UsuarioUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UsuarioUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    usuarioFormService = TestBed.inject(UsuarioFormService);
    usuarioService = TestBed.inject(UsuarioService);
    licencaService = TestBed.inject(LicencaService);
    pessoaFisicaService = TestBed.inject(PessoaFisicaService);
    horarioTrabalhoService = TestBed.inject(HorarioTrabalhoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Licenca query and add missing value', () => {
      const usuario: IUsuario = { id: 456 };
      const licenca: ILicenca = { id: 61936 };
      usuario.licenca = licenca;

      const licencaCollection: ILicenca[] = [{ id: 18060 }];
      jest.spyOn(licencaService, 'query').mockReturnValue(of(new HttpResponse({ body: licencaCollection })));
      const additionalLicencas = [licenca];
      const expectedCollection: ILicenca[] = [...additionalLicencas, ...licencaCollection];
      jest.spyOn(licencaService, 'addLicencaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuario });
      comp.ngOnInit();

      expect(licencaService.query).toHaveBeenCalled();
      expect(licencaService.addLicencaToCollectionIfMissing).toHaveBeenCalledWith(
        licencaCollection,
        ...additionalLicencas.map(expect.objectContaining)
      );
      expect(comp.licencasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Usuario query and add missing value', () => {
      const usuario: IUsuario = { id: 456 };
      const supervisor: IUsuario = { id: 67948 };
      usuario.supervisor = supervisor;
      const usuarioCriador: IUsuario = { id: 28635 };
      usuario.usuarioCriador = usuarioCriador;

      const usuarioCollection: IUsuario[] = [{ id: 9832 }];
      jest.spyOn(usuarioService, 'query').mockReturnValue(of(new HttpResponse({ body: usuarioCollection })));
      const additionalUsuarios = [supervisor, usuarioCriador];
      const expectedCollection: IUsuario[] = [...additionalUsuarios, ...usuarioCollection];
      jest.spyOn(usuarioService, 'addUsuarioToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuario });
      comp.ngOnInit();

      expect(usuarioService.query).toHaveBeenCalled();
      expect(usuarioService.addUsuarioToCollectionIfMissing).toHaveBeenCalledWith(
        usuarioCollection,
        ...additionalUsuarios.map(expect.objectContaining)
      );
      expect(comp.usuariosSharedCollection).toEqual(expectedCollection);
    });

    it('Should call PessoaFisica query and add missing value', () => {
      const usuario: IUsuario = { id: 456 };
      const pessoaFisica: IPessoaFisica = { id: 37499 };
      usuario.pessoaFisica = pessoaFisica;

      const pessoaFisicaCollection: IPessoaFisica[] = [{ id: 38946 }];
      jest.spyOn(pessoaFisicaService, 'query').mockReturnValue(of(new HttpResponse({ body: pessoaFisicaCollection })));
      const additionalPessoaFisicas = [pessoaFisica];
      const expectedCollection: IPessoaFisica[] = [...additionalPessoaFisicas, ...pessoaFisicaCollection];
      jest.spyOn(pessoaFisicaService, 'addPessoaFisicaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuario });
      comp.ngOnInit();

      expect(pessoaFisicaService.query).toHaveBeenCalled();
      expect(pessoaFisicaService.addPessoaFisicaToCollectionIfMissing).toHaveBeenCalledWith(
        pessoaFisicaCollection,
        ...additionalPessoaFisicas.map(expect.objectContaining)
      );
      expect(comp.pessoaFisicasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call HorarioTrabalho query and add missing value', () => {
      const usuario: IUsuario = { id: 456 };
      const horarioTrabalho: IHorarioTrabalho = { id: 27217 };
      usuario.horarioTrabalho = horarioTrabalho;

      const horarioTrabalhoCollection: IHorarioTrabalho[] = [{ id: 13106 }];
      jest.spyOn(horarioTrabalhoService, 'query').mockReturnValue(of(new HttpResponse({ body: horarioTrabalhoCollection })));
      const additionalHorarioTrabalhos = [horarioTrabalho];
      const expectedCollection: IHorarioTrabalho[] = [...additionalHorarioTrabalhos, ...horarioTrabalhoCollection];
      jest.spyOn(horarioTrabalhoService, 'addHorarioTrabalhoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ usuario });
      comp.ngOnInit();

      expect(horarioTrabalhoService.query).toHaveBeenCalled();
      expect(horarioTrabalhoService.addHorarioTrabalhoToCollectionIfMissing).toHaveBeenCalledWith(
        horarioTrabalhoCollection,
        ...additionalHorarioTrabalhos.map(expect.objectContaining)
      );
      expect(comp.horarioTrabalhosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const usuario: IUsuario = { id: 456 };
      const licenca: ILicenca = { id: 39388 };
      usuario.licenca = licenca;
      const supervisor: IUsuario = { id: 20733 };
      usuario.supervisor = supervisor;
      const usuarioCriador: IUsuario = { id: 52025 };
      usuario.usuarioCriador = usuarioCriador;
      const pessoaFisica: IPessoaFisica = { id: 52024 };
      usuario.pessoaFisica = pessoaFisica;
      const horarioTrabalho: IHorarioTrabalho = { id: 91763 };
      usuario.horarioTrabalho = horarioTrabalho;

      activatedRoute.data = of({ usuario });
      comp.ngOnInit();

      expect(comp.licencasSharedCollection).toContain(licenca);
      expect(comp.usuariosSharedCollection).toContain(supervisor);
      expect(comp.usuariosSharedCollection).toContain(usuarioCriador);
      expect(comp.pessoaFisicasSharedCollection).toContain(pessoaFisica);
      expect(comp.horarioTrabalhosSharedCollection).toContain(horarioTrabalho);
      expect(comp.usuario).toEqual(usuario);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuario>>();
      const usuario = { id: 123 };
      jest.spyOn(usuarioFormService, 'getUsuario').mockReturnValue(usuario);
      jest.spyOn(usuarioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuario });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usuario }));
      saveSubject.complete();

      // THEN
      expect(usuarioFormService.getUsuario).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(usuarioService.update).toHaveBeenCalledWith(expect.objectContaining(usuario));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuario>>();
      const usuario = { id: 123 };
      jest.spyOn(usuarioFormService, 'getUsuario').mockReturnValue({ id: null });
      jest.spyOn(usuarioService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuario: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: usuario }));
      saveSubject.complete();

      // THEN
      expect(usuarioFormService.getUsuario).toHaveBeenCalled();
      expect(usuarioService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUsuario>>();
      const usuario = { id: 123 };
      jest.spyOn(usuarioService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ usuario });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(usuarioService.update).toHaveBeenCalled();
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

    describe('comparePessoaFisica', () => {
      it('Should forward to pessoaFisicaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(pessoaFisicaService, 'comparePessoaFisica');
        comp.comparePessoaFisica(entity, entity2);
        expect(pessoaFisicaService.comparePessoaFisica).toHaveBeenCalledWith(entity, entity2);
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
