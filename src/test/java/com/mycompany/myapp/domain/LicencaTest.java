package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LicencaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Licenca.class);
        Licenca licenca1 = new Licenca();
        licenca1.setId(1L);
        Licenca licenca2 = new Licenca();
        licenca2.setId(licenca1.getId());
        assertThat(licenca1).isEqualTo(licenca2);
        licenca2.setId(2L);
        assertThat(licenca1).isNotEqualTo(licenca2);
        licenca1.setId(null);
        assertThat(licenca1).isNotEqualTo(licenca2);
    }
}
