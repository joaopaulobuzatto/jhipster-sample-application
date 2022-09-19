import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DetentorAnexoArquivoService } from '../service/detentor-anexo-arquivo.service';

import { DetentorAnexoArquivoComponent } from './detentor-anexo-arquivo.component';

describe('DetentorAnexoArquivo Management Component', () => {
  let comp: DetentorAnexoArquivoComponent;
  let fixture: ComponentFixture<DetentorAnexoArquivoComponent>;
  let service: DetentorAnexoArquivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'detentor-anexo-arquivo', component: DetentorAnexoArquivoComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [DetentorAnexoArquivoComponent],
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
      .overrideTemplate(DetentorAnexoArquivoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DetentorAnexoArquivoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DetentorAnexoArquivoService);

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
    expect(comp.detentorAnexoArquivos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to detentorAnexoArquivoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getDetentorAnexoArquivoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getDetentorAnexoArquivoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
