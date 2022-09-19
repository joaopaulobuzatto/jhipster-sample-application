import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ArrCepDetailComponent } from './arr-cep-detail.component';

describe('ArrCep Management Detail Component', () => {
  let comp: ArrCepDetailComponent;
  let fixture: ComponentFixture<ArrCepDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArrCepDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ arrCep: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ArrCepDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ArrCepDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load arrCep on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.arrCep).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
