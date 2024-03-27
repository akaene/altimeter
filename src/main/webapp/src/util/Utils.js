const Utils = {

    round(val, decimals = 2) {
        const to = Math.pow(10, decimals);
        return Math.round(val * to) / to;
    },

    isPositionValid(latitude, longitude) {
        return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
    },

    /**
     * Ensures that file download using Ajax triggers browser file save mechanism.
     *
     * Adapted from https://github.com/kennethjiang/js-file-download/blob/master/file-download.js
     * @param data The downloaded data
     * @param mimeType Type of data
     */
    fileDownload(data, mimeType = "application/pdf") {
        const blob = new Blob([data], {type: mimeType});
        const blobURL = window.URL.createObjectURL(blob);
        const tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = blobURL;
        tempLink.setAttribute("download", "report.pdf");

        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }
};

export default Utils;
