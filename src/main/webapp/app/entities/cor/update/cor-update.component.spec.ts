import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CorFormService } from './cor-form.service';
import { CorService } from '../service/cor.service';
import { ICor } from '../cor.model';

import { CorUpdateComponent } from './cor-update.component';

describe('Cor Management Update Component', () => {
  let comp: CorUpdateComponent;
  let fixture: ComponentFixture<CorUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let corFormService: CorFormService;
  let corService: CorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CorUpdateComponent],
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
      .overrideTemplate(CorUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CorUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    corFormService = TestBed.inject(CorFormService);
    corService = TestBed.inject(CorService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cor: ICor = { id: 456 };

      activatedRoute.data = of({ cor });
      comp.ngOnInit();

      expect(comp.cor).toEqual(cor);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICor>>();
      const cor = { id: 123 };
      jest.spyOn(corFormService, 'getCor').mockReturnValue(cor);
      jest.spyOn(corService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cor });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cor }));
      saveSubject.complete();

      // THEN
      expect(corFormService.getCor).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(corService.update).toHaveBeenCalledWith(expect.objectContaining(cor));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICor>>();
      const cor = { id: 123 };
      jest.spyOn(corFormService, 'getCor').mockReturnValue({ id: null });
      jest.spyOn(corService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cor: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cor }));
      saveSubject.complete();

      // THEN
      expect(corFormService.getCor).toHaveBeenCalled();
      expect(corService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICor>>();
      const cor = { id: 123 };
      jest.spyOn(corService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cor });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(corService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
