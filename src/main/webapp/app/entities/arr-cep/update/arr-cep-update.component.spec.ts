import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ArrCepFormService } from './arr-cep-form.service';
import { ArrCepService } from '../service/arr-cep.service';
import { IArrCep } from '../arr-cep.model';

import { ArrCepUpdateComponent } from './arr-cep-update.component';

describe('ArrCep Management Update Component', () => {
  let comp: ArrCepUpdateComponent;
  let fixture: ComponentFixture<ArrCepUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let arrCepFormService: ArrCepFormService;
  let arrCepService: ArrCepService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ArrCepUpdateComponent],
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
      .overrideTemplate(ArrCepUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ArrCepUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    arrCepFormService = TestBed.inject(ArrCepFormService);
    arrCepService = TestBed.inject(ArrCepService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const arrCep: IArrCep = { id: 456 };

      activatedRoute.data = of({ arrCep });
      comp.ngOnInit();

      expect(comp.arrCep).toEqual(arrCep);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IArrCep>>();
      const arrCep = { id: 123 };
      jest.spyOn(arrCepFormService, 'getArrCep').mockReturnValue(arrCep);
      jest.spyOn(arrCepService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ arrCep });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: arrCep }));
      saveSubject.complete();

      // THEN
      expect(arrCepFormService.getArrCep).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(arrCepService.update).toHaveBeenCalledWith(expect.objectContaining(arrCep));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IArrCep>>();
      const arrCep = { id: 123 };
      jest.spyOn(arrCepFormService, 'getArrCep').mockReturnValue({ id: null });
      jest.spyOn(arrCepService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ arrCep: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: arrCep }));
      saveSubject.complete();

      // THEN
      expect(arrCepFormService.getArrCep).toHaveBeenCalled();
      expect(arrCepService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IArrCep>>();
      const arrCep = { id: 123 };
      jest.spyOn(arrCepService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ arrCep });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(arrCepService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
