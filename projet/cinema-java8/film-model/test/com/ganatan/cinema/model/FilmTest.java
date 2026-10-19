package com.ganatan.cinema.model;

import junit.framework.TestCase;
import com.ganatan.cinema.model.Film;

public class FilmTest extends TestCase {
    public void testResultat() {
        System.out.println("00000000001");
        Film f = new Film("Alien", 1979);
        assertEquals("Alien", f.getTitre());
        assertEquals(1979, f.getAnnee());
    }
}
