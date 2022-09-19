import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUsuarioFilial } from '../usuario-filial.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../usuario-filial.test-samples';

import { UsuarioFilialService } from './usuario-filial.service';

const requireRestSample: IUsuarioFilial = {
  ...sampleWithRequiredData,
};

describe('UsuarioFilial Service', () => {
  let service: UsuarioFilialService;
  let httpMock: HttpTestingController;
  let expectedResult: IUsuarioFilial | IUsuarioFilial[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UsuarioFilialService);
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

    it('should create a UsuarioFilial', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const usuarioFilial = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(usuarioFilial).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a UsuarioFilial', () => {
      const usuarioFilial = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(usuarioFilial).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a UsuarioFilial', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of UsuarioFilial', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a UsuarioFilial', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addUsuarioFilialToCollectionIfMissing', () => {
      it('should add a UsuarioFilial to an empty array', () => {
        const usuarioFilial: IUsuarioFilial = sampleWithRequiredData;
        expectedResult = service.addUsuarioFilialToCollectionIfMissing([], usuarioFilial);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(usuarioFilial);
      });

      it('should not add a UsuarioFilial to an array that contains it', () => {
        const usuarioFilial: IUsuarioFilial = sampleWithRequiredData;
        const usuarioFilialCollection: IUsuarioFilial[] = [
          {
            ...usuarioFilial,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUsuarioFilialToCollectionIfMissing(usuarioFilialCollection, usuarioFilial);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a UsuarioFilial to an array that doesn't contain it", () => {
        const usuarioFilial: IUsuarioFilial = sampleWithRequiredData;
        const usuarioFilialCollection: IUsuarioFilial[] = [sampleWithPartialData];
        expectedResult = service.addUsuarioFilialToCollectionIfMissing(usuarioFilialCollection, usuarioFilial);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(usuarioFilial);
      });

      it('should add only unique UsuarioFilial to an array', () => {
        const usuarioFilialArray: IUsuarioFilial[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const usuarioFilialCollection: IUsuarioFilial[] = [sampleWithRequiredData];
        expectedResult = service.addUsuarioFilialToCollectionIfMissing(usuarioFilialCollection, ...usuarioFilialArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const usuarioFilial: IUsuarioFilial = sampleWithRequiredData;
        const usuarioFilial2: IUsuarioFilial = sampleWithPartialData;
        expectedResult = service.addUsuarioFilialToCollectionIfMissing([], usuarioFilial, usuarioFilial2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(usuarioFilial);
        expect(expectedResult).toContain(usuarioFilial2);
      });

      it('should accept null and undefined values', () => {
        const usuarioFilial: IUsuarioFilial = sampleWithRequiredData;
        expectedResult = service.addUsuarioFilialToCollectionIfMissing([], null, usuarioFilial, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(usuarioFilial);
      });

      it('should return initial array if no UsuarioFilial is added', () => {
        const usuarioFilialCollection: IUsuarioFilial[] = [sampleWithRequiredData];
        expectedResult = service.addUsuarioFilialToCollectionIfMissing(usuarioFilialCollection, undefined, null);
        expect(expectedResult).toEqual(usuarioFilialCollection);
      });
    });

    describe('compareUsuarioFilial', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUsuarioFilial(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareUsuarioFilial(entity1, entity2);
        const compareResult2 = service.compareUsuarioFilial(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareUsuarioFilial(entity1, entity2);
        const compareResult2 = service.compareUsuarioFilial(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareUsuarioFilial(entity1, entity2);
        const compareResult2 = service.compareUsuarioFilial(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
