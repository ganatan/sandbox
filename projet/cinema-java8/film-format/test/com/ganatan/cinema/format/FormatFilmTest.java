package com.ganatan.cinema.format;

import junit.framework.TestCase;
import com.ganatan.cinema.format.FormatFilm;
import com.ganatan.cinema.model.Film;

public class FormatFilmTest extends TestCase {
    public void testResultat() {
        assertEquals("Dune (2021)", new FormatFilm().afficher(new Film("Dune", 2021)));
    }
}
