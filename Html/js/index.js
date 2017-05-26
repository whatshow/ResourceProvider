$(function(){
  //获取文件列表
  $.post("/file/list", function(res){
    $.each(res.data, function(i, item){
      $("#filelist").append(
        "<tr>" +
          "<th scope='row'>" + (i + 1) + "</th>" +
          "<td>" + item.filename + "</td>" +
          "<td>" + item.url + "</td>" +
          "<td>" + item.md5 + "</td>" +
          "<td>" +
            "<form action='/file/delete' method='post'>" +
                "<input id='filename' name='filename' value='" + item.filename + "' style='display:none;'/>" +
                "<button type='submit' class='btn btn-danger'>删除</button>" +
            "</form>" +
          "</td>" +
        "</tr>"
      );
    });
  });
});