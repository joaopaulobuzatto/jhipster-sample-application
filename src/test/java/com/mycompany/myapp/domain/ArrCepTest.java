package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ArrCepTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ArrCep.class);
        ArrCep arrCep1 = new ArrCep();
        arrCep1.setId(1L);
        ArrCep arrCep2 = new ArrCep();
        arrCep2.setId(arrCep1.getId());
        assertThat(arrCep1).isEqualTo(arrCep2);
        arrCep2.setId(2L);
        assertThat(arrCep1).isNotEqualTo(arrCep2);
        arrCep1.setId(null);
        assertThat(arrCep1).isNotEqualTo(arrCep2);
    }
}
