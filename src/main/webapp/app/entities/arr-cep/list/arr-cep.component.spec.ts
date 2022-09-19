import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ArrCepService } from '../service/arr-cep.service';

import { ArrCepComponent } from './arr-cep.component';

describe('ArrCep Management Component', () => {
  let comp: ArrCepComponent;
  let fixture: ComponentFixture<ArrCepComponent>;
  let service: ArrCepService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'arr-cep', component: ArrCepComponent }]), HttpClientTestingModule],
      declarations: [ArrCepComponent],
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
      .overrideTemplate(ArrCepComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ArrCepComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ArrCepService);

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
    expect(comp.arrCeps?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to arrCepService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getArrCepIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getArrCepIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
