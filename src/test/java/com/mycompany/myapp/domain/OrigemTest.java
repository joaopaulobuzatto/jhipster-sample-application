package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OrigemTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Origem.class);
        Origem origem1 = new Origem();
        origem1.setId(1L);
        Origem origem2 = new Origem();
        origem2.setId(origem1.getId());
        assertThat(origem1).isEqualTo(origem2);
        origem2.setId(2L);
        assertThat(origem1).isNotEqualTo(origem2);
        origem1.setId(null);
        assertThat(origem1).isNotEqualTo(origem2);
    }
}
