import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OfertaServicoService } from '../service/oferta-servico.service';

import { OfertaServicoComponent } from './oferta-servico.component';

describe('OfertaServico Management Component', () => {
  let comp: OfertaServicoComponent;
  let fixture: ComponentFixture<OfertaServicoComponent>;
  let service: OfertaServicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'oferta-servico', component: OfertaServicoComponent }]), HttpClientTestingModule],
      declarations: [OfertaServicoComponent],
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
      .overrideTemplate(OfertaServicoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OfertaServicoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(OfertaServicoService);

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
    expect(comp.ofertaServicos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to ofertaServicoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getOfertaServicoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getOfertaServicoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
