package com.ganatan.cinema.generic;

public class Box<E> {
    private E value;

    public Box(E value) {
        this.value = value;
    }

    public E get() {
        return value;
    }

    public void set(E value) {
        this.value = value;
    }
}
