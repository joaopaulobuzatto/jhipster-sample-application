import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEventoAgenda } from '../evento-agenda.model';

@Component({
  selector: 'jhi-evento-agenda-detail',
  templateUrl: './evento-agenda-detail.component.html',
})
export class EventoAgendaDetailComponent implements OnInit {
  eventoAgenda: IEventoAgenda | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ eventoAgenda }) => {
      this.eventoAgenda = eventoAgenda;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
