package com.akaene.geo.altimeter.exception;

/**
 * Thrown when application is unable to generate a report of the safety data resolution.
 */
public class ReportGenerationException extends AltimeterException {

    public ReportGenerationException(String message, Throwable cause) {
        super(message, cause);
    }
}
