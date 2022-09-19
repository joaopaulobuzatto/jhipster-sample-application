import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CorDetailComponent } from './cor-detail.component';

describe('Cor Management Detail Component', () => {
  let comp: CorDetailComponent;
  let fixture: ComponentFixture<CorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ cor: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CorDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CorDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cor on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.cor).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
