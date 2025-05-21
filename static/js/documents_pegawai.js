document.addEventListener("DOMContentLoaded", function () {
  var csrfToken = $('meta[name="csrf-token"]').attr("content");
  $("#datatables_all_history_task").DataTable({
    responsive: true,
    pageLength: 25,
    ajax: {
      url: "/get_all_history_task",
      dataSrc: "data",
      beforeSend: function (xhr, settings) {
        xhr.setRequestHeader("X-CSRF-Token", csrfToken);
      },
    },

    columns: [
      { data: "token" },
      { data: "filename" },
      {
        data: null,
        orderable: false,
        searchable: false,
        render: function (data, type, row) {
          var url_view = "javascript:showTask('" + row.token + "')";
          return (
            '<button class="btn btn-success m-1" onclick="' +
            url_view +
            '"><i class="fa-solid fa-eye"></i></button> '
          );
        },
      },
    ],
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var csrfToken = $('meta[name="csrf-token"]').attr("content");
  $("#datatables_all_task").DataTable({
    responsive: true,
    pageLength: 25,
    ajax: {
      url: "/get_all_task",
      dataSrc: "data",
      beforeSend: function (xhr, settings) {
        xhr.setRequestHeader("X-CSRF-Token", csrfToken);
      },
    },

    columns: [
      { data: "name" },
      { data: "description" },
      { data: "created_at" },
      { data: "due_date" },
      { data: "token" },
      {
        data: null,
        orderable: false,
        searchable: false,
        render: function (data, type, row) {
          var url_view = "/upload_document/" + row.token;
          return (
            '<a class="btn btn-success m-1" href="' +
            url_view +
            '"><i class="fa-solid fa-eye"></i></a> '
          );
        },
      },
    ],
  });
});

function showTask(token) {
  fetch("/get_one_task/" + encodeURIComponent(token))
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        const task = data.task;
        const link = document.getElementById("downloadLink");
        link.setAttribute("href", "/static/uploads/files/" + task.filename);
        const input = document.getElementById("taskStatus");
        if (task.status == "waiting") {
          input.style.backgroundColor = "pink";
          input.style.color = "purple";
        } else if (task.status == "verified") {
          input.style.backgroundColor = "green";
          input.style.color = "white";
        } else {
          input.style.backgroundColor = "orange";
          input.style.color = "black";
        }
        document.getElementById("taskStatus").value = task.status;
        document.getElementById("taskFilename").value = task.filename;
        var modal = new bootstrap.Modal(
          document.getElementById("taskDetailModal")
        );
        modal.show();
      } else {
        Swal.fire("Error!", "Failed to fetch task data.", "error");
      }
    });
}
