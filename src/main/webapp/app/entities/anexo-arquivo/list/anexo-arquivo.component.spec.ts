import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AnexoArquivoService } from '../service/anexo-arquivo.service';

import { AnexoArquivoComponent } from './anexo-arquivo.component';

describe('AnexoArquivo Management Component', () => {
  let comp: AnexoArquivoComponent;
  let fixture: ComponentFixture<AnexoArquivoComponent>;
  let service: AnexoArquivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'anexo-arquivo', component: AnexoArquivoComponent }]), HttpClientTestingModule],
      declarations: [AnexoArquivoComponent],
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
      .overrideTemplate(AnexoArquivoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AnexoArquivoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AnexoArquivoService);

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
    expect(comp.anexoArquivos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to anexoArquivoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getAnexoArquivoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getAnexoArquivoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
