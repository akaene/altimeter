package com.akaene.geo.altimeter.exception;

public class AltimeterException extends RuntimeException {

    public AltimeterException(String message) {
        super(message);
    }

    public AltimeterException(String message, Throwable cause) {
        super(message, cause);
    }
}
