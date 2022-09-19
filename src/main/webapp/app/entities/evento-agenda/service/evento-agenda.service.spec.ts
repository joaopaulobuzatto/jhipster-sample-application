import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEventoAgenda } from '../evento-agenda.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../evento-agenda.test-samples';

import { EventoAgendaService, RestEventoAgenda } from './evento-agenda.service';

const requireRestSample: RestEventoAgenda = {
  ...sampleWithRequiredData,
  dataCriacao: sampleWithRequiredData.dataCriacao?.toJSON(),
  data: sampleWithRequiredData.data?.toJSON(),
};

describe('EventoAgenda Service', () => {
  let service: EventoAgendaService;
  let httpMock: HttpTestingController;
  let expectedResult: IEventoAgenda | IEventoAgenda[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EventoAgendaService);
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

    it('should create a EventoAgenda', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const eventoAgenda = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(eventoAgenda).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EventoAgenda', () => {
      const eventoAgenda = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(eventoAgenda).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EventoAgenda', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EventoAgenda', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a EventoAgenda', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEventoAgendaToCollectionIfMissing', () => {
      it('should add a EventoAgenda to an empty array', () => {
        const eventoAgenda: IEventoAgenda = sampleWithRequiredData;
        expectedResult = service.addEventoAgendaToCollectionIfMissing([], eventoAgenda);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(eventoAgenda);
      });

      it('should not add a EventoAgenda to an array that contains it', () => {
        const eventoAgenda: IEventoAgenda = sampleWithRequiredData;
        const eventoAgendaCollection: IEventoAgenda[] = [
          {
            ...eventoAgenda,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEventoAgendaToCollectionIfMissing(eventoAgendaCollection, eventoAgenda);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EventoAgenda to an array that doesn't contain it", () => {
        const eventoAgenda: IEventoAgenda = sampleWithRequiredData;
        const eventoAgendaCollection: IEventoAgenda[] = [sampleWithPartialData];
        expectedResult = service.addEventoAgendaToCollectionIfMissing(eventoAgendaCollection, eventoAgenda);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(eventoAgenda);
      });

      it('should add only unique EventoAgenda to an array', () => {
        const eventoAgendaArray: IEventoAgenda[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const eventoAgendaCollection: IEventoAgenda[] = [sampleWithRequiredData];
        expectedResult = service.addEventoAgendaToCollectionIfMissing(eventoAgendaCollection, ...eventoAgendaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const eventoAgenda: IEventoAgenda = sampleWithRequiredData;
        const eventoAgenda2: IEventoAgenda = sampleWithPartialData;
        expectedResult = service.addEventoAgendaToCollectionIfMissing([], eventoAgenda, eventoAgenda2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(eventoAgenda);
        expect(expectedResult).toContain(eventoAgenda2);
      });

      it('should accept null and undefined values', () => {
        const eventoAgenda: IEventoAgenda = sampleWithRequiredData;
        expectedResult = service.addEventoAgendaToCollectionIfMissing([], null, eventoAgenda, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(eventoAgenda);
      });

      it('should return initial array if no EventoAgenda is added', () => {
        const eventoAgendaCollection: IEventoAgenda[] = [sampleWithRequiredData];
        expectedResult = service.addEventoAgendaToCollectionIfMissing(eventoAgendaCollection, undefined, null);
        expect(expectedResult).toEqual(eventoAgendaCollection);
      });
    });

    describe('compareEventoAgenda', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEventoAgenda(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEventoAgenda(entity1, entity2);
        const compareResult2 = service.compareEventoAgenda(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEventoAgenda(entity1, entity2);
        const compareResult2 = service.compareEventoAgenda(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEventoAgenda(entity1, entity2);
        const compareResult2 = service.compareEventoAgenda(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
