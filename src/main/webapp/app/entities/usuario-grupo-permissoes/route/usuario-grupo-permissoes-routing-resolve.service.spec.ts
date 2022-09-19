import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IUsuarioGrupoPermissoes } from '../usuario-grupo-permissoes.model';
import { UsuarioGrupoPermissoesService } from '../service/usuario-grupo-permissoes.service';

import { UsuarioGrupoPermissoesRoutingResolveService } from './usuario-grupo-permissoes-routing-resolve.service';

describe('UsuarioGrupoPermissoes routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: UsuarioGrupoPermissoesRoutingResolveService;
  let service: UsuarioGrupoPermissoesService;
  let resultUsuarioGrupoPermissoes: IUsuarioGrupoPermissoes | null | undefined;

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
    routingResolveService = TestBed.inject(UsuarioGrupoPermissoesRoutingResolveService);
    service = TestBed.inject(UsuarioGrupoPermissoesService);
    resultUsuarioGrupoPermissoes = undefined;
  });

  describe('resolve', () => {
    it('should return IUsuarioGrupoPermissoes returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUsuarioGrupoPermissoes = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultUsuarioGrupoPermissoes).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUsuarioGrupoPermissoes = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultUsuarioGrupoPermissoes).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IUsuarioGrupoPermissoes>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultUsuarioGrupoPermissoes = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultUsuarioGrupoPermissoes).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
