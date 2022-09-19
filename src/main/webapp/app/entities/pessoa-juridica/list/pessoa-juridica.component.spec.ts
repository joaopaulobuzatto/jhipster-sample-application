import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PessoaJuridicaService } from '../service/pessoa-juridica.service';

import { PessoaJuridicaComponent } from './pessoa-juridica.component';

describe('PessoaJuridica Management Component', () => {
  let comp: PessoaJuridicaComponent;
  let fixture: ComponentFixture<PessoaJuridicaComponent>;
  let service: PessoaJuridicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'pessoa-juridica', component: PessoaJuridicaComponent }]), HttpClientTestingModule],
      declarations: [PessoaJuridicaComponent],
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
      .overrideTemplate(PessoaJuridicaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PessoaJuridicaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PessoaJuridicaService);

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
    expect(comp.pessoaJuridicas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to pessoaJuridicaService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getPessoaJuridicaIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getPessoaJuridicaIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
