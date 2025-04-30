{!REQUIRESCRIPT("/soap/ajax/21.0/connection.js")}
var records = {!GETRECORDIDS($ObjectType.Case)
};
if (records[0] == null) {
    alert("Please select at least one record to delete.")
} else {
    var conf = confirm("Please reconfirm delete ?");
    if (conf == true) {
        var errors = [];
        var result = sforce.connection.deleteIds(records);
        if (result && result.length) {
            var failedRecs = 0;
            var SuccessRecs = 0;
            for (var i = 0; i < result.length; i++) {
                var finalresult = result[i];
                if (finalresult && finalresult.success == 'true') {
                    SuccessRecs++;
                } else {
                    var es = finalresult.getArray("errors");
                    if (es.length > 0) {
                        errors.push(es[0].message);
                    }
                    failedRecs++;
                }
            }
            if (failedRecs > 0) {
                alert("Partially Worked! Failed: " + failedRecs + " and Succeeded: " + SuccessRecs + " n because: " + errors.join("n"));
            } else {
                alert("Successfully deleted all records : " + SuccessRecs);
            }
        }
        window.location.reload();
    }
}
