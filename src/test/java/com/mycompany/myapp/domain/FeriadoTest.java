package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class FeriadoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Feriado.class);
        Feriado feriado1 = new Feriado();
        feriado1.setId(1L);
        Feriado feriado2 = new Feriado();
        feriado2.setId(feriado1.getId());
        assertThat(feriado1).isEqualTo(feriado2);
        feriado2.setId(2L);
        assertThat(feriado1).isNotEqualTo(feriado2);
        feriado1.setId(null);
        assertThat(feriado1).isNotEqualTo(feriado2);
    }
}
