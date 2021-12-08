module.exports = {
    /**
     * basic clamp func, return value if in bound else will return min or max accordingly
     */
    clamp: (value, min, max) => {
        if(value <= min)
            return min;
        else if(value >= max)
            return max;
        
        return value;
    },
    /**
     * check if a value is in bound
     */
    bounds: (value, min, max) => {
        return value >= min && value <= max;
    }
}