package com.example.starter;

import com.example.starter.protocol.Message;

public class Main {
    public static void main(String[] args) {
        Message message = new Message();
        System.out.println(message.calculate());
    }
}
