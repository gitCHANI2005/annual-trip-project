function getlocationtime(locationtime) {
    if (locationtime){
        return locationtime;
    }

    return new Date().toISOString();
}   

function convertDmsToDecimal(dms) {
    if (!dms) {
        return null;
    }

    const degrees = Number(dms.Degrees);
    const minutes = Number(dms.Minutes);
    const seconds = Number(dms.Seconds);

    if (
        Number.isNaN(degrees) ||
        Number.isNaN(minutes) ||
        Number.isNaN(seconds)
    ) {
        return null;
    }

    return degrees + minutes / 60 + seconds / 3600;
}

module.exports = {
    convertDmsToDecimal,    
    getlocationtime   
};