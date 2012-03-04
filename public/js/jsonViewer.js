var jsonViewer = jsonViewer || (function() {
    
    var html = "";
    
    function isArray(obj) {
        return obj.constructor == Array;
    }

    function traversePrinter(obj, func) {
      for (i in obj) {
        func.start(i, obj[i]);
        if (typeof(obj[i]) === "object") {
          traversePrinter(obj[i], func);
        }
        func.end(i, obj[i]);
      }
    }

    function arrayHtml(key, val) {
      return "<span class='icon'>[]</span> " + key;
    }

    function objectHtml(key, val) {
      return "<span class='icon'>{}</span> " + key;
    }

    function nativeHtml(key, val) {
      return "<span class='icon'>&gt;&gt;</span> " + key + " : \"<i>" + val + "</i>\"";
    }

    function divAppender(key, val) {
        html +="<div class='element'><div class='innerElement'>";
        if (isArray(val)) {
          html += arrayHtml(key, val);
        } else if (typeof(val) == "object") {
          html += objectHtml(key, val);
        } else {
          html += nativeHtml(key, val);
        }
        html += "</div>";
    }

    function create($div, json) {
      var data = json;
      try {
          data = JSON.parse(json);
      } catch (ex) { }
      
      traversePrinter(data, {start:divAppender, end:function(){ html += '</div>'}});
      $div.append(html);
    }
    
    return {
        "create" : create
    };
    
})();