import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OrigemDetailComponent } from './origem-detail.component';

describe('Origem Management Detail Component', () => {
  let comp: OrigemDetailComponent;
  let fixture: ComponentFixture<OrigemDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrigemDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ origem: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(OrigemDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(OrigemDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load origem on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.origem).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
