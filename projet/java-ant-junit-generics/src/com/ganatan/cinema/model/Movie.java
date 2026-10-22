package com.ganatan.cinema.model;

public class Movie extends Media {
    private final int year;

    public Movie(String title, int year) {
        super(title);
        this.year = year;
    }

    public int getYear() {
        return year;
    }
}
