package com.example.starter.protocol;

import junit.framework.TestCase;

public class Message1Test extends TestCase {
    public void testCalculate() {
        Message1 message = new Message1();
        System.out.println("00000000001");
        assertEquals(3, message.calculate());
    }
}
