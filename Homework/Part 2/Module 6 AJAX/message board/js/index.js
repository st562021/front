        // 1. 加载信息
        var $reply = $('.reply');
        refresh();

        // 2. 提交信息
        var $submit = $(".submit");
        var $username = $("#username");
        var $newContent = $("#newContent");
        $submit.on("click", function () {
            var author = $username.val();
            var content = $newContent.val();
            $.ajax({
                type: "POST"
                , url: "http://localhost:3000/infos"
                , data: {
                    "author": author
                    , "content": content
                }
                , success: function (data) {
                    // console.log(data);
                    alert("发表成功");
                    refresh();
                    $username.val("");
                    $newContent.val("");

                }
            });
        });

        // 3. 删除信息
        // 封装一个刷新评论列表的函数
        function refresh() {
            $.get("http://localhost:3000/infos", function (data) {
                console.log(data);
                $reply.html(template("temp", { data }));
                var $delete = $(".reply .floor #delete");
                $delete.on("click", function () {
                    var id = $(this).parents("li").attr("idx");
                    console.log(id);
                    $.ajax({
                        url: "http://localhost:3000/infos/" + id
                        , type: "delete"
                    })
                    alert("删除成功");
                    $(this).parents("li").remove();
                })
            })
        }