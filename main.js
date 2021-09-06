
var successfulValidation = true;
var sentRequest = false;
var userExistence = false;
var result = false;

function functionValidation() {

    document.getElementById("errorUsername").innerHTML = "";
    document.getElementById("errorName").innerHTML = "";
    document.getElementById("errorFamilyName").innerHTML = "";
    document.getElementById("errorEmail").innerHTML = "";
    document.getElementById("errorPassword").innerHTML = "";
    document.getElementById("errorPostalCode").innerHTML = "";
    document.getElementById("error").innerHTML = "";
    document.getElementById("ajaxError").innerHTML = "";
    document.getElementById("success").innerHTML = "";

    successfulValidation = true;
    userExistence = false;
    sentRequest = false;
    result = false;

    let username = document.getElementById("username").value;
    let name = document.getElementById("name").value;
    let familyName = document.getElementById("family-name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let postalCode = document.getElementById("postal-code").value;

    let usernameSample = /^(?=.{3,10}$)/;
    let nameSample = /^(?=.{1,50}$)/;
    let familyNameSample = /^(?=.{1,50}$)/;
    let emailSample = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordSample = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,10}$/;
    let postalCodeSample = /^[0-9]{5}-[0-9]{4}$/;

    if (fieldValidation(username, usernameSample)) {
        document.getElementById("errorUsername").innerHTML = "";
    } else {
        document.getElementById("errorUsername").innerHTML = "Невалидно потребителско име: Задължително от 3 до 10 знака."
        successfulValidation = false;
        document.getElementById("username").style.borderColor = "red";
    }

    if (fieldValidation(name, nameSample)) {
        document.getElementById("errorName").innerHTML = "";
    } else {
        document.getElementById("errorName").innerHTML = "Невалидно име: Задължително до 50 знака."
        successfulValidation = false; 
        document.getElementById("name").style.borderColor = "red";
    }

    if (fieldValidation(familyName, familyNameSample)) {
        document.getElementById("errorFamilyName").innerHTML = "";
    } else {
        document.getElementById("errorFamilyName").innerHTML = "Невалидно фамилно име: Задължително до 50 знака."
        successfulValidation = false;
        document.getElementById("family-name").style.borderColor = "red";
    }

    if (fieldValidation(email, emailSample)) {
        document.getElementById("errorEmail").innerHTML = "";
    } else {    
        document.getElementById("errorEmail").innerHTML = "Невалиден e-mail: Изисква се валиден имейл адрес."
        successfulValidation = false;
        document.getElementById("email").style.borderColor = "red";
    }

    if (fieldValidation(password, passwordSample)) {
        document.getElementById("errorPassword").innerHTML = "";
    } else {
        document.getElementById("errorPassword").innerHTML = "Невалидна парола: Задължително от 6 до 10 знака, включително главни и малки букви и цифри."
        successfulValidation = false;
        document.getElementById("password").style.borderColor = "red";
    }

    if (fieldValidation(postalCode, postalCodeSample)) {
        document.getElementById("errorPostalCode").innerHTML = "";
    } else if(postalCode == ""){
        document.getElementById("errorPostalCode").innerHTML = "";
    } else {
        document.getElementById("errorPostalCode").innerHTML = "Невалиден пощенски код: Форматът трябва да бъде 11111-1111."
        successfulValidation = false;
        document.getElementById("postal-code").style.borderColor = "red";
    }

    const url = "https://jsonplaceholder.typicode.com/users";

    function sendRequest(url, settings) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status == 200) {
                settings.success(xhr.response);
            } else {
                console.log(xhr);
                document.getElementById("ajaxError").innerHTML = "Нещо се обърка.Моля опитайте отново."
            }
        };

        xhr.open("GET", url, true);
        xhr.send(null);
    }

    var checkCallFromUser = function (text) {
        sentRequest = true;

        json = JSON.parse(text);
        json.forEach(function (obj) {
            if (obj.username === username) {
                userExistence = true;
            }
        });

        if (userExistence) {
            document.getElementById("errorUsername").innerHTML = "Използвано потребителско име."

        }
    
        if (successfulValidation && !userExistence && sentRequest) {
            document.getElementById("error").innerHTML = "";
            document.getElementById("ajaxError").innerHTML = "";
            document.getElementById("success").innerHTML = "Вашите валидни данни ще бъдат изпратени."

            result = true;
        }
    
        return result;
    };

    sendRequest(url, { success: checkCallFromUser });
}

function fieldValidation(str, sample) {
    let res = str.match(sample);
    return (res != null)
}

