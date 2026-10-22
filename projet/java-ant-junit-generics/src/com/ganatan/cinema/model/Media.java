package com.ganatan.cinema.model;

public class Media {
    private final String title;

    public Media(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    @Override
    public String toString() {
        return title;
    }
}
