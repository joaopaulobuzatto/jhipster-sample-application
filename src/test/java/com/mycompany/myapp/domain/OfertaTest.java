package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OfertaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Oferta.class);
        Oferta oferta1 = new Oferta();
        oferta1.setId(1L);
        Oferta oferta2 = new Oferta();
        oferta2.setId(oferta1.getId());
        assertThat(oferta1).isEqualTo(oferta2);
        oferta2.setId(2L);
        assertThat(oferta1).isNotEqualTo(oferta2);
        oferta1.setId(null);
        assertThat(oferta1).isNotEqualTo(oferta2);
    }
}
