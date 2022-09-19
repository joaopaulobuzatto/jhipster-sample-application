import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UsuarioGrupoPermissoesDetailComponent } from './usuario-grupo-permissoes-detail.component';

describe('UsuarioGrupoPermissoes Management Detail Component', () => {
  let comp: UsuarioGrupoPermissoesDetailComponent;
  let fixture: ComponentFixture<UsuarioGrupoPermissoesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioGrupoPermissoesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ usuarioGrupoPermissoes: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(UsuarioGrupoPermissoesDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(UsuarioGrupoPermissoesDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load usuarioGrupoPermissoes on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.usuarioGrupoPermissoes).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
