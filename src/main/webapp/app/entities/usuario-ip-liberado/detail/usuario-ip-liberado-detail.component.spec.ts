import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UsuarioIpLiberadoDetailComponent } from './usuario-ip-liberado-detail.component';

describe('UsuarioIpLiberado Management Detail Component', () => {
  let comp: UsuarioIpLiberadoDetailComponent;
  let fixture: ComponentFixture<UsuarioIpLiberadoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioIpLiberadoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ usuarioIpLiberado: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(UsuarioIpLiberadoDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(UsuarioIpLiberadoDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load usuarioIpLiberado on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.usuarioIpLiberado).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
