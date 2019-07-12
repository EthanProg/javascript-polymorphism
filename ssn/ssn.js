var SSNUtil = function () {

    // Get the configuration of country
    var defaultCountry = "Sweden";
    var country = arguments.length === 0 ? defaultCountry : arguments[0];

    // Default interface
    var SSNService = function () {

    };

    SSNService.prototype.getCountry = function () {
        return "default";
    };

    SSNService.prototype.getSSN = function (s) {
        return s;
    };

    // Sweden implementation
    var SwedenSSNService = function() {
        SSNService.apply(this, arguments);
    };

    SwedenSSNService.prototype = Object.create(SSNService.prototype);

    SwedenSSNService.prototype.getCountry = function () {
        return "Sweden";
    };

    SwedenSSNService.prototype.getSSN = function (s) {
        return s.replace("-", "");
    };

    // SSN object context
    var SSNServiceContext = [new SSNService(), new SwedenSSNService()];

    var getTargetSSNObject = function () {
        var targetObj = SSNServiceContext[0];
        for(var i = 0, len = SSNServiceContext.length; i < len; i++){
            var item = SSNServiceContext[i];
            if (item.getCountry() == country) {
                targetObj = item;
                break;
            }
        }
        return targetObj;
    };

    var getFormatSSN = function (ssn) {
        return getTargetSSNObject().getSSN(ssn);
    };

    return {
        getFormatSSN:getFormatSSN
    };
};
