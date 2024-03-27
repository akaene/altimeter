package com.akaene.geo.altimeter.rest.error;

import com.akaene.geo.altimeter.exception.*;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler {

    private static final Logger LOG = LoggerFactory.getLogger(RestExceptionHandler.class);

    private static void logException(Throwable ex) {
        logException("Exception caught.", ex);
    }

    private static void logException(String message, Throwable ex) {
        LOG.error(message, ex);
    }

    private static ErrorInfo errorInfo(HttpServletRequest request, Throwable e) {
        return new ErrorInfo(e.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(CoordinatesOutOfBoundsException.class)
    public ResponseEntity<ErrorInfo> coordinatesOutOfBoundsException(HttpServletRequest request,
                                                                     CoordinatesOutOfBoundsException e) {
        // No need to log exception, this is client error
        return new ResponseEntity<>(errorInfo(request, e), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(ReportGenerationException.class)
    public ResponseEntity<ErrorInfo> reportGenerationException(HttpServletRequest request,
                                                               ReportGenerationException e) {
        logException(e);
        return new ResponseEntity<>(errorInfo(request, e), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(CadastreException.class)
    public ResponseEntity<ErrorInfo> cadastreException(HttpServletRequest request, CadastreException e) {
        logException(e);
        return new ResponseEntity<>(errorInfo(request, e), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ParcelNotFoundException.class)
    public ResponseEntity<ErrorInfo> parcelNotFoundException(HttpServletRequest request, ParcelNotFoundException e) {
        // No need to log exception, this is client error
        return new ResponseEntity<>(errorInfo(request, e), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(AltimeterException.class)
    public ResponseEntity<ErrorInfo> altimeterException(HttpServletRequest request, AltimeterException e) {
        logException(e);
        return new ResponseEntity<>(errorInfo(request, e), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
