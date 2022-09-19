package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class EventoAgendaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EventoAgenda.class);
        EventoAgenda eventoAgenda1 = new EventoAgenda();
        eventoAgenda1.setId(1L);
        EventoAgenda eventoAgenda2 = new EventoAgenda();
        eventoAgenda2.setId(eventoAgenda1.getId());
        assertThat(eventoAgenda1).isEqualTo(eventoAgenda2);
        eventoAgenda2.setId(2L);
        assertThat(eventoAgenda1).isNotEqualTo(eventoAgenda2);
        eventoAgenda1.setId(null);
        assertThat(eventoAgenda1).isNotEqualTo(eventoAgenda2);
    }
}
