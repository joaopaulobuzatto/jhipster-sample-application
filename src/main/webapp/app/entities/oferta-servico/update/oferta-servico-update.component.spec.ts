import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { OfertaServicoFormService } from './oferta-servico-form.service';
import { OfertaServicoService } from '../service/oferta-servico.service';
import { IOfertaServico } from '../oferta-servico.model';
import { IOferta } from 'app/entities/oferta/oferta.model';
import { OfertaService } from 'app/entities/oferta/service/oferta.service';
import { IServico } from 'app/entities/servico/servico.model';
import { ServicoService } from 'app/entities/servico/service/servico.service';

import { OfertaServicoUpdateComponent } from './oferta-servico-update.component';

describe('OfertaServico Management Update Component', () => {
  let comp: OfertaServicoUpdateComponent;
  let fixture: ComponentFixture<OfertaServicoUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ofertaServicoFormService: OfertaServicoFormService;
  let ofertaServicoService: OfertaServicoService;
  let ofertaService: OfertaService;
  let servicoService: ServicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [OfertaServicoUpdateComponent],
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
      .overrideTemplate(OfertaServicoUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OfertaServicoUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ofertaServicoFormService = TestBed.inject(OfertaServicoFormService);
    ofertaServicoService = TestBed.inject(OfertaServicoService);
    ofertaService = TestBed.inject(OfertaService);
    servicoService = TestBed.inject(ServicoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Oferta query and add missing value', () => {
      const ofertaServico: IOfertaServico = { id: 456 };
      const oferta: IOferta = { id: 3584 };
      ofertaServico.oferta = oferta;

      const ofertaCollection: IOferta[] = [{ id: 45308 }];
      jest.spyOn(ofertaService, 'query').mockReturnValue(of(new HttpResponse({ body: ofertaCollection })));
      const additionalOfertas = [oferta];
      const expectedCollection: IOferta[] = [...additionalOfertas, ...ofertaCollection];
      jest.spyOn(ofertaService, 'addOfertaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ofertaServico });
      comp.ngOnInit();

      expect(ofertaService.query).toHaveBeenCalled();
      expect(ofertaService.addOfertaToCollectionIfMissing).toHaveBeenCalledWith(
        ofertaCollection,
        ...additionalOfertas.map(expect.objectContaining)
      );
      expect(comp.ofertasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Servico query and add missing value', () => {
      const ofertaServico: IOfertaServico = { id: 456 };
      const servico: IServico = { id: 21229 };
      ofertaServico.servico = servico;

      const servicoCollection: IServico[] = [{ id: 67398 }];
      jest.spyOn(servicoService, 'query').mockReturnValue(of(new HttpResponse({ body: servicoCollection })));
      const additionalServicos = [servico];
      const expectedCollection: IServico[] = [...additionalServicos, ...servicoCollection];
      jest.spyOn(servicoService, 'addServicoToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ofertaServico });
      comp.ngOnInit();

      expect(servicoService.query).toHaveBeenCalled();
      expect(servicoService.addServicoToCollectionIfMissing).toHaveBeenCalledWith(
        servicoCollection,
        ...additionalServicos.map(expect.objectContaining)
      );
      expect(comp.servicosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const ofertaServico: IOfertaServico = { id: 456 };
      const oferta: IOferta = { id: 32649 };
      ofertaServico.oferta = oferta;
      const servico: IServico = { id: 64855 };
      ofertaServico.servico = servico;

      activatedRoute.data = of({ ofertaServico });
      comp.ngOnInit();

      expect(comp.ofertasSharedCollection).toContain(oferta);
      expect(comp.servicosSharedCollection).toContain(servico);
      expect(comp.ofertaServico).toEqual(ofertaServico);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOfertaServico>>();
      const ofertaServico = { id: 123 };
      jest.spyOn(ofertaServicoFormService, 'getOfertaServico').mockReturnValue(ofertaServico);
      jest.spyOn(ofertaServicoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ofertaServico });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ofertaServico }));
      saveSubject.complete();

      // THEN
      expect(ofertaServicoFormService.getOfertaServico).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ofertaServicoService.update).toHaveBeenCalledWith(expect.objectContaining(ofertaServico));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOfertaServico>>();
      const ofertaServico = { id: 123 };
      jest.spyOn(ofertaServicoFormService, 'getOfertaServico').mockReturnValue({ id: null });
      jest.spyOn(ofertaServicoService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ofertaServico: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ofertaServico }));
      saveSubject.complete();

      // THEN
      expect(ofertaServicoFormService.getOfertaServico).toHaveBeenCalled();
      expect(ofertaServicoService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IOfertaServico>>();
      const ofertaServico = { id: 123 };
      jest.spyOn(ofertaServicoService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ofertaServico });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ofertaServicoService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareOferta', () => {
      it('Should forward to ofertaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(ofertaService, 'compareOferta');
        comp.compareOferta(entity, entity2);
        expect(ofertaService.compareOferta).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareServico', () => {
      it('Should forward to servicoService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(servicoService, 'compareServico');
        comp.compareServico(entity, entity2);
        expect(servicoService.compareServico).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
