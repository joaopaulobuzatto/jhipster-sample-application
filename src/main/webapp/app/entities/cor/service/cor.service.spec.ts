import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICor } from '../cor.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../cor.test-samples';

import { CorService } from './cor.service';

const requireRestSample: ICor = {
  ...sampleWithRequiredData,
};

describe('Cor Service', () => {
  let service: CorService;
  let httpMock: HttpTestingController;
  let expectedResult: ICor | ICor[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CorService);
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

    it('should create a Cor', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cor = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(cor).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Cor', () => {
      const cor = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(cor).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Cor', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Cor', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Cor', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCorToCollectionIfMissing', () => {
      it('should add a Cor to an empty array', () => {
        const cor: ICor = sampleWithRequiredData;
        expectedResult = service.addCorToCollectionIfMissing([], cor);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cor);
      });

      it('should not add a Cor to an array that contains it', () => {
        const cor: ICor = sampleWithRequiredData;
        const corCollection: ICor[] = [
          {
            ...cor,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCorToCollectionIfMissing(corCollection, cor);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Cor to an array that doesn't contain it", () => {
        const cor: ICor = sampleWithRequiredData;
        const corCollection: ICor[] = [sampleWithPartialData];
        expectedResult = service.addCorToCollectionIfMissing(corCollection, cor);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cor);
      });

      it('should add only unique Cor to an array', () => {
        const corArray: ICor[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const corCollection: ICor[] = [sampleWithRequiredData];
        expectedResult = service.addCorToCollectionIfMissing(corCollection, ...corArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cor: ICor = sampleWithRequiredData;
        const cor2: ICor = sampleWithPartialData;
        expectedResult = service.addCorToCollectionIfMissing([], cor, cor2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cor);
        expect(expectedResult).toContain(cor2);
      });

      it('should accept null and undefined values', () => {
        const cor: ICor = sampleWithRequiredData;
        expectedResult = service.addCorToCollectionIfMissing([], null, cor, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cor);
      });

      it('should return initial array if no Cor is added', () => {
        const corCollection: ICor[] = [sampleWithRequiredData];
        expectedResult = service.addCorToCollectionIfMissing(corCollection, undefined, null);
        expect(expectedResult).toEqual(corCollection);
      });
    });

    describe('compareCor', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCor(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCor(entity1, entity2);
        const compareResult2 = service.compareCor(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCor(entity1, entity2);
        const compareResult2 = service.compareCor(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCor(entity1, entity2);
        const compareResult2 = service.compareCor(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
