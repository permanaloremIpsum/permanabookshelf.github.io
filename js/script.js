document.addEventListener("DOMContentLoaded", function () { 
    const submitForm = document.getElementById("submit-form")
 
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault()
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Data Berhasil Disimpan!",
            showConfirmButton: false,
            timer: 1500
        })
        addBookToShelf()
    })

    if(isStorageExist()){
        loadDataFromStorage()
    }

    searchBook()
})

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.")
})

document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks()
})