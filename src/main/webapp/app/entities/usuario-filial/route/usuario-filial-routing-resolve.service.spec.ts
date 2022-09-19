import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IUsuarioFilial } from '../usuario-filial.model';
import { UsuarioFilialService } from '../service/usuario-filial.service';

import { UsuarioFilialRoutingResolveService } from './usuario-filial-routing-resolve.service';

describe('UsuarioFilial routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: UsuarioFilialRoutingResolveService;
  let service: UsuarioFilialService;
  let resultUsuarioFilial: IUsuarioFilial | null | undefined;

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
    routingResolveService = TestBed.inject(UsuarioFilialRoutingResolveService);
    service = TestBed.inject(UsuarioFilialService);
    resultUsuarioFilial = undefined;
  });

  describe('resolve', () => {
    it('should return IUsuarioFilial returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUsuarioFilial = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultUsuarioFilial).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUsuarioFilial = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultUsuarioFilial).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IUsuarioFilial>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUsuarioFilial = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultUsuarioFilial).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
