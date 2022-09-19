package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OperadoraTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Operadora.class);
        Operadora operadora1 = new Operadora();
        operadora1.setId(1L);
        Operadora operadora2 = new Operadora();
        operadora2.setId(operadora1.getId());
        assertThat(operadora1).isEqualTo(operadora2);
        operadora2.setId(2L);
        assertThat(operadora1).isNotEqualTo(operadora2);
        operadora1.setId(null);
        assertThat(operadora1).isNotEqualTo(operadora2);
    }
}
