document.addEventListener("DOMContentLoaded", function () {
  var csrfToken = $('meta[name="csrf-token"]').attr("content");
  $("#datatables_scheduled_task").DataTable({
    responsive: true,
    pageLength: 25,
    ajax: {
      url: "/get_scheduled_task",
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
          var url_view = "/details/" + encodeURIComponent(row.token);
          var url_edit = "javascript:editTask('" + row.token + "')";
          var url_delete = "javascript:deleteTask('" + row.token + "')";
          return (
            '<a href="' +
            url_view +
            '" class="btn btn-primary m-1"><i class="fa-solid fa-eye"></i></a> ' +
            '<button class="btn btn-warning m-1" onclick="' +
            url_edit +
            '"><i class="fa-solid fa-pen"></i></button> ' +
            '<button class="btn btn-danger m-1" onclick="' +
            url_delete +
            '"><i class="fa-solid fa-trash"></i></button>'
          );
        },
      },
    ],
  });
});

function submitCreateTask() {
  const btn = document.getElementById("buttonSave");

  // Save original button text
  const originalText = btn.innerHTML;

  btn.innerHTML = `
    <div class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div>
    Loading...
  `;
  btn.disabled = true;

  var csrfToken = $('meta[name="csrf-token"]').attr("content");
  let name = document.getElementById("taskName").value;
  let description = document.getElementById("taskDescription").value;
  let created_at = document.getElementById("taskCreatedAt").value;
  let due_date = document.getElementById("taskDueDate").value;
  let send_schedule_notif = document.getElementById("send_schedule_notif");
  var notif_variable = 0;
  if (send_schedule_notif.checked) {
    notif_variable = 1;
  } else {
    notif_variable = 0;
  }

  if (name && created_at && due_date) {
    fetch("/create_scheduled_task", {
      method: "POST",
      headers: {
        "X-CSRF-Token": csrfToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        created_at,
        due_date,
        notif_variable,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          Swal.fire("Succes!", "Task created successfully!", "success");
          $("#datatables_scheduled_task").DataTable().ajax.reload();
          var modal = bootstrap.Modal.getInstance(
            document.getElementById("taskModal")
          );
          let name = document.getElementById("taskName");
          let description = document.getElementById("taskDescription");
          let created_at = document.getElementById("taskCreatedAt");
          let due_date = document.getElementById("taskDueDate");
          name.value = "";
          description.value = "";
          created_at.value = "";
          due_date.value = "";
          modal.hide();
          btn.innerHTML = originalText;
          btn.disabled = false;
        } else {
          console.log(data);
          Swal.fire("Error!", "Failed to create task!", "error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire("Error!", "Error creating task!", "error");
      });
  } else {
    Swal.fire(
      "Error!",
      "Fill the fields (name, created date, and due date)!",
      "error"
    );
  }
}
function editTask(token) {
  fetch("/get_task/" + encodeURIComponent(token))
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        const task = data.task;
        document.getElementById("editToken").value = task.token;
        document.getElementById("taskName").value = task.name;
        document.getElementById("taskDescription").value = task.description;
        document.getElementById("taskCreatedAt").value = task.created_at;
        document.getElementById("taskDueDate").value = task.due_date;
        $("#buttonSave").hide();
        $("#buttonUpdate").show();
        var modal = new bootstrap.Modal(document.getElementById("taskModal"));
        modal.show();
      } else {
        Swal.fire("Error!", "Failed to fetch task data.", "error");
      }
    });
}

function saveEdit() {
  const btn = document.getElementById("buttonUpdate");

  // Save original button text
  const originalText = btn.innerHTML;

  btn.innerHTML = `
    <div class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div>
    Loading...
  `;
  btn.disabled = true;
  var token = document.getElementById("editToken").value;
  var name = document.getElementById("taskName").value;
  var description = document.getElementById("taskDescription").value;
  var created_at = document.getElementById("taskCreatedAt").value;
  var due_date = document.getElementById("taskDueDate").value;
  var csrfToken = $('meta[name="csrf-token"]').attr("content");
  let send_schedule_notif = document.getElementById("send_schedule_notif");
  var notif_variable = 0;
  if (send_schedule_notif.checked) {
    notif_variable = 1;
  } else {
    notif_variable = 0;
  }

  if (name && created_at && due_date) {
    fetch("/edit_scheduled_task/" + encodeURIComponent(token), {
      method: "POST",
      headers: {
        "X-CSRF-Token": csrfToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        created_at,
        due_date,
        notif_variable,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          Swal.fire("Updated!", "Task has been updated.", "success");
          $("#datatables_scheduled_task").DataTable().ajax.reload();
          var modalEl = document.getElementById("taskModal");
          var modal = bootstrap.Modal.getInstance(modalEl);
          modal.hide();
          $("#buttonSave").show();
          $("#buttonUpdate").hide();
          btn.innerHTML = originalText;
          btn.disabled = false;
        } else {
          Swal.fire("Error!", "Failed to update task.", "error");
        }
      });
  } else {
    Swal.fire(
      "Error!",
      "Fill the fields (name, created date, and due date)!",
      "error"
    );
  }
}

function showModal() {
  let name = document.getElementById("taskName");
  let description = document.getElementById("taskDescription");
  let created_at = document.getElementById("taskCreatedAt");
  let due_date = document.getElementById("taskDueDate");
  name.value = "";
  description.value = "";
  created_at.value = "";
  due_date.value = "";
  $("#buttonSave").show();
  $("#buttonUpdate").hide();
}

function deleteTask(token) {
  Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      var csrfToken = $('meta[name="csrf-token"]').attr("content");
      fetch("/delete_schedule_task/" + encodeURIComponent(token), {
        method: "POST",
        headers: {
          "X-CSRF-Token": csrfToken,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            Swal.fire("Deleted!", "Task has been deleted.", "success");
            $("#datatables_scheduled_task").DataTable().ajax.reload();
          } else {
            Swal.fire("Error!", "Failed to delete task.", "error");
          }
        })
        .catch((error) => {
          Swal.fire("Error!", "Error deleting task.", "error");
        });
    }
  });
}
