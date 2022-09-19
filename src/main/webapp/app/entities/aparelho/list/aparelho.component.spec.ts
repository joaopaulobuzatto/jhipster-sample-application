import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AparelhoService } from '../service/aparelho.service';

import { AparelhoComponent } from './aparelho.component';

describe('Aparelho Management Component', () => {
  let comp: AparelhoComponent;
  let fixture: ComponentFixture<AparelhoComponent>;
  let service: AparelhoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'aparelho', component: AparelhoComponent }]), HttpClientTestingModule],
      declarations: [AparelhoComponent],
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
      .overrideTemplate(AparelhoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AparelhoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AparelhoService);

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
    expect(comp.aparelhos?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to aparelhoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getAparelhoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getAparelhoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
