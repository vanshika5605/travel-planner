package com.dgoil.travelPlanner.Controller;

import java.util.Random;

public class tripIDGeneratorController {
    private static final String ALPHABET = "abcdefghijklmnopqrstuvwxyz";

    public static String generateTripID() {
        StringBuilder tripID = new StringBuilder("TP-");
        Random random = new Random();

        for (int i = 0; i < 4; i++) {
            char randomChar = ALPHABET.charAt(random.nextInt(ALPHABET.length()));
            tripID.append(randomChar);
        }

        return tripID.toString();
    }
}
