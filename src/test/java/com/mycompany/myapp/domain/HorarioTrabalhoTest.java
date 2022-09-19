package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class HorarioTrabalhoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HorarioTrabalho.class);
        HorarioTrabalho horarioTrabalho1 = new HorarioTrabalho();
        horarioTrabalho1.setId(1L);
        HorarioTrabalho horarioTrabalho2 = new HorarioTrabalho();
        horarioTrabalho2.setId(horarioTrabalho1.getId());
        assertThat(horarioTrabalho1).isEqualTo(horarioTrabalho2);
        horarioTrabalho2.setId(2L);
        assertThat(horarioTrabalho1).isNotEqualTo(horarioTrabalho2);
        horarioTrabalho1.setId(null);
        assertThat(horarioTrabalho1).isNotEqualTo(horarioTrabalho2);
    }
}
