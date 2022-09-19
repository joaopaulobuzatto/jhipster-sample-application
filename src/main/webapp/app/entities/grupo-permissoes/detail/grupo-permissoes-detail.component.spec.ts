import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GrupoPermissoesDetailComponent } from './grupo-permissoes-detail.component';

describe('GrupoPermissoes Management Detail Component', () => {
  let comp: GrupoPermissoesDetailComponent;
  let fixture: ComponentFixture<GrupoPermissoesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrupoPermissoesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ grupoPermissoes: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(GrupoPermissoesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(GrupoPermissoesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load grupoPermissoes on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.grupoPermissoes).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
