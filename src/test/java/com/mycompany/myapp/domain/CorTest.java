package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cor.class);
        Cor cor1 = new Cor();
        cor1.setId(1L);
        Cor cor2 = new Cor();
        cor2.setId(cor1.getId());
        assertThat(cor1).isEqualTo(cor2);
        cor2.setId(2L);
        assertThat(cor1).isNotEqualTo(cor2);
        cor1.setId(null);
        assertThat(cor1).isNotEqualTo(cor2);
    }
}
