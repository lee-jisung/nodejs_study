// public/javascripts/main.js

const timer = null;
const editing = false;

const load = function () {
  if (!editing) {
    $.get('/load', function (data) {
      $('#wall').empty();
      $(data).each(function (i) {
        const id = this._id;

        $('#wall').prepend(
          "<div class='item'> <div class='left'></div><div class='right'></div></div>"
        );

        $('#wall .item:first .left').append(
          "<img class='photo_thumb' src='" + this.picture + "'/>"
        );
        $('#wall .item:first .right').append(
          "<div class='author'><b>" +
            this.author +
            '</b> (' +
            this.date +
            ")&nbsp;&nbsp; <span class='text_button modify'>수정</span> <span class='text_button del'>삭제</span> <span class='text_button like'>좋아요</span></div>"
        );
        $('#wall .item:first .right').append(
          "<div class='contents " + id + "'>" + this.contents + '</div>'
        );
        $('#wall .item:first .right').append(
          "<div class='likes'>LIKE : " + this.like + '</div>'
        );
        $('#wall .item:first .right').append("<div class='comments'></div>");

        $(this.comments).each(function (j) {
          $('#wall .item:first .right .comments').append(
            "<div class='comment_item'>" +
              this.author +
              ': ' +
              this.comment +
              '</div>'
          );
        });

        $('#wall .item:first .comments').append(
          "<input class='input_comment' type='text' /> <input class='comment_button' type='button' value='COMMENT' />"
        );

        id = this._id;
        // editing 변수 => 현재 글 or 댓글을 작성하는 중인지 체크
        // 댓글이나 글을 쓰고 있지 않다면, 다른 사람이 글을 썼을 때 직접 새로고침 하지 않아도
        // 포스팅 들이 새로고침 됨

        // focus event =>해당 영역을 클릭했을 때 (글, 댓글을 쓰는 중)
        $('#wall .item:first .input_comment').on('focus', function () {
          editing = true;
        });

        // blur event => 영역 밖을 클릭 했을 때
        $('#wall .item:first .input_comment').on('blur', function () {
          editing = false;
        });

        $('#wall .item:first .input_comment').keypress(function (evt) {
          if ((evt.keyCode || evt.which) == 13) {
            if (this.value !== '') {
              comment(this.value, id);
              evt.preventDefault();
              $(this).val('');
              editing = false; // enter or key를 눌러 내용을 등록할 때에도 editing = false
            }
          }
        });

        $('#wall .item:first .comment_button').click(function (evt) {
          comment($('#wall .item:first .input_comment').val(), id);
          editing = false;
        });

        let cnt = 0;

        $('#wall .item:first .modify').click(function (evt) {
          editing = true;
          if (cnt === 0) {
            const contents = $('#wall .' + id).html();
            $('#wall .' + id).html(
              "<textarea id='textarea_" +
                id +
                "' class='textarea_modify'>" +
                contents +
                '</textarea>'
            );
            cnt = 1;
          }
          $('#textarea_' + id).keypress(function (evt) {
            if ((evt.keyCode || evt.which) == 13) {
              if (this.value !== '') {
                modify(this.value, id);
                evt.preventDefault();
                editing = false;
              }
            }
          });
        });

        $('#wall .item:first .del').click(function (evt) {
          del(id);
        });

        $('#wall .item:first .like').click(function (evt) {
          editing = false;
          like(id);
        });
      });
    });
  }
};

const write = function (contents) {
  const postdata = {
    author: $('#author').val(),
    contents: contents,
    picture: $('#message').find('.photo').attr('src'),
  };

  $.post('/write', postdata, function () {
    load();
  });
};

const modify = function (contents, id) {
  const postdata = {
    author: $('#author').val(),
    contents: contents,
    _id: id,
  };

  $.post('/modify', postdata, function () {
    load();
  });
};

const comment = function (comment, id) {
  const postdata = {
    author: $('#author').val(),
    comment: comment,
    _id: id,
  };

  $.post('/comment', postdata, function () {
    load();
  });
};

const del = function (id) {
  const postdata = {
    _id: id,
  };

  $.post('/del', postdata, function () {
    load();
  });
};

const like = function (id) {
  const postdata = {
    _id: id,
  };

  $.post('/like', postdata, function () {
    load();
  });
};

$(document).ready(function () {
  $('#message textarea').on('focus', function () {
    editing = true;
  });

  $('#message textarea').on('blur', function () {
    editing = false;
  });

  $('#message textarea').keypress(function (evt) {
    if ((evt.keyCode || evt.which) == 13) {
      if (this.value !== '') {
        write(this.value);
        evt.preventDefault();
        $(this).val('');
        editing = false;
      }
    }
  });

  $('#write_button').click(function (evt) {
    console.log($('#message textarea').val());
    write($('#message textarea').val());
    $('#message textarea').val('');
    editing = false;
  });

  load();
  timer = setInterval(load(), 5000);
});
