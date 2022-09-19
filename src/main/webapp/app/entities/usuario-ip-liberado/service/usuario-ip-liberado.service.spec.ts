import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUsuarioIpLiberado } from '../usuario-ip-liberado.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../usuario-ip-liberado.test-samples';

import { UsuarioIpLiberadoService } from './usuario-ip-liberado.service';

const requireRestSample: IUsuarioIpLiberado = {
  ...sampleWithRequiredData,
};

describe('UsuarioIpLiberado Service', () => {
  let service: UsuarioIpLiberadoService;
  let httpMock: HttpTestingController;
  let expectedResult: IUsuarioIpLiberado | IUsuarioIpLiberado[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UsuarioIpLiberadoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a UsuarioIpLiberado', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const usuarioIpLiberado = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(usuarioIpLiberado).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a UsuarioIpLiberado', () => {
      const usuarioIpLiberado = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(usuarioIpLiberado).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a UsuarioIpLiberado', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of UsuarioIpLiberado', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a UsuarioIpLiberado', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addUsuarioIpLiberadoToCollectionIfMissing', () => {
      it('should add a UsuarioIpLiberado to an empty array', () => {
        const usuarioIpLiberado: IUsuarioIpLiberado = sampleWithRequiredData;
        expectedResult = service.addUsuarioIpLiberadoToCollectionIfMissing([], usuarioIpLiberado);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(usuarioIpLiberado);
      });

      it('should not add a UsuarioIpLiberado to an array that contains it', () => {
        const usuarioIpLiberado: IUsuarioIpLiberado = sampleWithRequiredData;
        const usuarioIpLiberadoCollection: IUsuarioIpLiberado[] = [
          {
            ...usuarioIpLiberado,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUsuarioIpLiberadoToCollectionIfMissing(usuarioIpLiberadoCollection, usuarioIpLiberado);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a UsuarioIpLiberado to an array that doesn't contain it", () => {
        const usuarioIpLiberado: IUsuarioIpLiberado = sampleWithRequiredData;
        const usuarioIpLiberadoCollection: IUsuarioIpLiberado[] = [sampleWithPartialData];
        expectedResult = service.addUsuarioIpLiberadoToCollectionIfMissing(usuarioIpLiberadoCollection, usuarioIpLiberado);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(usuarioIpLiberado);
      });

      it('should add only unique UsuarioIpLiberado to an array', () => {
        const usuarioIpLiberadoArray: IUsuarioIpLiberado[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const usuarioIpLiberadoCollection: IUsuarioIpLiberado[] = [sampleWithRequiredData];
        expectedResult = service.addUsuarioIpLiberadoToCollectionIfMissing(usuarioIpLiberadoCollection, ...usuarioIpLiberadoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const usuarioIpLiberado: IUsuarioIpLiberado = sampleWithRequiredData;
        const usuarioIpLiberado2: IUsuarioIpLiberado = sampleWithPartialData;
        expectedResult = service.addUsuarioIpLiberadoToCollectionIfMissing([], usuarioIpLiberado, usuarioIpLiberado2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(usuarioIpLiberado);
        expect(expectedResult).toContain(usuarioIpLiberado2);
      });

      it('should accept null and undefined values', () => {
        const usuarioIpLiberado: IUsuarioIpLiberado = sampleWithRequiredData;
        expectedResult = service.addUsuarioIpLiberadoToCollectionIfMissing([], null, usuarioIpLiberado, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(usuarioIpLiberado);
      });

      it('should return initial array if no UsuarioIpLiberado is added', () => {
        const usuarioIpLiberadoCollection: IUsuarioIpLiberado[] = [sampleWithRequiredData];
        expectedResult = service.addUsuarioIpLiberadoToCollectionIfMissing(usuarioIpLiberadoCollection, undefined, null);
        expect(expectedResult).toEqual(usuarioIpLiberadoCollection);
      });
    });

    describe('compareUsuarioIpLiberado', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUsuarioIpLiberado(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareUsuarioIpLiberado(entity1, entity2);
        const compareResult2 = service.compareUsuarioIpLiberado(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareUsuarioIpLiberado(entity1, entity2);
        const compareResult2 = service.compareUsuarioIpLiberado(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareUsuarioIpLiberado(entity1, entity2);
        const compareResult2 = service.compareUsuarioIpLiberado(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
