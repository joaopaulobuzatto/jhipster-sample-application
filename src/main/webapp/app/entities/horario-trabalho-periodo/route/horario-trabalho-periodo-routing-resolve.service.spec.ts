import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IHorarioTrabalhoPeriodo } from '../horario-trabalho-periodo.model';
import { HorarioTrabalhoPeriodoService } from '../service/horario-trabalho-periodo.service';

import { HorarioTrabalhoPeriodoRoutingResolveService } from './horario-trabalho-periodo-routing-resolve.service';

describe('HorarioTrabalhoPeriodo routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: HorarioTrabalhoPeriodoRoutingResolveService;
  let service: HorarioTrabalhoPeriodoService;
  let resultHorarioTrabalhoPeriodo: IHorarioTrabalhoPeriodo | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(HorarioTrabalhoPeriodoRoutingResolveService);
    service = TestBed.inject(HorarioTrabalhoPeriodoService);
    resultHorarioTrabalhoPeriodo = undefined;
  });

  describe('resolve', () => {
    it('should return IHorarioTrabalhoPeriodo returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHorarioTrabalhoPeriodo = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultHorarioTrabalhoPeriodo).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHorarioTrabalhoPeriodo = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultHorarioTrabalhoPeriodo).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IHorarioTrabalhoPeriodo>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHorarioTrabalhoPeriodo = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultHorarioTrabalhoPeriodo).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
