import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OperadoraDetailComponent } from './operadora-detail.component';

describe('Operadora Management Detail Component', () => {
  let comp: OperadoraDetailComponent;
  let fixture: ComponentFixture<OperadoraDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperadoraDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ operadora: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(OperadoraDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(OperadoraDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load operadora on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.operadora).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
