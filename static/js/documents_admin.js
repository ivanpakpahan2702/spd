document.addEventListener("DOMContentLoaded", function () {
  const csrfToken = $('meta[name="csrf-token"]').attr("content");

  // DataTable Scheduled Task
  $("#datatables_scheduled_task").DataTable({
    responsive: true,
    pageLength: 25,
    ajax: {
      url: "/get_scheduled_task",
      dataSrc: "data",
      beforeSend: function (xhr) {
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
          const urlView =
            "/details_schedule_task/" + encodeURIComponent(row.token);
          const urlEdit = "javascript:editTask('" + row.token + "')";
          const urlDelete = "javascript:deleteTask('" + row.token + "')";
          return `
            <a href="${urlView}" class="btn btn-primary m-1"><i class="fa-solid fa-eye"></i></a>
            <button class="btn btn-warning m-1" onclick="${urlEdit}"><i class="fa-solid fa-pen"></i></button>
            <button class="btn btn-danger m-1" onclick="${urlDelete}"><i class="fa-solid fa-trash"></i></button>
          `;
        },
      },
    ],
  });
});

// Fungsi buat task baru
function submitCreateTask() {
  const btn = document.getElementById("buttonSave");
  const originalText = btn.innerHTML;

  // Tampilkan loading
  btn.innerHTML = `
    <div class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div>
    Loading...
  `;
  btn.disabled = true;

  const csrfToken = $('meta[name="csrf-token"]').attr("content");
  const name = document.getElementById("taskName").value;
  const description = document.getElementById("taskDescription").value;
  const created_at = document.getElementById("taskCreatedAt").value;
  const due_date = document.getElementById("taskDueDate").value;
  const send_schedule_notif = document.getElementById("send_schedule_notif");
  const notif_variable = send_schedule_notif.checked ? 1 : 0;

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
          Swal.fire("Success!", "Task created successfully!", "success");
          $("#datatables_scheduled_task").DataTable().ajax.reload();

          // Reset form
          document.getElementById("taskName").value = "";
          document.getElementById("taskDescription").value = "";
          document.getElementById("taskCreatedAt").value = "";
          document.getElementById("taskDueDate").value = "";

          // Tutup modal
          var modal = bootstrap.Modal.getInstance(
            document.getElementById("taskModal")
          );
          modal.hide();

          // Reset tombol
          btn.innerHTML = originalText;
          btn.disabled = false;
        } else {
          Swal.fire("Error!", "Failed to create task!", "error");
        }
      })
      .catch(() => {
        Swal.fire("Error!", "Error creating task!", "error");
      });
  } else {
    Swal.fire(
      "Error!",
      "Fill the fields (name, created date, and due date)!",
      "error"
    );
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

// Fungsi edit task
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

        const modal = new bootstrap.Modal(document.getElementById("taskModal"));
        modal.show();
      } else {
        Swal.fire("Error!", "Failed to fetch task data.", "error");
      }
    });
}

// Fungsi simpan edit
function saveEdit() {
  const btn = document.getElementById("buttonUpdate");
  const originalText = btn.innerHTML;
  btn.innerHTML = `
    <div class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div>
    Loading...
  `;
  btn.disabled = true;

  const token = document.getElementById("editToken").value;
  const name = document.getElementById("taskName").value;
  const description = document.getElementById("taskDescription").value;
  const created_at = document.getElementById("taskCreatedAt").value;
  const due_date = document.getElementById("taskDueDate").value;
  const csrfToken = $('meta[name="csrf-token"]').attr("content");
  const send_schedule_notif = document.getElementById("send_schedule_notif");
  const notif_variable = send_schedule_notif.checked ? 1 : 0;

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
          const modal = bootstrap.Modal.getInstance(
            document.getElementById("taskModal")
          );
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
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

// Fungsi tampil modal reset
function showModal() {
  document.getElementById("taskName").value = "";
  document.getElementById("taskDescription").value = "";
  document.getElementById("taskCreatedAt").value = "";
  document.getElementById("taskDueDate").value = "";
  $("#buttonSave").show();
  $("#buttonUpdate").hide();
}

// Fungsi hapus task
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
      const csrfToken = $('meta[name="csrf-token"]').attr("content");
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
        .catch(() => {
          Swal.fire("Error!", "Error deleting task.", "error");
        });
    }
  });
}

