// Inisialisasi DataTable untuk semua history task
document.addEventListener("DOMContentLoaded", function () {
  const csrfToken = $('meta[name="csrf-token"]').attr("content");

  $("#datatables_all_history_task").DataTable({
    responsive: true,
    pageLength: 25,
    ajax: {
      url: "/get_all_history_task",
      dataSrc: "data",
      beforeSend: function (xhr) {
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
          const url_view = "javascript:showTask('" + row.token + "')";
          return `
            <button class="btn btn-success m-1" onclick="${url_view}">
              <i class="fa-solid fa-eye"></i>
            </button>
          `;
        },
      },
    ],
  });
});

// Inisialisasi DataTable untuk semua task
document.addEventListener("DOMContentLoaded", function () {
  const csrfToken = $('meta[name="csrf-token"]').attr("content");

  $("#datatables_all_task").DataTable({
    responsive: true,
    pageLength: 25,
    ajax: {
      url: "/get_all_task",
      dataSrc: "data",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("X-CSRF-Token", csrfToken);
      },
    },
    columns: [
      { data: "name" },
      { data: "description" },
      {
        data: "created_at",
        render: function (data) {
          return formatDateTime(data);
        },
      },
      {
        data: "due_date",
        render: function (data) {
          return formatDateTime(data);
        },
      },
      { data: "token" },
      { data: "status" },
      {
        data: null,
        orderable: false,
        searchable: false,
        render: function (data, type, row) {
          const url_view = "/upload_document/" + row.token;
          return `
                    <a class="btn btn-success m-1" href="${url_view}">
                        <i class="fa-solid fa-upload"></i>
                    </a>
                `;
        },
      },
    ],
  });
});

// Fungsi menampilkan detail task
function showTask(token) {
  $.ajax({
    url: "/get_one_task/" + encodeURIComponent(token),
    method: "GET",
    dataType: "json",
    success: function (data) {
      if (data.status === "success") {
        const task = data.task;
        const link = document.getElementById("downloadLink");
        link.setAttribute("href", "/static/uploads/files/" + task.filename);

        const input = document.getElementById("taskStatus");
        if (task.status === "waiting") {
          input.style.backgroundColor = "pink";
          input.style.color = "purple";
        } else if (task.status === "verified") {
          input.style.backgroundColor = "green";
          input.style.color = "white";
        } else {
          input.style.backgroundColor = "orange";
          input.style.color = "black";
        }

        document.getElementById("taskStatus").value = task.status;
        document.getElementById("taskFilename").value = task.filename;

        const modal = new bootstrap.Modal(
          document.getElementById("taskDetailModal")
        );
        modal.show();
      } else {
        Swal.fire("Error!", "Failed to fetch task data.", "error");
      }
    },
    error: function () {
      Swal.fire("Error!", "Failed to fetch task data.", "error");
    },
  });
}

// Helper function to format datetime
function formatDateTime(datetime) {
  const date = new Date(datetime);
  return date.toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}
