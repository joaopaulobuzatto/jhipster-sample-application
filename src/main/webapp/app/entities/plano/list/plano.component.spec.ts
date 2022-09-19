import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PlanoService } from '../service/plano.service';

import { PlanoComponent } from './plano.component';

describe('Plano Management Component', () => {
  let comp: PlanoComponent;
  let fixture: ComponentFixture<PlanoComponent>;
  let service: PlanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'plano', component: PlanoComponent }]), HttpClientTestingModule],
      declarations: [PlanoComponent],
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
      .overrideTemplate(PlanoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PlanoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PlanoService);

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
    expect(comp.planos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to planoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getPlanoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getPlanoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
