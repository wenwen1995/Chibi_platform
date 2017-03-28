+function() {
  setTimeout(function() {
    $.ajax = function(options) {
      var dfd = $.Deferred()
        , data = {}
        , url = options.url
        , params = options.data
        , code = 0
        , message;

       if(url.indexOf('/send') > -1) {
        message = '';
        code = 0;
        data = {};
      }

      if(url.indexOf('/modify') > -1) {
        message = '';
        code = 0;
        data = {};
      }  

      if(url.indexOf('/newPhone') > -1) {
        message = '';
        code = 0;
        data = {};
      }

      if(url.indexOf('/getCode') > -1) {
        message = '';
        code = 0;
        data = {};
      }

      if(url.indexOf('/verify') > -1) {
        message = '';
        code = 0;
        data = {};
      }

      if(url.indexOf('/bind') > -1) {
        message = '';
        code = 0;
        data = {};
      }
      
      console.log('$.ajax', url, options, {code: 0, message: message, data:data});
      setTimeout(function() {
        dfd.resolve({code: code, message: message, data:data});
      }, 0);
      return dfd;
    }
  });
}();
