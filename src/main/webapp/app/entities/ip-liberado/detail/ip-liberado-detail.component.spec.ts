import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IpLiberadoDetailComponent } from './ip-liberado-detail.component';

describe('IpLiberado Management Detail Component', () => {
  let comp: IpLiberadoDetailComponent;
  let fixture: ComponentFixture<IpLiberadoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IpLiberadoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ ipLiberado: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(IpLiberadoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(IpLiberadoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load ipLiberado on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.ipLiberado).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
