import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AparelhoDetailComponent } from './aparelho-detail.component';

describe('Aparelho Management Detail Component', () => {
  let comp: AparelhoDetailComponent;
  let fixture: ComponentFixture<AparelhoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AparelhoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ aparelho: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(AparelhoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AparelhoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load aparelho on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.aparelho).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
