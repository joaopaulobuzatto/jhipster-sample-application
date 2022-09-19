import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PessoaFisicaService } from '../service/pessoa-fisica.service';

import { PessoaFisicaComponent } from './pessoa-fisica.component';

describe('PessoaFisica Management Component', () => {
  let comp: PessoaFisicaComponent;
  let fixture: ComponentFixture<PessoaFisicaComponent>;
  let service: PessoaFisicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'pessoa-fisica', component: PessoaFisicaComponent }]), HttpClientTestingModule],
      declarations: [PessoaFisicaComponent],
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
      .overrideTemplate(PessoaFisicaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PessoaFisicaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PessoaFisicaService);

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
    expect(comp.pessoaFisicas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to pessoaFisicaService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getPessoaFisicaIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getPessoaFisicaIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
