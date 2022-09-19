import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ServicoService } from '../service/servico.service';

import { ServicoComponent } from './servico.component';

describe('Servico Management Component', () => {
  let comp: ServicoComponent;
  let fixture: ComponentFixture<ServicoComponent>;
  let service: ServicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'servico', component: ServicoComponent }]), HttpClientTestingModule],
      declarations: [ServicoComponent],
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
      .overrideTemplate(ServicoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ServicoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ServicoService);

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
    expect(comp.servicos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to servicoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getServicoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getServicoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
