import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OfertaService } from '../service/oferta.service';

import { OfertaComponent } from './oferta.component';

describe('Oferta Management Component', () => {
  let comp: OfertaComponent;
  let fixture: ComponentFixture<OfertaComponent>;
  let service: OfertaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'oferta', component: OfertaComponent }]), HttpClientTestingModule],
      declarations: [OfertaComponent],
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
      .overrideTemplate(OfertaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OfertaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(OfertaService);

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
    expect(comp.ofertas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to ofertaService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getOfertaIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getOfertaIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
