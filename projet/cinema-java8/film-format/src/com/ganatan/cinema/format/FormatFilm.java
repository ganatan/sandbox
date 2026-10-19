package com.ganatan.cinema.format;

import com.ganatan.cinema.model.Film;

public class FormatFilm {
    public String afficher(Film film) {
        return film.getTitre() + " (" + film.getAnnee() + ")";
    }
}
