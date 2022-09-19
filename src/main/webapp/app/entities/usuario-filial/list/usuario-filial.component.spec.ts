import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { UsuarioFilialService } from '../service/usuario-filial.service';

import { UsuarioFilialComponent } from './usuario-filial.component';

describe('UsuarioFilial Management Component', () => {
  let comp: UsuarioFilialComponent;
  let fixture: ComponentFixture<UsuarioFilialComponent>;
  let service: UsuarioFilialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'usuario-filial', component: UsuarioFilialComponent }]), HttpClientTestingModule],
      declarations: [UsuarioFilialComponent],
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
      .overrideTemplate(UsuarioFilialComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UsuarioFilialComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(UsuarioFilialService);

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
    expect(comp.usuarioFilials?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to usuarioFilialService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getUsuarioFilialIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getUsuarioFilialIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
