import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UsuarioFilialDetailComponent } from './usuario-filial-detail.component';

describe('UsuarioFilial Management Detail Component', () => {
  let comp: UsuarioFilialDetailComponent;
  let fixture: ComponentFixture<UsuarioFilialDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioFilialDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ usuarioFilial: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(UsuarioFilialDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(UsuarioFilialDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load usuarioFilial on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.usuarioFilial).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
