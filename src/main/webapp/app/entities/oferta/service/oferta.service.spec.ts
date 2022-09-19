import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IOferta } from '../oferta.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../oferta.test-samples';

import { OfertaService, RestOferta } from './oferta.service';

const requireRestSample: RestOferta = {
  ...sampleWithRequiredData,
  dataCriacao: sampleWithRequiredData.dataCriacao?.toJSON(),
};

describe('Oferta Service', () => {
  let service: OfertaService;
  let httpMock: HttpTestingController;
  let expectedResult: IOferta | IOferta[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OfertaService);
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

    it('should create a Oferta', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const oferta = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(oferta).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Oferta', () => {
      const oferta = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(oferta).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Oferta', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Oferta', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Oferta', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addOfertaToCollectionIfMissing', () => {
      it('should add a Oferta to an empty array', () => {
        const oferta: IOferta = sampleWithRequiredData;
        expectedResult = service.addOfertaToCollectionIfMissing([], oferta);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(oferta);
      });

      it('should not add a Oferta to an array that contains it', () => {
        const oferta: IOferta = sampleWithRequiredData;
        const ofertaCollection: IOferta[] = [
          {
            ...oferta,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addOfertaToCollectionIfMissing(ofertaCollection, oferta);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Oferta to an array that doesn't contain it", () => {
        const oferta: IOferta = sampleWithRequiredData;
        const ofertaCollection: IOferta[] = [sampleWithPartialData];
        expectedResult = service.addOfertaToCollectionIfMissing(ofertaCollection, oferta);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(oferta);
      });

      it('should add only unique Oferta to an array', () => {
        const ofertaArray: IOferta[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const ofertaCollection: IOferta[] = [sampleWithRequiredData];
        expectedResult = service.addOfertaToCollectionIfMissing(ofertaCollection, ...ofertaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const oferta: IOferta = sampleWithRequiredData;
        const oferta2: IOferta = sampleWithPartialData;
        expectedResult = service.addOfertaToCollectionIfMissing([], oferta, oferta2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(oferta);
        expect(expectedResult).toContain(oferta2);
      });

      it('should accept null and undefined values', () => {
        const oferta: IOferta = sampleWithRequiredData;
        expectedResult = service.addOfertaToCollectionIfMissing([], null, oferta, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(oferta);
      });

      it('should return initial array if no Oferta is added', () => {
        const ofertaCollection: IOferta[] = [sampleWithRequiredData];
        expectedResult = service.addOfertaToCollectionIfMissing(ofertaCollection, undefined, null);
        expect(expectedResult).toEqual(ofertaCollection);
      });
    });

    describe('compareOferta', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareOferta(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareOferta(entity1, entity2);
        const compareResult2 = service.compareOferta(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareOferta(entity1, entity2);
        const compareResult2 = service.compareOferta(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareOferta(entity1, entity2);
        const compareResult2 = service.compareOferta(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
