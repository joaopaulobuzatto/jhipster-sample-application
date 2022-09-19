import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TipoDeDocumentoAnexavelService } from '../service/tipo-de-documento-anexavel.service';

import { TipoDeDocumentoAnexavelComponent } from './tipo-de-documento-anexavel.component';

describe('TipoDeDocumentoAnexavel Management Component', () => {
  let comp: TipoDeDocumentoAnexavelComponent;
  let fixture: ComponentFixture<TipoDeDocumentoAnexavelComponent>;
  let service: TipoDeDocumentoAnexavelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'tipo-de-documento-anexavel', component: TipoDeDocumentoAnexavelComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [TipoDeDocumentoAnexavelComponent],
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
      .overrideTemplate(TipoDeDocumentoAnexavelComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TipoDeDocumentoAnexavelComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TipoDeDocumentoAnexavelService);

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
    expect(comp.tipoDeDocumentoAnexavels?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to tipoDeDocumentoAnexavelService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTipoDeDocumentoAnexavelIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getTipoDeDocumentoAnexavelIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
