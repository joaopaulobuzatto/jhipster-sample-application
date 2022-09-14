import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IHorarioTrabalho } from '../horario-trabalho.model';
import { HorarioTrabalhoService } from '../service/horario-trabalho.service';

import { HorarioTrabalhoRoutingResolveService } from './horario-trabalho-routing-resolve.service';

describe('HorarioTrabalho routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: HorarioTrabalhoRoutingResolveService;
  let service: HorarioTrabalhoService;
  let resultHorarioTrabalho: IHorarioTrabalho | null | undefined;

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
    routingResolveService = TestBed.inject(HorarioTrabalhoRoutingResolveService);
    service = TestBed.inject(HorarioTrabalhoService);
    resultHorarioTrabalho = undefined;
  });

  describe('resolve', () => {
    it('should return IHorarioTrabalho returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHorarioTrabalho = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultHorarioTrabalho).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHorarioTrabalho = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultHorarioTrabalho).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IHorarioTrabalho>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHorarioTrabalho = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultHorarioTrabalho).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
