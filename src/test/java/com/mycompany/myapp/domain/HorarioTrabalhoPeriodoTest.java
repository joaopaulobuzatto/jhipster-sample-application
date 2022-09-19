package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class HorarioTrabalhoPeriodoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HorarioTrabalhoPeriodo.class);
        HorarioTrabalhoPeriodo horarioTrabalhoPeriodo1 = new HorarioTrabalhoPeriodo();
        horarioTrabalhoPeriodo1.setId(1L);
        HorarioTrabalhoPeriodo horarioTrabalhoPeriodo2 = new HorarioTrabalhoPeriodo();
        horarioTrabalhoPeriodo2.setId(horarioTrabalhoPeriodo1.getId());
        assertThat(horarioTrabalhoPeriodo1).isEqualTo(horarioTrabalhoPeriodo2);
        horarioTrabalhoPeriodo2.setId(2L);
        assertThat(horarioTrabalhoPeriodo1).isNotEqualTo(horarioTrabalhoPeriodo2);
        horarioTrabalhoPeriodo1.setId(null);
        assertThat(horarioTrabalhoPeriodo1).isNotEqualTo(horarioTrabalhoPeriodo2);
    }
}
