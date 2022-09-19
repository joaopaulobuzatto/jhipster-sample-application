import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { UsuarioGrupoPermissoesService } from '../service/usuario-grupo-permissoes.service';

import { UsuarioGrupoPermissoesComponent } from './usuario-grupo-permissoes.component';

describe('UsuarioGrupoPermissoes Management Component', () => {
  let comp: UsuarioGrupoPermissoesComponent;
  let fixture: ComponentFixture<UsuarioGrupoPermissoesComponent>;
  let service: UsuarioGrupoPermissoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'usuario-grupo-permissoes', component: UsuarioGrupoPermissoesComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [UsuarioGrupoPermissoesComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(UsuarioGrupoPermissoesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UsuarioGrupoPermissoesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(UsuarioGrupoPermissoesService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.usuarioGrupoPermissoes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to usuarioGrupoPermissoesService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getUsuarioGrupoPermissoesIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getUsuarioGrupoPermissoesIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
