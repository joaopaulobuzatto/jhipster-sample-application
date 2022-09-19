import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IDetentorAnexoArquivo } from '../detentor-anexo-arquivo.model';
import { DetentorAnexoArquivoService } from '../service/detentor-anexo-arquivo.service';

import { DetentorAnexoArquivoRoutingResolveService } from './detentor-anexo-arquivo-routing-resolve.service';

describe('DetentorAnexoArquivo routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: DetentorAnexoArquivoRoutingResolveService;
  let service: DetentorAnexoArquivoService;
  let resultDetentorAnexoArquivo: IDetentorAnexoArquivo | null | undefined;

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
    routingResolveService = TestBed.inject(DetentorAnexoArquivoRoutingResolveService);
    service = TestBed.inject(DetentorAnexoArquivoService);
    resultDetentorAnexoArquivo = undefined;
  });

  describe('resolve', () => {
    it('should return IDetentorAnexoArquivo returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDetentorAnexoArquivo = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDetentorAnexoArquivo).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDetentorAnexoArquivo = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDetentorAnexoArquivo).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IDetentorAnexoArquivo>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDetentorAnexoArquivo = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultDetentorAnexoArquivo).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
