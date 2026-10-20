package com.example.starter.protocol;

public class Message2 {
    public int calculate() {
        return new Message1().calculate() + 3;
    }
}
