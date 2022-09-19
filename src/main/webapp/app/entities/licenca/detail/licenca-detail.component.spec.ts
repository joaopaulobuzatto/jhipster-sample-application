import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LicencaDetailComponent } from './licenca-detail.component';

describe('Licenca Management Detail Component', () => {
  let comp: LicencaDetailComponent;
  let fixture: ComponentFixture<LicencaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicencaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ licenca: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(LicencaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(LicencaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load licenca on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.licenca).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
