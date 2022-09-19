import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { UsuarioIpLiberadoService } from '../service/usuario-ip-liberado.service';

import { UsuarioIpLiberadoComponent } from './usuario-ip-liberado.component';

describe('UsuarioIpLiberado Management Component', () => {
  let comp: UsuarioIpLiberadoComponent;
  let fixture: ComponentFixture<UsuarioIpLiberadoComponent>;
  let service: UsuarioIpLiberadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'usuario-ip-liberado', component: UsuarioIpLiberadoComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [UsuarioIpLiberadoComponent],
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
      .overrideTemplate(UsuarioIpLiberadoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UsuarioIpLiberadoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(UsuarioIpLiberadoService);

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
    expect(comp.usuarioIpLiberados?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to usuarioIpLiberadoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getUsuarioIpLiberadoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getUsuarioIpLiberadoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
