

var nav = ["home", "employee_list", "add_employee", "update_employee", "delete_employee"];
var gid;
$('body').on('click', "#home_nav", function () {
    for (let i of nav) {
        $("#" + i).css("display", "none");
    }
    $("#home").css("display", "block");

});

$('body').on('click', "#employee_nav", function () {
    for (let i of nav) {
        $("#" + i).css("display", "none");
    }
    add();
    $("#employee_list").css("display", "block");


});

$('body').on('click', "#add_nav", function () {
    for (let i of nav) {
        $("#" + i).css("display", "none");
    }
    $("#add_employee").css("display", "block");

});

$('body').on('click', "#update_nav", function () {
    for (let i of nav) {
        $("#" + i).css("display", "none");
    }
    $("#update_employee").css("display", "block");
});


$('body').on('click', "#delete_nav", function () {
    for (let i of nav) {
        $("#" + i).css("display", "none");
    }
    $("#delete_employee").css("display", "block");
});
function add() {
    fetch('http://localhost:57852/api/values')
        .then(response => response.json())
        .then(data => {
           
                console.log('hi');
                var list = JSON.parse(data);
                var j = 1;
                var text = '';
                for (let i of list) {
                    text += '<tr><td>' + j + '</td ><td>' + i.EmployeeCode + '</td ><td>' + i.Name + '</td ><td>' + i.Email + '</td><td>' + i.Designation + '</td><td>' + i.JoiningDate + '</td><td><i class="fa fa-pencil text-primary" onclick="edit(' + i.Id + ')"></i> <i class="fa fa-trash ml-1 text-danger" onclick="del('+i.Id+')"></i></td></tr>';
                    j++;
                }
            $('#emplist').html(text);
            
        });
}

function del (v)
{
    console.log(typeof v);
    fetch('http://localhost:57852/api/values/' + v, {method:'DELETE'})
        .then(response => response.json())
            .then(data => {

                console.log('hi');
                var list = JSON.parse(data);
                var j = 1;
                var text = '';
                for (let i of list) {
                    text += '<tr><td>' + j + '</td ><td>' + i.EmployeeCode + '</td ><td>' + i.Name + '</td ><td>' + i.Email + '</td><td>' + i.Designation + '</td><td>' + i.JoiningDate + '</td><td><i class="fa fa-pencil text-primary " onclick="edit(' + i.Id + ')"></i> <i class="fa fa-trash ml-1 text-danger" onclick="del(' + i.Id + ')"></i></td></tr>';
                    j++;
                }
                $('#emplist').html(text);

            });

}

function addemployee(data){
  
    fetch('http://localhost:57852/api/values/', {
        method: 'POST', body: JSON.stringify(data), headers: {
            "Content-type": "application/json; charset=UTF-8"
        }})
        .then(response => response.json())
        .then(data => {
            console.log(data);

        });

}

function saveemployee() {
    var obj = {};
    obj.Name = document.getElementById('ename').value;
    obj.Email = document.getElementById('email').value;
    obj.Designation = document.getElementById('designation').value;
    obj.JoiningDate = document.getElementById('Join_date').value;
    obj.PermanentAdd1 = document.getElementById('PermanentAdd1').value;
    obj.PermanentAdd2 = document.getElementById('PermanentAdd2').value;
    obj.CommunicationAdd1 = document.getElementById('CommunicationAdd1').value;
    obj.CommunicationAdd2 = document.getElementById('CommunicationAdd2').value;
    obj.EmployeeCode = "CR-00";
    console.log(obj);
    addemployee(obj);

}


function update() {
    var obj = {};
    obj.EmployeeCode = document.getElementById('ecode').value;
    obj.Name = document.getElementById('ename1').value;
    obj.Email = document.getElementById('email1').value;
    obj.Designation = document.getElementById('designation1').value;
    obj.JoiningDate = document.getElementById('Join_date1').value;
    obj.PermanentAdd1 = document.getElementById('padd11').value;
    obj.PermanentAdd2 = document.getElementById('padd22').value;
    obj.CommunicationAdd1 = document.getElementById('cadd11').value;
    obj.CommunicationAdd2 = document.getElementById('cadd22').value;
    console.log(obj);
        fetch('http://localhost:57852/api/values/'+gid, {
            method: 'PUT', body: JSON.stringify(obj), headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(gid);
                console.log(data);
                gid = null;

            });

    }

function edit(id) {

    fetch('http://localhost:57852/api/values/' + id, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            document.getElementById('per11').checked = false;
            document.getElementById('per23').checked = false;

            console.log('hi');
            var list = JSON.parse(data);
            list = list[0];
            console.log(list)
            gid = id;
            document.getElementById('ecode').value = list.EmployeeCode;
            document.getElementById('ename1').value = list.Name;
            document.getElementById('email1').value = list.Email;
            document.getElementById('designation1').value = list.Designation;
            document.getElementById('Join_date1').value = list.JoiningDate;
            if (list.PermanentAdd1 != '' && list.PermanentAdd2 != '') {
                document.getElementById('per11').checked = true;
            }
            if (list.CommunicationAdd1 != '' && list.CommunicationAdd2 != '') {
                document.getElementById('per23').checked = true;
            }
            document.getElementById('padd11').value = list.PermanentAdd1;
            document.getElementById('padd22').value = list.PermanentAdd2;
            document.getElementById('cadd11').value = list.CommunicationAdd1;
            document.getElementById('cadd22').value = list.CommunicationAdd2;
            for (let i of nav) {
                $("#" + i).css("display", "none");
            }
            $("#update_employee").css("display", "block");

        });


}

function search(v) {
    console.log(document.getElementById(v).value);

}

function plus() {
    for (let i of nav) {
        $("#" + i).css("display", "none");
    }
    $("#add_employee").css("display", "block");

}
