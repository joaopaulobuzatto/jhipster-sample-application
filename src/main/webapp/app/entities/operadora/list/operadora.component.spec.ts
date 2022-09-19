import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OperadoraService } from '../service/operadora.service';

import { OperadoraComponent } from './operadora.component';

describe('Operadora Management Component', () => {
  let comp: OperadoraComponent;
  let fixture: ComponentFixture<OperadoraComponent>;
  let service: OperadoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'operadora', component: OperadoraComponent }]), HttpClientTestingModule],
      declarations: [OperadoraComponent],
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
      .overrideTemplate(OperadoraComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(OperadoraComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(OperadoraService);

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
    expect(comp.operadoras?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to operadoraService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getOperadoraIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getOperadoraIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
