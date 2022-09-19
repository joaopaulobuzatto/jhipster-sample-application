import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IpLiberadoService } from '../service/ip-liberado.service';

import { IpLiberadoComponent } from './ip-liberado.component';

describe('IpLiberado Management Component', () => {
  let comp: IpLiberadoComponent;
  let fixture: ComponentFixture<IpLiberadoComponent>;
  let service: IpLiberadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'ip-liberado', component: IpLiberadoComponent }]), HttpClientTestingModule],
      declarations: [IpLiberadoComponent],
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
      .overrideTemplate(IpLiberadoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(IpLiberadoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(IpLiberadoService);

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
    expect(comp.ipLiberados?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to ipLiberadoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getIpLiberadoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getIpLiberadoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
