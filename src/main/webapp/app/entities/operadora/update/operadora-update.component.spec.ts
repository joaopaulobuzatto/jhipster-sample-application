import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { OperadoraFormService } from './operadora-form.service';
import { OperadoraService } from '../service/operadora.service';
import { IOperadora } from '../operadora.model';

import { OperadoraUpdateComponent } from './operadora-update.component';

describe('Operadora Management Update Component', () => {
  let comp: OperadoraUpdateComponent;
  let fixture: ComponentFixture<OperadoraUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let operadoraFormService: OperadoraFormService;
  let operadoraService: OperadoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [OperadoraUpdateComponent],
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
      .overrideTemplate(OperadoraUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OperadoraUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    operadoraFormService = TestBed.inject(OperadoraFormService);
    operadoraService = TestBed.inject(OperadoraService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const operadora: IOperadora = { id: 456 };

      activatedRoute.data = of({ operadora });
      comp.ngOnInit();

      expect(comp.operadora).toEqual(operadora);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOperadora>>();
      const operadora = { id: 123 };
      jest.spyOn(operadoraFormService, 'getOperadora').mockReturnValue(operadora);
      jest.spyOn(operadoraService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ operadora });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: operadora }));
      saveSubject.complete();

      // THEN
      expect(operadoraFormService.getOperadora).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(operadoraService.update).toHaveBeenCalledWith(expect.objectContaining(operadora));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOperadora>>();
      const operadora = { id: 123 };
      jest.spyOn(operadoraFormService, 'getOperadora').mockReturnValue({ id: null });
      jest.spyOn(operadoraService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ operadora: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: operadora }));
      saveSubject.complete();

      // THEN
      expect(operadoraFormService.getOperadora).toHaveBeenCalled();
      expect(operadoraService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOperadora>>();
      const operadora = { id: 123 };
      jest.spyOn(operadoraService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ operadora });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(operadoraService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
