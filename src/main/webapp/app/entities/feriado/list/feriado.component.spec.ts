import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FeriadoService } from '../service/feriado.service';

import { FeriadoComponent } from './feriado.component';

describe('Feriado Management Component', () => {
  let comp: FeriadoComponent;
  let fixture: ComponentFixture<FeriadoComponent>;
  let service: FeriadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'feriado', component: FeriadoComponent }]), HttpClientTestingModule],
      declarations: [FeriadoComponent],
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
      .overrideTemplate(FeriadoComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FeriadoComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FeriadoService);

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
    expect(comp.feriados?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to feriadoService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getFeriadoIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getFeriadoIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