// DataTable Pengguna
$(document).ready(function () {
  const tableUsers = $("#datatables_all_users").DataTable({
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
            <button class="editBtn btn btn-warning m-1" data-id="${row.id}">Edit</button>
            <button class="deleteBtn btn btn-danger m-1" data-id="${row.id}">Delete</button>
          `;
        },
      },
    ],
  });

  // Save user
  $("#saveBtn").on("click", function () {
    const id = $("#userId").val();
    const name = $("#nameUsers").val();
    const email = $("#emailUsers").val();
    const role = $("#roleUsers").val();

    if (id) {
      // Update
      $.ajax({
        url: "/api/users/" + id,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify({ name, email, role }),
        success: function () {
          $("#userDetailModal").modal("hide");
          tableUsers.ajax.reload();
          Swal.fire("Success!", "Succes to update user data.", "error");
        },
      });
    } else {
      // Tambah baru
      $.ajax({
        url: "/api/users",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ name, email, role }),
        success: function () {
          $("#userDetailModal").modal("hide");
          tableUsers.ajax.reload();
          Swal.fire("Error!", "Failed to update user.", "error");
        },
      });
    }
  });

  // Edit user
  $("#datatables_all_users tbody").on("click", ".editBtn", function () {
    const rowData = tableUsers.row($(this).parents("tr")).data();
    $("#userId").val(rowData.id);
    $("#nameUsers").val(rowData.name);
    $("#emailUsers").val(rowData.email);
    $("#userDetailModal").modal("show");
  });

  // Hapus user
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
            tableUsers.ajax.reload();
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
// Detail Task DataTable
$(document).ready(function () {
  const token = $("#hiddenToken").val();
  const tableTaskDetails = $("#datatables_detail_task").DataTable({
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

  // Update task
  $("#TaskUpdate").on("click", function () {
    const token = $("#hiddenToken").val();
    const id = $("#User_ID").val();
    const email = $("#User_Email").val();
    const filename = $("#User_Filename").val();
    const status = $("#statusTask").val();

    const btn = document.getElementById("TaskUpdate");
    const originalText = btn.innerHTML;
    btn.innerHTML = `
      <div class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div>
      Loading...
    `;
    btn.disabled = true;

    const send_schedule_notif_user = document.getElementById(
      "send_schedule_notif_to_user"
    );
    const notif_variable_ = send_schedule_notif_user.checked ? 1 : 0;

    if (id) {
      // Update
      $.ajax({
        url: "/api/task/" + token + "/" + id,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify({ status, token, id, notif_variable_ }),
        success: function () {
          $("#taskDetailModal").modal("hide");
          Swal.fire("Success!", "Task updated successfully!", "success");
          $("#datatables_detail_task").DataTable().ajax.reload();
          // Reset tombol
          $("#buttonSave").show();
          $("#buttonUpdate").hide();
          btn.innerHTML = originalText;
          btn.disabled = false;
        },
      });
    } else {
      // Tambah baru
      $.ajax({
        url: "/api/task",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ status, token, id, notif_variable_ }),
        success: function () {
          $("#taskDetailModal").modal("hide");
          $("#datatables_detail_task").DataTable().ajax.reload();
          Swal.fire("Success!", "Task updated successfully!", "success");
        },
      });
    }
  });

  // Edit task dari tabel
  $("#datatables_detail_task").on("click", ".editBtn", function () {
    const rowData = tableTaskDetails.row($(this).parents("tr")).data();
    $("#User_ID").val(rowData.id);
    $("#User_Email").val(rowData.email);
    $("#User_Filename").val(rowData.filename);
    $("#taskDetailModal").modal("show");
    document
      .getElementById("TaskDownloadLink")
      .setAttribute("href", "/static/uploads/files/" + rowData.filename);
  });
});
