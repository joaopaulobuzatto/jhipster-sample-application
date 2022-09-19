import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FilialService } from '../service/filial.service';

import { FilialComponent } from './filial.component';

describe('Filial Management Component', () => {
  let comp: FilialComponent;
  let fixture: ComponentFixture<FilialComponent>;
  let service: FilialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'filial', component: FilialComponent }]), HttpClientTestingModule],
      declarations: [FilialComponent],
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
      .overrideTemplate(FilialComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FilialComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FilialService);

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
    expect(comp.filials?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to filialService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getFilialIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getFilialIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
