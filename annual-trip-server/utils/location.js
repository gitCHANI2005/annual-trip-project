function getlocationtime(locationtime) {
    if (locationtime){
        return locationtime;
    }

    return new Date().toISOString();
}   

module.exports = {
    getlocationtime
};