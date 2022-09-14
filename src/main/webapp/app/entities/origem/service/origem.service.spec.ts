import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IOrigem } from '../origem.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../origem.test-samples';

import { OrigemService, RestOrigem } from './origem.service';

const requireRestSample: RestOrigem = {
  ...sampleWithRequiredData,
  dataCriacao: sampleWithRequiredData.dataCriacao?.toJSON(),
};

describe('Origem Service', () => {
  let service: OrigemService;
  let httpMock: HttpTestingController;
  let expectedResult: IOrigem | IOrigem[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OrigemService);
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

    it('should create a Origem', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const origem = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(origem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Origem', () => {
      const origem = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(origem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Origem', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Origem', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Origem', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addOrigemToCollectionIfMissing', () => {
      it('should add a Origem to an empty array', () => {
        const origem: IOrigem = sampleWithRequiredData;
        expectedResult = service.addOrigemToCollectionIfMissing([], origem);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(origem);
      });

      it('should not add a Origem to an array that contains it', () => {
        const origem: IOrigem = sampleWithRequiredData;
        const origemCollection: IOrigem[] = [
          {
            ...origem,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addOrigemToCollectionIfMissing(origemCollection, origem);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Origem to an array that doesn't contain it", () => {
        const origem: IOrigem = sampleWithRequiredData;
        const origemCollection: IOrigem[] = [sampleWithPartialData];
        expectedResult = service.addOrigemToCollectionIfMissing(origemCollection, origem);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(origem);
      });

      it('should add only unique Origem to an array', () => {
        const origemArray: IOrigem[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const origemCollection: IOrigem[] = [sampleWithRequiredData];
        expectedResult = service.addOrigemToCollectionIfMissing(origemCollection, ...origemArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const origem: IOrigem = sampleWithRequiredData;
        const origem2: IOrigem = sampleWithPartialData;
        expectedResult = service.addOrigemToCollectionIfMissing([], origem, origem2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(origem);
        expect(expectedResult).toContain(origem2);
      });

      it('should accept null and undefined values', () => {
        const origem: IOrigem = sampleWithRequiredData;
        expectedResult = service.addOrigemToCollectionIfMissing([], null, origem, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(origem);
      });

      it('should return initial array if no Origem is added', () => {
        const origemCollection: IOrigem[] = [sampleWithRequiredData];
        expectedResult = service.addOrigemToCollectionIfMissing(origemCollection, undefined, null);
        expect(expectedResult).toEqual(origemCollection);
      });
    });

    describe('compareOrigem', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareOrigem(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareOrigem(entity1, entity2);
        const compareResult2 = service.compareOrigem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareOrigem(entity1, entity2);
        const compareResult2 = service.compareOrigem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareOrigem(entity1, entity2);
        const compareResult2 = service.compareOrigem(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
