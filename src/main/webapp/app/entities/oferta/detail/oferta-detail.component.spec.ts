import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OfertaDetailComponent } from './oferta-detail.component';

describe('Oferta Management Detail Component', () => {
  let comp: OfertaDetailComponent;
  let fixture: ComponentFixture<OfertaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfertaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ oferta: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(OfertaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(OfertaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load oferta on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.oferta).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
