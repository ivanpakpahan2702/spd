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
          var url_view =
            "/details_schedule_task/" + encodeURIComponent(row.token);
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

$(document).ready(function () {
  let table = $("#datatables_all_users").DataTable({
    ajax: {
      url: "/get_users",
      dataSrc: "",
    },
    columns: [
      { data: "id" },
      { data: "name" },
      { data: "email" },
      { data: "role" },
      {
        data: null,
        render: function (data, type, row) {
          return `
                        <button class="editBtn btn btn-warning" data-id="${row.id}">Edit</button>
                        <button class="deleteBtn btn btn-danger" data-id="${row.id}">Delete</button>
                    `;
        },
      },
    ],
  });

  // Save button
  $("#saveBtn").on("click", function () {
    const id = $("#userId").val();
    const name = $("#nameUsers").val();
    const email = $("#emailUsers").val();
    const role = $("#roleUsers").val();

    if (id) {
      // Update existing
      $.ajax({
        url: "/api/users/" + id,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify({ name: name, email: email, role: role }),
        success: function () {
          $("#userDetailModal").modal("hide");
          table.ajax.reload();
        },
      });
    } else {
      // Add new
      $.ajax({
        url: "/api/users",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ name: name, email: email, role: role }),
        success: function () {
          $("#userDetailModal").modal("hide");
          table.ajax.reload();
        },
      });
    }
  });

  // Edit button
  $("#datatables_all_users tbody").on("click", ".editBtn", function () {
    const rowData = table.row($(this).parents("tr")).data();
    $("#userId").val(rowData.id);
    $("#nameUsers").val(rowData.name);
    $("#emailUsers").val(rowData.email);
    $("#userDetailModal").modal("show");
  });

  // Delete button
  $("#datatables_all_users tbody").on("click", ".deleteBtn", function () {
    const id = $(this).data("id");

    Swal.fire({
      title: "Are you sure?",
      text: "Delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: "/api/users/" + id,
          type: "DELETE",
          success: function () {
            table.ajax.reload();
            Swal.fire("Deleted!", "The user has been deleted.", "success");
          },
          error: function () {
            Swal.fire("Error!", "Failed to delete user.", "error");
          },
        });
      }
    });
  });
});
// ----------------------------------------------------------------------------------------------------------
$(document).ready(function () {
  let token = $("#hiddenToken").val();
  let table = $("#datatables_detail_task").DataTable({
    ajax: {
      url: "/get_task_users/" + token,
      dataSrc: "",
    },
    columns: [
      { data: "id" },
      { data: "email" },
      { data: "filename" },
      { data: "status" },
      {
        data: null,
        render: function (data, type, row) {
          return `
                        <button class="editBtn btn btn-warning" data-id="${row.id}">Edit</button>
                    `;
        },
      },
    ],
  });
  // Save button
  $("#TaskUpdate").on("click", function () {
    const token = $("#hiddenToken").val();
    const id = $("#User_ID").val();
    const email = $("#User_Email").val();
    const filename = $("#User_Filename").val();
    const status = $("#statusTask").val();
    const btn = document.getElementById("TaskUpdate");
    // Save original button text
    const originalText = btn.innerHTML;
    btn.innerHTML = `
    <div class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div>
    Loading...
  `;
    btn.disabled = true;

    let send_schedule_notif_user = document.getElementById(
      "send_schedule_notif_to_user"
    );
    var notif_variable_ = 0;
    if (send_schedule_notif_user.checked) {
      notif_variable_ = 1;
    } else {
      notif_variable_ = 0;
    }

    if (id) {
      // Update existing
      $.ajax({
        url: "/api/task/" + token + "/" + id,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
          status: status,
          token: token,
          id: id,
          notif_variable_: notif_variable_,
        }),
        success: function () {
          $("#taskDetailModal").modal("hide");
          btn.innerHTML = originalText;
          btn.disabled = false;
          table.ajax.reload();
          Swal.fire("Succes!", "Task updated successfully!", "success");
        },
      });
    } else {
      // Add new
      $.ajax({
        url: "/api/task",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          status: status,
          token: token,
          id: id,
          notif_variable_: notif_variable_,
        }),
        success: function () {
          $("#taskDetailModal").modal("hide");
          table.ajax.reload();
          Swal.fire("Succes!", "Task updated successfully!", "success");
        },
      });
    }
  });

  // Edit button
  $("#datatables_detail_task").on("click", ".editBtn", function () {
    const rowData = table.row($(this).parents("tr")).data();
    $("#User_ID").val(rowData.id);
    $("#User_Email").val(rowData.email);
    $("#User_Filename").val(rowData.filename);
    $("#taskDetailModal").modal("show");
    const links = document.getElementById("TaskDownloadLink");
    links.setAttribute("href", "/static/uploads/files/" + rowData.filename);
  });
});
