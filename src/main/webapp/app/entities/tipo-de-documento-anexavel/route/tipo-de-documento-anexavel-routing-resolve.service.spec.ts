import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ITipoDeDocumentoAnexavel } from '../tipo-de-documento-anexavel.model';
import { TipoDeDocumentoAnexavelService } from '../service/tipo-de-documento-anexavel.service';

import { TipoDeDocumentoAnexavelRoutingResolveService } from './tipo-de-documento-anexavel-routing-resolve.service';

describe('TipoDeDocumentoAnexavel routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: TipoDeDocumentoAnexavelRoutingResolveService;
  let service: TipoDeDocumentoAnexavelService;
  let resultTipoDeDocumentoAnexavel: ITipoDeDocumentoAnexavel | null | undefined;

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
    routingResolveService = TestBed.inject(TipoDeDocumentoAnexavelRoutingResolveService);
    service = TestBed.inject(TipoDeDocumentoAnexavelService);
    resultTipoDeDocumentoAnexavel = undefined;
  });

  describe('resolve', () => {
    it('should return ITipoDeDocumentoAnexavel returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTipoDeDocumentoAnexavel = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTipoDeDocumentoAnexavel).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTipoDeDocumentoAnexavel = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTipoDeDocumentoAnexavel).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ITipoDeDocumentoAnexavel>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTipoDeDocumentoAnexavel = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTipoDeDocumentoAnexavel).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
