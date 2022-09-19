import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OfertaServicoDetailComponent } from './oferta-servico-detail.component';

describe('OfertaServico Management Detail Component', () => {
  let comp: OfertaServicoDetailComponent;
  let fixture: ComponentFixture<OfertaServicoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfertaServicoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ ofertaServico: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(OfertaServicoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(OfertaServicoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load ofertaServico on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.ofertaServico).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
